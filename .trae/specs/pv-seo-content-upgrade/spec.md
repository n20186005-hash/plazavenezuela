# Plaza Venezuela 非盈利科普站点优化规格

## 问题
当前 [index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro) 已经具备基础结构，但仍缺少若干对落地页转化率和内容专业度至关重要的模块：实时天气与多日预报（游客做决定最常用）、季度游览策略（帮助游客选择出行月份）、按人群定制的游览方案、半日/全日路线、中立不点名商户的访客服务与周边设施总结、科普与访客责任板块。交通攻略虽已存在但可更结构化。SEO 标题需统一为「景点名称+城市+旅游指南」格式。同时需扩充历史背景和故事传说，让单页更像专业科普落地页，避免内容过于单薄。

## 目标用户
- 境外/境内普通游客：做"要不要去、怎么去、带什么"决策的人群（占搜索流量 70%+）。
- 亲子家庭、摄影爱好者、老年/无障碍人群：有特定节奏与偏好的细分游客。
- 搜索引擎爬虫：需要更完整实体语义、更丰富正文、FAQPage/BreadcrumbList 等 Schema 节点。

## 目标
1. 在现有页面基础上新增用户关心的信息模块，不胡乱删减原有内容。
2. 所有商业类推荐（餐饮、住宿、加油、商超等）仅按"服务类型"中立概述，不点名任何具体商户。
3. 前端页面不得出现「免费 API / 无需密钥 / Open-Meteo 免费」等技术实现说明；游客只看到"天气准不准、要不要带伞"的人性化表达。
4. SEO 标题统一为「Plaza Venezuela Caracas 旅游指南」式命名格式。
5. 内容更丰富：补充历史背景、故事传说、年代轶闻，使页面呈现专业科普气质。
6. 补全 Cloudflare Workers 手动部署场景下的 `.gitignore`，避免工作区/产物/敏感文件误上传。

## 非目标
- 不改动 Astro 架构、不升级依赖版本。
- 不引入付费天气 API，保持非盈利无密钥特征。
- 不做电商、不做预订、不做商户点评，保持非盈利立场。
- 不删除或弱化已有的西语长文内容、时间轴、艺术品介绍、FAQ、资料来源等已有板块。

---

## 功能需求（FR）

### FR-01 访客服务与周边设施（类型中立）
在页面新增一块总结式板块（可在「Servicios alrededor」基础上增强或替换为更结构化版本），至少覆盖：公共卫生间、游客中心/信息点、餐饮类型（面包店/快餐/本地家常菜/饮品）、住宿类型、商超与便利业态、加油与电动车充电、ATM/兑换点、医务室/药房。每类仅描述类型、存在区域与注意事项，不点名任何具体商户/品牌。

### FR-02 交通详细攻略结构优化
将现有「Cómo llegar」升级为分节式详细攻略：
- 机场出发（CCS Maiquetía）：公共交通联程、授权出租车/私车、预计时长与影响因素；
- 公共交通：地铁节点 + 步行出口、公交/城际大巴换乘点、高峰提示；
- 出租车/出行应用：上车点建议、夜间返程建议、避免车道中间停车等安全点；
- 步行：与 Sabana Grande / Los Caobos / UCV / Jardín Botánico 的步行串联、安全过街要点；
- 自驾：停车类型（路侧咪表/私人车场/商业中心车位）、高峰时段避堵建议。

### FR-03 实时天气 + 多日预报模块
- 使用 **Open-Meteo 公开接口**，服务端（Astro Component `fetch` + `Astro.request` 侧缓存）请求 `https://api.open-meteo.com/v1/forecast`。
- 请求参数：`latitude=10.4967&longitude=-66.8884&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code,wind_speed_10m_max,uv_index_max,sunrise,sunset&timezone=America%2FCaracas&forecast_days=7`。
- 服务端缓存：使用 Astro/Worker 端级缓存至少 20 分钟（避免每次请求触发外部 fetch）。
- 渲染内容：
  - 当前体感卡片：温度、体感温度、湿度人性化描述（"干燥舒适/潮湿闷热"等，数值仅作副文本）、降水概率、紫外线（"强/很强，防晒"）、风速风向；
  - 7 天日报：最高/最低温、降水概率、紫外线、日出日落、图标；
  - "带伞/带外套/防晒/饮水"四个出行建议徽章（由 weather code + precipitation_probability_max + uv_index_max 派生）。
- **前端绝对禁止出现**："免费"、"无需密钥"、"Open-Meteo"、"API" 等技术实现字样。

### FR-04 季度游览策略表
新增一个 4 行（Q1-Q4 或 12 月分栏）× 若干维度的表格，基于加拉加斯常年气候态进行综合分析（不需要真的调 NOAA，科普描述即可）：
- 维度至少包含：气温体感、降雨概率与天气特点、建议穿搭、推荐活动/避坑、游客密度估计、摄影光线评价、 fountain/喷泉夜景优势月、注意事项（如防晒/驱蚊）。
- 标题文案为「季度游览策略 / 加拉加斯 30 年气候态综合分析」，前端不出现 NOAA/FWC 字样（规格内部保留但用户前端不可见）。

### FR-05 按人群定制游览方案
3 张并列卡片或分节：
- **亲子家庭**：节奏慢、强调儿童活动区、卫生间、饮水点、遮阳、安全距离（车流/喷水）、建议时长、休息点；
- **摄影自然**：黄金时刻推荐、机位（广场全景、Abra Solar 风动、Fisicromía 侧光、喷泉夜景）、三脚架/人流提示；
- **低体力/无障碍**：缓坡/出入口、地铁升降梯/坡道、平坦步行路线、休息长椅密度、如厕点位、减少折返的路线。

### FR-06 通用游览路线（半日 / 全日）
两条可展开的 `<details>` 或分步列表：
- **半日（3~4 小时）**：抵达 → 广场环拍 → Abra Solar / Fisicromía → 喷泉时段（若开放）→ 餐饮补给 → Sabana Grande 步行街出口；
- **全日（6~8 小时）**：半日基础上，串联 Los Caobos 公园 → 午餐（类型建议）→ UCV 或 Jardín Botánico → 傍晚回广场拍夜景喷泉 → 返程。
- 每条路线含：总时长、步行距离（估计）、体力等级、厕所/饮水/遮阳节点。

### FR-07 科普与访客责任
独立板块，至少 4 段正文：
- **科普 1**：喷泉循环水系统（如何处理水、如何形成彩色/音乐、节水措施）——城市水景科普；
- **科普 2**：委内瑞拉动能艺术史（Soto/Otero/Cruz-Díez 流派、1950-1980 年代兴起、他们的作品为什么"要走动才看得到"）；
- **责任 1**：文明游览（不攀爬雕塑、不踩踏花坛、不留下垃圾、儿童靠近水景需陪护、不向池内投币/杂物）；
- **责任 2**：摄影与版权（公共艺术作品的拍摄边界、航拍限制、商业用途需单独授权、禁止三脚架阻塞通道等）；
- **责任 3**：城市安全提醒（财物、夜间照明区、使用官方出租车点、不接受街头换汇）——保持客观，不恐吓。

### FR-08 历史背景与故事传说扩充
在现有 Historia 板块基础上，至少补 3 段：
- 1940 年代的「国家现代化叙事」： plaza 为何命名为 Venezuela（而不是某个人名），为何选址 Los Caobos/El Recreo 边界；
- 1960-1970 年代地铁与城市扩张的争议：建地铁是否破坏了广场、历史照片前后对比的"老广场长啥样"；
- 都市传说（以「流传说法」语气而非事实陈述）：喷泉的某组颜色对应国旗、深夜雕塑"会动"等——明确标注"民间流传，未被官方证实"；
- 2009 复修工程的背景：为何重修、资金来源、加入音乐喷泉的技术路线。

### FR-09 SEO 命名格式统一
- `<title>` 改为：`Plaza Venezuela (Caracas) - 旅游指南 & 地理位置`（西语版本也要有对应主标题）；
- WebPage/WebSite schema 的 `name` 字段同步为"Plaza Venezuela Caracas 旅游指南"；
- 保证 Canonical 为 `https://plazavenezuela.org`，OG:title 与之一致。

### FR-10 `.gitignore` 补全（Cloudflare Workers 手动部署）
针对 Astro + wrangler + pnpm + 手动部署到 Cloudflare Workers 的场景，补充忽略：
- `.wrangler/`、`wrangler.toml.local`、`.dev.vars`、`.env*`；
- `dist/`、`.astro/`、`node_modules/`、`.pnpm-store`、`coverage/`；
- 系统文件：`Thumbs.db`、`.DS_Store`、`desktop.ini`；
- 编辑器：`.vscode/`、`.idea/`、`*.swp`、`~*`；
- 日志：`*.log`、`npm-debug.log*`、`yarn-error.log*`、`pnpm-debug.log*`；
- 保留：`wrangler.jsonc`（项目已有）为部署配置。

---

## 非功能需求（NFR）

### NFR-01 中立无商户原则（rule）
任何出现餐饮/住宿/加油/充电/商超的正文，只可写业态与区域，**一律不可出现具体商户名、品牌名、商场名、连锁图标**。检查方式：全文 grep 常见连锁名（无正则，人工复核）并查看有无品牌英文/西语拼写。

### NFR-02 无技术暴露原则（rule）
访客可见 HTML 中，`grep -i -E "open-meteo|免费|无需密钥|api key|api 接口"` 应为 0 条匹配。天气模块仅以"今日天气 / 未来 7 天预报"等面向游客措辞呈现。

### NFR-03 服务端缓存（rule）
天气数据获取必须在 Astro SSR/服务端执行，使用缓存层（Astro.locals 或全局 Map + 20 分钟 TTL），单 20 分钟窗口内外部 fetch 调用不超过 1 次。

### NFR-04 无内容删减（rule）
`git diff` 对比上一个提交，[index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro) 中原有的西语长段不得被整体删除，段落顺序可重排、可新插入，但原有章节（historia/arte/visita/servicios/como-llegar/alrededores/comer/mapa/faq/fuentes/底部三栏）均保留。

### NFR-05 无障碍与性能（rubric，0-5，阈值 ≥ 4）
- 2：所有天气图标带 alt 文本；表格有 `<thead>` + 明确 scope；details/summary 键盘可用；
- 3：天气卡片使用语义 `<article>`，出行建议 badge 带 aria-label；
- 4-5：模块均使用渐进增强（不依赖 JS），且不引入阻塞 JS；图片仍 lazy/eager 分层合理。

### NFR-06 科普深度（rubric，0-5，阈值 ≥ 4）
- 2：科普仅停留在表面事实罗列；
- 3：有历史背景+都市传说，但动能艺术流派描述空泛；
- 4：覆盖 FR-07 的 5 条内容且每条 ≥ 3 句，历史扩充 FR-08 ≥ 3 段；
- 5：额外加入 1 段「喷泉灯光与国家色彩的对应」科普或「为什么加拉加斯的气候这么稳定」的微气候解释。

---

## 约束 / 假设 / 依赖
- **约束**：部署平台 Cloudflare Workers（手动），因此必须兼容 SSR/Edge runtime；Node 版本环境有差异，最终检查以 `astro check` 在正确 Node 环境下通过为准（本地 IDE 诊断 0 条即可）。
- **假设**：Open-Meteo 在构建/SSR 时可访问；若无法访问，页面优雅降级为"实时天气暂不可用，以下为基于加拉加斯常年气候的建议"。
- **依赖**：现有 [site.ts](file:///h:/GitHub/plazavenezuela/src/data/site.ts) 的经纬度、域名、附近地标已更新；无需额外 NPM 包，全部使用 `fetch` + 原生 Map 缓存。

---

## 验收标准（Acceptance Criteria）

| ID | 类型 | 内容 | 证据来源 |
|----|------|------|----------|
| AC-01 | rule | 访客服务与周边设施板块至少覆盖 8 类服务且无具体商户名 | [index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro) grep |
| AC-02 | rule | 交通攻略显式分机场/公共交通/出租车/步行/自驾 5 小节 | index.astro 章节结构 |
| AC-03 | rule | 天气模块来自服务端 fetch，含当前体感 + 7 天预报 + 出行建议徽章，前端无 Open-Meteo/免费/密钥等文字 | index.astro HTML 输出 + weather 数据组件 |
| AC-04 | rule | 季度策略表（12 月或 4 季度）至少 7 个维度，渲染为 `<table>` | index.astro |
| AC-05 | rule | 3 条人群定制路线卡片各至少 5 个要点（时长/节奏/推荐点/厕所/注意） | index.astro |
| AC-06 | rule | 半日 / 全日路线，各含时长/距离/体力/节点 | index.astro |
| AC-07 | rule | 科普与责任板块至少 5 节（喷泉/动能艺术/文明游览/摄影版权/城市安全） | index.astro |
| AC-08 | rule | 历史故事扩充 ≥ 4 段，其中含至少 1 条都市传说并标注"民间流传" | index.astro Historia 区 |
| AC-09 | rule | `<title>`、WebPage.name、WebSite.name 含"Plaza Venezuela Caracas 旅游指南"式格式，canonical 为 `https://plazavenezuela.org` | index.astro head 与 schema |
| AC-10 | rule | `.gitignore` 包含 .wrangler、.dev.vars、dist、.astro、.env、node_modules、系统/编辑器文件、日志 | `.gitignore` 文件内容 |
| AC-11 | rubric (≥4) | 中立无商户原则：全文 0 条具体品牌点名 | 人工审阅 + 关键词 grep |
| AC-12 | rubric (≥4) | 内容专业度：科普与历史合计 ≥ 8 段独立自然段，段落不空泛 | index.astro 段落计数与内容深度 |
| AC-13 | rubric (≥4) | 人性化天气呈现：湿度/紫外线/风被翻译为建议文字，不是只打印数字 | 天气卡片 HTML 文本 |
