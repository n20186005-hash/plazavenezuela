# Plaza Venezuela 科普升级实施任务

> 所有任务按依赖顺序执行。每个任务有 task-local Test Requirements（TR），完成时必须自验证并给出 Completion Evidence。
> 相关 spec：`[spec.md](file:///h:/GitHub/plazavenezuela/.trae/specs/pv-seo-content-upgrade/spec.md)`

---

## Task 1: 补全 .gitignore 适配 Cloudflare Workers 手动部署

**范围**：项目根 `.gitignore`（若不存在则新建；若存在则追加不重复）。
**对应 AC**：AC-10
**前置任务**：无

### 必须忽略的条目
- Astro 构建：`dist/`、`.astro/`
- 包管理：`node_modules/`、`.pnpm-store/`、`.pnpm-debug.log*`、`npm-debug.log*`、`yarn-error.log*`
- Cloudflare Workers：`.wrangler/`、`.dev.vars`、`.env`、`.env.*`（保留 `.env.example` 如有）、`wrangler.toml.local`
- 系统：`.DS_Store`、`Thumbs.db`、`desktop.ini`
- 编辑器：`.vscode/`、`.idea/`、`*.swp`、`*~`
- 其他：`coverage/`

### Test Requirements

| TR-ID | 类型 | 条件 | 证据 |
|-------|------|------|------|
| T1-01 | rule | `.gitignore` 文件存在且包含 `.wrangler/`、`.dev.vars`、`dist/`、`.astro/`、`node_modules/`、`.env*` | `cat .gitignore` 行命中 |
| T1-02 | rule | 保留 `wrangler.jsonc`（不被忽略） | `.gitignore` 不含该条目 |
| T1-03 | rule | 含系统+编辑器+日志条目 | `grep -E "(DS_Store|Thumbs|vscode|idea|debug\.log)" .gitignore` 命中 |

**Status**: pending
**Completion Evidence**: —

---

## Task 2: SEO 命名统一 — title / schema / canonical / OG

**范围**：[index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro) 前半段 frontmatter + slot head 注入；不改动 BaseLayout 的 canonical 默认逻辑，但在 slot head 里确保一致。
**对应 AC**：AC-09
**前置任务**：Task 1（无依赖，可并行）

### 具体改动
1. `<title>` 设为：`Plaza Venezuela (Caracas) - 旅游指南 & 地理位置`
2. `pageTitle` / `fullTitle` 同步统一
3. WebPage schema `name`：`Plaza Venezuela Caracas 旅游指南`
4. WebSite schema `name`：`Plaza Venezuela Caracas 旅游指南`
5. `canonical` 显式 `<link rel="canonical" href="https://plazavenezuela.org" />`
6. `<meta property="og:title">`：`Plaza Venezuela - Caracas 旅游指南`

### Test Requirements

| TR-ID | 类型 | 条件 | 证据 |
|-------|------|------|------|
| T2-01 | rule | `<title>` 含 "Plaza Venezuela (Caracas)" 与 "旅游指南" | index.astro 渲染输出 head |
| T2-02 | rule | WebPage.name & WebSite.name 含 "Plaza Venezuela Caracas 旅游指南" | JSON-LD 两个节点 grep |
| T2-03 | rule | canonical === `https://plazavenezuela.org` | head link[rel=canonical] |
| T2-04 | rule | og:title 与 title 语义一致，不再出现 "Guía Plaza Venezuela" 作为 OG 主标题（可作副文本） | meta property=og:title |

**Status**: pending
**Completion Evidence**: —

---

## Task 3: 天气服务端组件（Open-Meteo，fetch + 20min 缓存 + 人性化渲染）

**范围**：新建 [src/components/Weather.astro](file:///h:/GitHub/plazavenezuela/src/components/Weather.astro)；在 [index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro) 中于 `<section id="visita">` 之前或之后插入 Weather。
**对应 AC**：AC-03 / AC-13 / NFR-02 / NFR-03
**前置任务**：Task 2（无强依赖，可并行）

### 组件逻辑（Server Component）
- 在 frontmatter 内：
  - 定义全局 `const CACHE = new Map()`；`CACHE_KEY = 'pv-weather-forecast'`；`TTL = 20 * 60 * 1000`；
  - 读 CACHE，命中且未过期则复用；否则 `fetch('https://api.open-meteo.com/v1/forecast?...')` 并缓存结果；
  - catch 错误时走降级：返回一个 `{ok:false}`，前端展示"实时天气暂不可用，以下为基于加拉加斯常年气候的出行建议"。
- 请求参数（按 spec FR-03）：lat=10.4967, lon=-66.8884, current=..., daily=..., timezone=America/Caracas, forecast_days=7
- 人性化映射函数（纯函数）：
  - `humidityLabel(humidity)`：<50 "干燥舒适"，50-70 "体感适中"，>70 "潮湿闷热"
  - `uvLabel(uv)`：<3 "温和，可长时间户外"，3-6 "中等偏强，建议防晒"，7+ "很强，避开正午直晒"
  - `windLabel(speed_kmh)`：<5 "微风"，5-15 "有风，体感凉爽"，>15 "风较大，注意裙摆/帽子/临时围挡"
  - `tempLabel(t)`：<15 "微凉，薄外套"，15-22 "舒适"，22-28 "温暖偏热"，>28 "炎热，多喝水"
  - `weatherCodeIcon(wmoCode)`：返回 emoji 或字符符号（0 晴☀️ / 1-3 部分云⛅ / 45-48 雾🌫️ / 51-67 雨🌧️ / 71-86 雪❄️ / 95-99 雷暴⛈️ / 其他 🌤️）
  - `badges(current,daily[0])`：基于 precipitation_probability_max>40 生成 "记得带伞☔"；uv_max>6 生成 "加强防晒🧴"；t_min<16 生成 "备薄外套🧥"；t_max>28 生成 "多喝水💧"
- 渲染模板：
  - 顶部单张大卡片：当前温度（大号）、体感描述一句、湿度标签、风标签、紫外线标签、4 枚出行建议徽章。
  - 下方 `<table>` 或卡片网格：未来 7 日，列含：日期、星期、天气图标、最高/最低、降水概率、紫外线、日出日落、一句简短提示。
  - 文案**绝不能出现**：Open-Meteo、免费、API、密钥、接口。
  - 卡片外写"天气数据每 20 分钟更新一次"即可（无需解释来源）。

### Test Requirements

| TR-ID | 类型 | 条件 | 证据 |
|-------|------|------|------|
| T3-01 | rule | 组件在服务端 fetch，且 20 分钟窗口内外部调用 ≤ 1 次（通过 Map 命中率 + 代码结构） | Weather.astro frontmatter 代码检查 |
| T3-02 | rule | 渲染内容含：当前体感卡 + 7 天预报 + 4 枚出行徽章 | 生成 HTML 的 3 大区块 |
| T3-03 | rule | `grep -i -E "open-meteo|免费|无需密钥|api key|api 接口"` 在 index 输出为 0 条 | HTML grepping |
| T3-04 | rubric (≥4) | 人性化表达：湿度/紫外/风/温度均不以"纯数字"呈现，必有一句人类能直接决策的自然语言描述 | 卡片文本审查 |
| T3-05 | rule | 失败降级路径存在且渲染"实时天气暂不可用，……"提示 + 常年气候建议 | catch 分支模板 |

**Status**: pending
**Completion Evidence**: —

---

## Task 4: 季度游览策略表（12 月 × 多维度）

**范围**：在 [index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro) 新增一个 section（建议在天气之后、visita 之前，id=`estacional`），渲染一个真实 `<table>`。
**对应 AC**：AC-04
**前置任务**：Task 3（无强依赖，可并行）

### 表结构
- `<caption>`：季度游览策略 · 加拉加斯 30 年气候态综合分析
- 列至少：月份、气温体感、降雨特点、穿搭建议、推荐活动、摄影光线、喷泉夜景优势、注意事项
- 共 12 行（1 月 - 12 月），内容可基于加拉加斯典型热带干湿季（11-4 月干季；5-10 月雨季）做科普式推断，不必精确到每年。
- 表头必须语义化 `<thead>` 配合 `scope=col`，`<tbody>` 行首 `scope=row`。

### Test Requirements

| TR-ID | 类型 | 条件 | 证据 |
|-------|------|------|------|
| T4-01 | rule | 为真实 `<table>`，非纯 CSS 网格；含 `<caption>` / `<thead>` / `<tbody>` / `scope` | HTML 结构 |
| T4-02 | rule | 12 行 × ≥ 7 列（除月份外至少 7 个维度），表头完整 | 行列计数 |
| T4-03 | rule | 干湿季差异在表内有明确体现（干季少雨 / 雨季午后雷雨等描述） | 文本抽查 3 行 |
| T4-04 | rule | 无 NOAA / FWC 字样出现在前端（规格记录可存在，用户前端不可见） | 前端 grep 0 条 |

**Status**: pending
**Completion Evidence**: —

---

## Task 5: 人群定制 3 路线 + 半日 / 全日通用路线

**范围**：[index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro) 新增 id=`rutas` 章节，置于 "alrededores" 之后、"comer" 之前。
**对应 AC**：AC-05 / AC-06

### 5.1 人群定制 3 卡片
- **亲子家庭**：节奏（慢）、时长（2~3h）、推荐点（喷泉定时段观赏+儿童区+树荫长椅+卫生间+饮水点+不靠近机动车道的观察位）、避免（正午暴晒、喷泉边缘奔跑、人潮拥挤台阶）。
- **摄影与观察**：黄金时刻（早 7-9 / 晚 17-19）、机位（环形路口天桥 / 喷泉前景 + 阿维拉背景 / Fisicromía 侧光 / Abra Solar 逆光剪影）、提示（三脚架占路、人群遮挡时换高度、夜景需提前占点）。
- **低体力 / 无障碍**：入口（缓坡、电梯出口、离主干道最近的无障碍通道）、路线（少折返的"8 字外圈"）、休息（每 100 米至少 1 个长椅）、厕所（最近 2 处公厕方向，不写具体门牌号）、避免（阶梯式下穿通道）。

### 5.2 通用半日 / 全日路线（2 条 details）
- 半日：时长 3~4h，距离 ~2km，体力 ★★☆☆☆；节点：地铁出口 → 环广场外圈摄影 → Fisicromía → Abra Solar → 喷泉观赏时段 → Sabana Grande 方向出口。
- 全日：时长 6~8h，距离 ~5km，体力 ★★★★☆；节点：半日基础 → Los Caobos → 午餐（仅提类型）→ UCV 或 Jardín Botánico → 傍晚返回拍夜景喷泉 → 离开。
- 每条都在每 1-2 小时节点标注"如厕/补给/遮阳点类型名"。

### Test Requirements

| TR-ID | 类型 | 条件 | 证据 |
|-------|------|------|------|
| T5-01 | rule | 亲子 / 摄影 / 低体力 3 卡片各 ≥ 5 要点 | 章节结构计数 |
| T5-02 | rule | 半日 & 全日 2 条各含：总时长、步行距离、体力星级、厕所/补给节点 ≥ 2 | details 内容 |
| T5-03 | rule | 全程 0 家商户名/餐饮品牌/酒店名，仅提类型 | 全文内容 + grep |

**Status**: pending
**Completion Evidence**: —

---

## Task 6: 访客服务与周边设施（≥8 类，中立）+ 交通分节优化

**范围**：[index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro) 现有 "Servicios alrededor" 升级改造 + "Cómo llegar" 分节标题显式化。
**对应 AC**：AC-01 / AC-02 / AC-11

### 6.1 访客服务与设施（中立）
改造现有 8 卡片为 ≥ 8 类：
- 公共卫生间 / 休息与饮水
- 医疗与药房（只说类型，分布区域）
- 餐饮类型（面包店、快餐、本地家常菜、冷热饮）
- 住宿类型（城市商务型、中价公寓、背包客型床位，不说任何品牌名）
- 购物与生活服务（超市、便利店、药店、ATM/兑换点）
- 车辆能源（加油站、公共充电点类型）
- 行李存管、共享代步、儿童活动区（若存在）
- 警务点 / 求助 / 游客信息（只说"市政安保点""官方信息岗亭"等类型名）

### 6.2 交通攻略分节
"Cómo llegar" 拆为 5 个独立子节标题（h3），顺序：
1. Desde el aeropuerto（CCS Maiquetía）
2. Transporte público（metro + autobús）
3. Taxi y aplicaciones
4. A pie（步行串联）
5. En vehículo privado（停车）
每节标题显式、互不嵌套。

### Test Requirements

| TR-ID | 类型 | 条件 | 证据 |
|-------|------|------|------|
| T6-01 | rule | 设施板块 ≥ 8 种服务类别 | 卡片计数 |
| T6-02 | rule | 交通攻略子节标题 ≥ 5 个，与 FR-02 清单一致 | index.astro heading 文本 grep |
| T6-03 | rule（AC-11 关键） | 全文 0 条具体商户/品牌名（grep：无"McDonald/Starbucks/Hilton/Cambio XX/NombreFarmacía/加油站名"类模式） | 全文 grep + 人工审阅 |
| T6-04 | rule | 保持 "Servicios alrededor" 和 "Cómo llegar" 的原有 h2 标题（可插入 h3），不删除原内容（可增强改写） | 原 h2 仍在 |

**Status**: pending
**Completion Evidence**: —

---

## Task 7: 科普与责任（≥5 节） + 历史故事扩充（≥4 段）

**范围**：[index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro) 现有 "historia" 区扩展 + 新增 id=`cultura-y-responsabilidad` 板块。
**对应 AC**：AC-07 / AC-08 / AC-12

### 7.1 科普与责任 5 节（每条 ≥ 3 句，独立段落）
- A. 喷泉循环水系统科普：处理流程、节水设计、夜间音乐灯光的控制策略
- B. 委内瑞拉动能艺术史：Otero / Cruz-Díez / Soto 的流派，1950s-1970s 兴起的时代背景，为什么"你要动着看"
- C. 文明游览：攀爬、投币、水边看护、垃圾回收，不点名任何案例
- D. 摄影边界与版权：公共艺术作品拍摄权（个人/非商用 vs 商用）、三脚架阻塞通道、航拍限制
- E. 城市安全提醒：照明区、官方出租车候客点、不街头换汇、贵重物品贴身

### 7.2 历史故事扩充 4 段（插入现有 historia 区）
- P1. 1940 年代"国家现代化"命名：为什么是 Plaza Venezuela 而不是某位总统/英雄；选址的政治地理学
- P2. 1960-70 年代地铁与争议：广场与环形交通的改造，老照片记忆里的"广场原来更像花园"
- P3. 都市传说 2 则：① 喷泉颜色每天对应国旗 三色序列；② 深夜 Abra Solar 无风自摆（必须明确标注"民间流传，未获官方证实"）
- P4. 2009 复修背景：立项原因、资金来源（笼统说"市政复修预算"不点名部长）、音乐喷泉控制系统的技术故事

### Test Requirements

| TR-ID | 类型 | 条件 | 证据 |
|-------|------|------|------|
| T7-01 | rule | 科普 + 责任 5 节均存在且每节 ≥ 3 句独立自然段 | 段落数与文本 |
| T7-02 | rule | 历史扩充 4 段均存在，其中 P3 都市传说 2 则含"民间流传，未获官方证实"免责标注 | historia 区文本 |
| T7-03 | rubric (≥4, AC-12) | 科普+历史合计 ≥ 8 段，不空泛（有具体年代/人名/作品/数字） | 段落计数 + 内容密度 |
| T7-04 | rule | 不点名任何当代政府官员个人名字；仅说"市政当局""国家文化部"等机构类词汇 | grep 否决 |

**Status**: pending
**Completion Evidence**: —

---

## Task 8: 验证 + 最终交付检查

**范围**：运行静态验证 + 全文 grep 校验 + 无内容删减 diff。
**对应 AC**：AC-11（rubric）/ NFR-01 / NFR-02 / NFR-04
**前置任务**：Task 1-7 全部 completed

### 执行清单
1. GetDiagnostics：0 条错误。
2. 全文 grep：
   - `open-meteo|免费|无需密钥|api.*key|api 接口` — 0 条
   - 随机 10 个常见连锁品牌（西语/英语）— 0 条
3. git diff（对比 pre-commit 基线）：原有章节（historia/arte/visita/servicios/como-llegar/alrededores/comer/mapa/faq/fuentes/底部三栏）不被删除。
4. `.gitignore` 条目检查。

### Test Requirements

| TR-ID | 类型 | 条件 | 证据 |
|-------|------|------|------|
| T8-01 | rule | GetDiagnostics 返回空数组 | 工具输出 |
| T8-02 | rule | 技术暴露关键词 grep 0 条 | grep 输出 |
| T8-03 | rule | 品牌名抽查 0 条命中 | grep 输出 |
| T8-04 | rule | 原有章节全部保留（按标题 id 核对） | grep heading ids |
| T8-05 | rule | `.gitignore` 条目完整 | Task1 TR 复核 |

**Status**: pending
**Completion Evidence**: —

---

## 验收覆盖矩阵（AC → Tasks）

| AC | 任务集合 |
|----|----------|
| AC-01 | T6 |
| AC-02 | T6 |
| AC-03 | T3 |
| AC-04 | T4 |
| AC-05 | T5 |
| AC-06 | T5 |
| AC-07 | T7 |
| AC-08 | T7 |
| AC-09 | T2 |
| AC-10 | T1 |
| AC-11 | T6 + T8 |
| AC-12 | T7 + T8 |
| AC-13 | T3 + T8 |
