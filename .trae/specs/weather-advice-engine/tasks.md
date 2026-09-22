# Plaza Venezuela 天气模块智能建议引擎实施任务

> 对应 spec：[spec.md](file:///h:/GitHub/plazavenezuela/.trae/specs/weather-advice-engine/spec.md)

---

## Task W1：Weather.astro frontmatter 重构 — buildAdviceEngine 建议引擎 + 地理扩展

**范围**：[Weather.astro](file:///h:/GitHub/plazavenezuela/src/components/Weather.astro) 第 1–184 行（frontmatter 逻辑区，不碰模板区 DOM）
**对应 AC**：W-03 / W-04 / W-07
**前置**：无

### 实现步骤（只在 frontmatter，不改模板）
1. 保留现有 4 个 Label 函数、weatherIcon、weatherText、日期格式化函数；保留 CACHE、globalThis 缓存逻辑、fetch URL 不变；
2. 在 badges 之后新增 `buildAdviceEngine(ctx: {...}): { risks: string[], outfits: string[], activities: string[], carries: string[] }` 纯函数，参数 ctx 包括：`current, todayDaily, humidityLabelResult, uvLabelResult, windLabelResult, tempLabelResult`；
3. 把 FR-02 的 7 大类（降水 5 条 / 高温 UV 3 条 / 低温温差 3 条 / 风力 4 条 / 晴阴 3 条 / 雾霾 1 条 / 合成预警 1 条）合计 20+ if 分支全部显式写出，**每个分支对应 push 固定文案字符串到对应数组**（条件多选，严禁用 else 互斥覆盖）；
4. 把 FR-03 地理场景 3 类追加条件写在函数末尾：
   - 场景 A（常驻广场）：晴朗/降水/大风时追加 Plaza Venezuela 专属名词（环形天桥/喷泉夜景/Sabana Grande/UCV 走廊）；
   - 场景 B（绿地森林）：湿度 > 70% ∧ t≥24 → carries 追加「🎒 林荫区蚊虫多，备驱蚊液/防蚊贴」；code=51~65 小雨/中雨 → activities 追加 Los Caobos 雨后泥泞防滑；
   - 场景 C（沿海大都会）：uv≥7 ∧ tmax≥28 → activities 追加海岸 UV 反射；wind≥29 → outfits 追加海岸通用帽子固定绳；
5. 所有数组条目 **去重**（同一建议可能被两个条件同时命中，最后对 4 数组做 `Array.from(new Set(arr))`）；
6. FALLBACK 分支（ok=false）：对 FALLBACK 的 temp/humidity/wind/uv 字段合成 todayDaily，跑一遍 buildAdviceEngine 得到 4 数组，保证失败降级也有通用建议输出（覆盖 W-07）；

### Test Requirements
| TR | 类型 | 条件 | 证据 |
|----|------|------|------|
| W1-01 | rule | frontmatter `buildAdviceEngine` 函数存在，且独立 if 分支 ≥ 22 条（降水 5 + 高温 3 + 低温 3 + 风力 4 + 晴阴 3 + 雾霾 1 + 合成预警 1 + 地理场景 ≥ 2） | Weather.astro frontmatter if 计数 |
| W1-02 | rule | 4 个数组末尾均做了 Set 去重 | 四个数组赋值均有 `= Array.from(new Set(xxx))` |
| W1-03 | rule | FALLBACK 分支也调用了 buildAdviceEngine 并获得 outfits/activities/carries 各 ≥ 2 条 | ok=false 分支代码 |
| W1-04 | rule | 地理专属关键词（环形天桥\|喷泉夜景\|Los Caobos\|Jardín Botánico\|Sabana Grande\|UCV）在文案中出现 ≥ 3 次 | 文案字符串 grep |

**Status**: pending
**Completion Evidence**: —

---

## Task W2：Weather.astro 模板区改造 — 4 类建议块动态渲染 + UI 三标签

**范围**：[Weather.astro](file:///h:/GitHub/plazavenezuela/src/components/Weather.astro) 第 184 行到文件尾（模板 DOM 区，不改 frontmatter）
**对应 AC**：W-01 / W-02 / W-05 / W-06
**前置任务**：Task W1

### 实现步骤
1. **保留**基础天气卡片（204–268 行）原视觉结构，小改动：把 badge 区从 4 枚徽章移到「出行穿搭」块内部（或者保留 badge 在底部也可以，但保留更好）；关键：数值信息**一个都不能丢**；
2. **保留**7 日预报 <table> 原结构 + caption + thead + scope；
3. 在基础卡片和 7 日表之间**插入** 4 类建议块（顺序：risks → outfits → activities → carries）：
   - 每块用 `{risks.length > 0 && <article class="...">...</article>}` 条件渲染整块包裹；
   - risks 块视觉 = 红色边框/红色文字背景强调 `border-red-300 bg-red-50 text-red-700 shadow-[0_18px_50px_rgba(200,30,30,.12)]`；
   - 其余三块 = 白底卡片 `border-black/10 bg-white shadow-[0_20px_60px_rgba(23,33,31,.07)]`；
   - 每块内部标题固定格式 `<h3 class="text-lg font-extrabold mb-3">图标 区块名</h3>` → 风险 = `⚠️ 风险提醒` / 穿搭 = `✅ 出行穿搭` / 游玩 = `✅ 游玩安排` / 随身 = `🎒 随身物品`；
   - 条目用 `<ul class="space-y-2 text-sm leading-7 text-black/70">`，每条 `<li>` 开头可加 emoji（活动类加 🎯、随身类加 🎒、穿搭类加 👕、风险类加 ⚠️）；
4. NFR-06 零堆字校验：**绝对不写**「今日暂无风险提醒」「今日不需要带伞」等占位型废话；只要数组空 → 整块 article DOM 不渲染；
5. ok=false 降级：在基础卡后面放 3 条 FALLBACK 建议（穿搭/游玩/随身），**完全隐藏 7 日预报**（避免误导用户以为是实时预报）；
6. 更新时间 label 保留原样；

### Test Requirements
| TR | 类型 | 条件 | 证据 |
|----|------|------|------|
| W2-01 | rule | 基础卡所有数值字段（当前温度/体感/湿度%+标签/风 km/h+标签/降水概率%+三段式/UV+标签/日出日落）全部仍在模板里输出（不丢信息） | 模板区字段 grep |
| W2-02 | rule | 4 块（risks/outfits/activities/carries）均用 `{arr.length>0 && <article>...}` 条件包裹 | 模板正则计数 4 次 `&& <article` |
| W2-03 | rule | 7 日预报 <table> 结构未做删改（caption/thead/scope 仍在） | 模板区 table 结构 grep |
| W2-04 | rule | ok=false 分支：7 日表整块不渲染；FALLBACK 3 条通用建议展示在基础卡下方 | Weather.astro ok=false 分支的模板 |
| W2-05 | rule | 模板区（frontmatter 结束 → file end）grep 0 条：`open-meteo\|免费\|API\|密钥\|接口` | 模板区 grep |

**Status**: pending
**Completion Evidence**: —

---

## Task W3：验证 + 交付

**范围**：工具验证 + 全文 grep + 小瑕疵修
**对应 AC**：W-01~W-08 综合
**前置**：W1 + W2 completed

### 执行清单
1. **GetDiagnostics**：Weather.astro + index.astro 合计 0 条错误（弱验证，真实 astro check 需 Node 24）；
2. **模板区 grep 技术词**（NFR-03/W-05）：取 Weather.astro 184 行之后的纯模板文本，`-i "open-meteo\|免费\|api\|密钥\|接口"` → 0 条；
3. **气象术语 grep**（NFR-02）：模板区 `-i "相对湿度\|辐照\|露点\|蒲福\|天气现象代码\|气温日较差\|Beaufort\|WMO"` → 0 条；
4. **堆字占位句 grep**（NFR-01/W-06）：模板区 `-i "暂无建议\|无需携带\|今日没有\|今天不"` → 0 条（即不存在空状态占位）；
5. **W-08 文案质量 rubric 打分**（0-5）：独立对 7 大类 22 条 if 文案做内容审查，给 4 或 5 分，写打分依据；
6. 小瑕疵修补：任何以上 grep 命中 → 返回 W1/W2 修改，再次跑清单。

### Test Requirements
| TR | 类型 | 条件 | 证据 |
|----|------|------|------|
| W3-01 | rule | GetDiagnostics = [] | GetDiagnostics 工具输出 |
| W3-02 | rule | 模板区 技术词 grep 0 | Weather.astro 模板区 grep 结果 |
| W3-03 | rule | 模板区 气象术语 grep 0 | Weather.astro 模板区 grep 结果 |
| W3-04 | rule | 模板区 堆字占位句 grep 0 | Weather.astro 模板区 grep 结果 |
| W3-05 | rubric (≥4) | W-08 rubric ≥4，目标 5 | 打分依据写入 Completion Evidence |

**Status**: pending
**Completion Evidence**: —

---

## AC → Tasks 覆盖矩阵

| AC | 任务 |
|----|------|
| W-01 | W2 (W2-01/03) + W3 |
| W-02 | W2 (W2-02/04) + W3 |
| W-03 | W1 (W1-01) + W3 |
| W-04 | W1 (W1-04) + W3 |
| W-05 | W2 (W2-05) + W3 (W3-02) |
| W-06 | W2 (W2-02) + W3 (W3-04) |
| W-07 | W1 (W1-03) + W2 (W2-04) + W3 |
| W-08 | W1+W2 文案内容 + W3 (W3-05) |
