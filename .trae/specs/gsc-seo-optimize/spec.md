# GSC 数据驱动 SEO 优化规格

> 基于 2026-06-24 ~ 2026-09-19（前 3 个月）Google Search Console 原始数据 + Google Maps 4.2★/35,364 条评论实体。
> 相关历史规格：`pv-seo-content-upgrade/spec.md`（上一轮内容大改）；`weather-advice-engine/spec.md`（上一轮天气模块升级）。

## 问题

**GSC 现状**：
- 3 个月曝光仅 **125 次**、点击 **1 次**（CTR ≈ 0.8%），整体可见度极低；
- 主关键词 `plaza venezuela` 34 次曝光但 CTR 0%，`plaza venezuela caracas` 10 次曝光 CTR 0%，说明 **SERP 标题/描述文案吸引力差**或**URL 版本不统一**；
- 行動裝置曝光 87 次（70%）但 0 点击，桌面 38 次曝光贡献了唯一 1 次点击，**移动端 SERP Title 截断 / Meta Description 缺失是核心怀疑点**；
- 「國家_地區」委內瑞拉本地 102 次曝光（82%） + 1 次点击；西班牙、哥伦比亚、墨西哥等西语国有长尾曝光，**es 主语言覆盖 OK，但 `http://` 版本仍有 11 次曝光、HTTPS 规范未生效**；
- 「查詢」数据显示排名前 6 的高意图关键词 `plaza vzla / plaza whats on / como llegar / plaza venezuela ubicación` 虽曝光少但排名均在前 20，**「交通/位置」类意图尚未有足够正文/锚点覆盖**；
- 「搜尋外觀」无任何 rich snippet 命中（FAQ/Sitelinks/Carousel 等全空），**说明现有 JSON-LD 可能在格式上被 Google 忽略，或内容重复、inLanguage 与正文不一致**。

**现有实现的结构性问题**：
1. `<title>` 和 WebSite/WebPage `name` 采用中文（`Plaza Venezuela Caracas 旅游指南`），而用户搜索词 13 条全部为西语，**与 GSC 搜索语言不匹配**；
2. Meta Description 为英文，`<html lang="es-VE">` 与 Title/Description 语言失配；
3. canonical 使用 `Astro.site` + Astro.url.pathname 合成，当前 Astro.site= `https://plazavenezuela.org`、pathname `/`，合成结果正确，但 **缺少 HTTP → HTTPS 服务端 301 配置指引文件 `_redirects`（Cloudflare Pages/Workers 站点必备）**，导致 http:// 版本仍获得搜索曝光（权重分流）；
4. `<head>` 缺失西语 alternateName 的 `<title>` 变体、缺失 OpenGraph `description` 与 WebPage description 的西语同步、缺失 `og:locale:alternate`（es_ES/es_MX/es_CO 等主要西语市场）、缺失 `hreflang`（单页无需 x-default，需明确 es-VE 默认）；
5. TouristAttraction JSON-LD 的 description 为西语，但 WebSite/WebPage 描述/name 是中/英文，**inLanguage es-VE 与 name/description 实际语言不一致**，Rich Snippet 失败概率高；
6. `site.ts` 描述也是西语，但 `BaseLayout.astro` 默认 description= siteInfo.description，没有和独立 SEO 变量挂钩，**Title/Description 无法快速替换**；
7. Plus Code（`F4W7+MMM`）只在 address 文本里出现，未纳入 TouristAttraction `additionalProperty` 或 `identifier`；
8. 首屏 H1 / 语义首段缺少对 `ubicación / cómo llegar / Av. Casanova / Metro Línea 1 / Plus Code` 等高意图词的密集覆盖；
9. robots.txt（public/robots.txt）需要验证是否明确指向 sitemap，sitemap（@astrojs/sitemap）已启用，但需确认 `<link rel=sitemap>` 也显式注入 head。

## 目标用户

1. **加拉加斯本地用户（委內瑞拉 82% 曝光）**：西语，手机 70%，查「plaza vzla」「ubicación」「cómo llegar」「Metro」；
2. **跨西语国家游客（西班牙/哥伦比亚/墨西哥/美国西语裔）**：查「Plaza Venezuela Caracas Guía」「historia fuente」；
3. **爬虫/Rich Snippet**：需要 Title/Description/inLanguage/name 四者语言一致，避免 Schema 混合语言导致忽略。

## 目标

1. **TDK 全西语对齐**：Title/Description/Keywords/WebSite.name/WebPage.name/TouristAttraction.name 全部使用西语，和 html lang=es-VE、正文西语内容 100% 语言一致；
2. **HTTP → HTTPS 301 规则文件**：在 Cloudflare Workers 部署环境新增 `public/_redirects`（`http://* → https://*` 301 全站）以及 wrangler.jsonc 可能需要的 route 规则；
3. **Canonical 强约束**：BaseLayout 禁止用 Astro.url 动态合成，改为显式传入 `canonical` 参数（首页固定 `https://plazavenezuela.org/`），避免任何情况下生成 http:// 或带端口的非规范 URL；
4. **Social / Hreflang / OG 补全**：og:locale=es_VE，添加 og:locale:alternate 5 个西语市场 + en_US；og:title 与 Title 完全一致；og:image:alt 全西语；Twitter/X title/description 独立注入；
5. **Schema 语言一致 + Plus Code**：TouristAttraction description、WebSite name/description、WebPage name/description 全部改为西语，保证和 inLanguage: es-VE 匹配；新增 TouristAttraction 的 `identifier: { "@type":"PropertyValue","name":"Plus Code","value":"F4W7+MMM" }`；
6. **高意图词 H1/H2/首段覆盖**：在 hero 首段和 H1 下方 subheading 中，自然植入 `ubicación / cómo llegar / Metro / Av. Casanova / Plus Code / Fuente Iluminada / Arte Cinético / Entrada Gratuita / Horario 06:00–21:00` 等高 CTR 意图词；
7. **robots.txt + `<link rel=sitemap>`**：robots.txt 明写 Sitemap: https://plazavenezuela.org/sitemap-index.xml；head 里显式注入 `<link rel="sitemap" type="application/xml" href="...">` 强化爬虫指示；
8. **Canonical / HTTP 版本自查**：在 head 加入 `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">` 作为 HTTP→HTTPS 的浏览器层兜底（不替代服务端 301）。

## 非目标

- 不修改任何正文西语长文（关于/历史/艺术/FAQ 等已经存在的内容），只修改 hero、head、JSON-LD 等 SEO 外壳；
- 不新增页面（保持单页架构，避免 sitemap 断裂）；
- 不做真实 Cloudflare 部署（保持手动部署，只写配置文件 `_redirects`）；
- 不接入 GSC API、不接入新 GA4（保持现有 GA4 ID）。

---

## 功能需求（FR）

### FR-01 TDK 全西语重写（精准匹配 GSC 搜索语言）

基于你建议的范例「Plaza Venezuela en Caracas: Ubicación, Cómo Llegar y Guía Turística」，结合关键词曝光分布，输出：

- **Title （≤60 chars，避免移动端截断）**：
  `Plaza Venezuela Caracas · Ubicación, Cómo Llegar y Guía`
- **Meta Description（≤155 chars）**：
  `Descubre Plaza Venezuela en Caracas. Ubicación exacta Av. Casanova (Plus Code F4W7+MMM), cómo llegar en Metro, historia de la fuente iluminada, arte cinético y consejos de visita. Entrada gratuita 06:00–21:00.`
- **`<meta name="keywords">`（兼容少数搜索引擎）**：
  `Plaza Venezuela, Caracas, Venezuela, Ubicación, Cómo llegar, Metro de Caracas, Fuente de Plaza Venezuela, Arte Cinético, Guía turística, Plus Code F4W7MMM, Distrito Capital`
- **og:title** = Title；**og:description** = Description；**twitter:title/twitter:description** 同上独立注入；
- **og:image:alt** 西语：`Vista principal de Plaza Venezuela, Caracas, Distrito Capital, Venezuela`；
- **`inLanguage` es-VE 与 TDK 语言一致**：所有 Schema 节点的 name/description 均为西语；

### FR-02 HTTP → HTTPS 服务端 301 规则（Cloudflare Workers）

- 在 `public/` 新建 `_redirects` 文件（Cloudflare Workers/Pages 都能识别）：
```
# 全站 HTTP → HTTPS 301 永久重定向（GSC 数据显示 http:// 版本仍有 11 次曝光分流）
http://plazavenezuela.org/*    https://plazavenezuela.org/:splat    301
http://www.plazavenezuela.org/* https://plazavenezuela.org/:splat 301
https://www.plazavenezuela.org/* https://plazavenezuela.org/:splat 301
```
- 若 wrangler.jsonc 已有 routes 数组，确保追加 `"*://plazavenezuela.org/*"` 匹配 `https://`，不要包含 `http://` 路由；
- 在 `<head>` 加入 `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">` 作为浏览器端 HTTP→HTTPS 兜底。

### FR-03 Canonical 强约束（显式传入，禁止动态合成兜底错误）

- BaseLayout Props 新增 `canonical?: string` 可选参数；**当显式传入时，优先使用传入值**，否则保持旧 `Astro.site + Astro.url.pathname` 合成；
- index.astro 调用 BaseLayout 时显式传 `canonical="https://plazavenezuela.org/"`；
- 确保 WebPage/WebSite JSON-LD 两个节点的 `url` 都固定写 `https://plazavenezuela.org/`，不再依赖 Astro.site 环境变量；
- 在 og:url / twitter:url 注入同 canonical 固定值，四者（`<link canonical>` / `og:url` / `WebSite.url` / `WebPage.url`）完全一致。

### FR-04 OG / Twitter / Hreflang 注入

- og:locale 保留 es_VE；**新增 5 个 alternate**：`og:locale:alternate = es_ES / es_MX / es_CO / es_AR / en_US`；
- 注入 2 条 `<link rel="alternate" hreflang="es-VE" href="https://plazavenezuela.org/">` 与 `hreflang="x-default"`（单页站点，x-default 和 es-VE 指向同一 URL 是允许的）；
- Twitter Card 保持 `summary_large_image`；独立注入 `<meta name="twitter:title" content={TITLE}>` / `<meta name="twitter:description" content={DESC}>`；

### FR-05 Schema 语言一致 + Plus Code 植入

- TouristAttraction 的 name 保留 `Plaza Venezuela`；description 已为西语，保留；追加 identifier + additionalProperty：
```json
"identifier": {
  "@type": "PropertyValue",
  "name": "Plus Code",
  "value": "F4W7+MMM"
},
"additionalProperty": [
  { "@type": "PropertyValue", "name": "Entrada", "value": "Gratuita" },
  { "@type": "PropertyValue", "name": "Horario habitual", "value": "06:00–21:00" },
  { "@type": "PropertyValue", "name": "Estación de Metro más cercana", "value": "Plaza Venezuela (Líneas 1, 3, conexión Línea 4)" }
]
```
- WebSite JSON-LD：`name` 改为 `Plaza Venezuela · Guía Turística Caracas`（之前是中文）；`alternateName` 新增 `Guía de Plaza Venezuela, Caracas`；`description` 改成西语；`inLanguage` 保留 es-VE；
- WebPage JSON-LD：`name` 改为 Title（`Plaza Venezuela Caracas · Ubicación, Cómo Llegar y Guía`）；`description` = Meta Description 西文；`inLanguage` 保留 es-VE；
- 保留 TouristAttraction `@type` 多态（TouristAttraction/LandmarkOrHistoricalBuilding/Park），不删；保留 aggregateRating（4.2/35364）、sameAs（Wikidata/Wikipedia/Maps CID）不删。

### FR-06 Hero 高意图词密集覆盖（自然植入不堆砌）

- 保持 Hero H1 原本的艺术性大字，但在 H1 下方的 subheading / eyebrow 位、以及 hero 段正文里，自然植入：
  - `Plaza Venezuela en Caracas · Distrito Capital`
  - `Ubicación: Av. Casanova · Plus Code F4W7+MMM`
  - `Cómo llegar: Estación Metro Plaza Venezuela (Líneas 1 y 3, enlace Línea 4)`
  - `Entrada gratuita · Horario habitual: 06:00–21:00`
  - `Fuente iluminada + Arte cinético al aire libre`
  - 这些内容可以以 `<p class="mt-8 leading-8">...</p>` 的形式新增在现有 hero 文本下方，不删除原西语文本；
- 若 hero 区域已有 eyebrow（`Guía oficial del visitante` 之类），替换为包含高意图词的新版 eyebrow：`Guía sin fines de lucro · Ubicación exacta · Cómo llegar en Metro · Horario y consejos`。

### FR-07 robots.txt + sitemap `<link>` 注入

- public/robots.txt 确保有：
```
User-agent: *
Allow: /
Sitemap: https://plazavenezuela.org/sitemap-index.xml
```
- `<head>` 显式加入 `<link rel="sitemap" type="application/xml" title="Sitemap" href="https://plazavenezuela.org/sitemap-index.xml">`；
- robots.txt 不 Disallow 任何路径（单页小站点，无 admin 后台）。

---

## 非功能需求（NFR）

### NFR-01 Title 移动端不截断（rule）
字符长度 ≤ 60（Google 移动端建议 ≤50~60 px）；不出现中文/中日韩字符（会占用双倍 px 宽度，加速截断）。

### NFR-02 Description 全西语 ≤ 155 chars（rule）
不包含中文/英文；关键词 `Plaza Venezuela / Caracas / Ubicación / Cómo llegar / Metro / Fuente / Plus Code` 至少命中 4 个；开头动词号召 `Descubre Plaza Venezuela…` 提升 CTR。

### NFR-03 四 URL 完全一致（rule）
`<link canonical> / <meta og:url> / WebSite.url / WebPage.url` 四条 grep 必须完全相同 = `https://plazavenezuela.org/`（末尾 `/` 一致）。

### NFR-04 inLanguage/name/description 语言同质性（rule）
对 `<html lang> + Schema 三个节点 inLanguage + TDK + OG description` 做语言一致性检查：不得混合中文/英文在 es-VE 的任何节点上。

### NFR-05 GSC 关键词意图覆盖率（rubric 0-5，阈值 ≥4）
GSC 查詢.csv 13 条关键词按主题聚类：① plaza venezuela 核心名（第 0,1,4,5,8,10,12 条）② ubicación（2）③ como llegar（7,9,11）③ caracas（1,3）⑤ plaza whats on（6）。每条聚类在 Schema name / alternateName / Description / Hero 首段 里必须显式至少出现 1 次匹配词（不做关键词堆砌，自然出现即可）：
- 5 分：5 聚类全部覆盖 + 俚语简称 `plaza vzla` 也在 alternateName 里显式列一次；
- 4 分：4 聚类覆盖；
- 3 分以下：不合格。

---

## 假设/依赖/开放问题

- **假设**：Cloudflare Workers 手动部署后会识别 public/_redirects 并自动下发 301；若 Workers 环境要求额外 wrangler 规则，用户可在部署后手动追加 route。
- **依赖**：@astrojs/sitemap 已启用且生成 `/sitemap-index.xml`（astro.config.mjs line 5,9 已确认真实启用）。
- **开放问题 1**：GSC 显示 http://plazavenezuela.org 有 11 次曝光，但用户未说明是否已经在 Cloudflare 配置了 TLS 1.2+ 与 Always Use HTTPS；本规格只在 `_redirects` 文件里提供静态规则，不覆盖真实 Cloudflare 控制面板设置。
- **开放问题 2**：中文「旅游指南」保留在 alternateName 的哪一个 Schema 节点上 → 本规格决定**从 Title/WebSite.name/WebPage.name 删除中文中文**，仅保留 alternateName 数组里的 1 条英文「Plaza Venezuela Caracas Travel Guide」作为英文补充，不影响 es-VE 主语言。（避免移动端标题因中文截断）

---

## 验收标准（Acceptance Criteria）

| ID | 类型 | 内容 | 证据 |
|----|------|------|------|
| S-01 | rule | `<title>` 改为西语 `Plaza Venezuela Caracas · Ubicación, Cómo Llegar y Guía` 且长度 ≤ 60 chars、0 中文字符 | index.astro 变量 |
| S-02 | rule | `meta description` 西语 ≤155 chars，至少包含 4 个高意图词（Ubicación/Cómo llegar/Metro/Fuente/Plus Code/Av. Casanova） | index.astro 变量 |
| S-03 | rule | 四 URL 完全一致 = `https://plazavenezuela.org/` | BaseLayout + index.astro grep |
| S-04 | rule | `public/_redirects` 存在且包含 http→https 301 与 www→非 www 301 合计 3 条规则 | public/_redirects 文件 |
| S-05 | rule | TouristAttraction Schema identifier 含 Plus Code `F4W7+MMM` + additionalProperty 至少 3 条 | index.astro attractionSchema |
| S-06 | rule | WebSite/WebPage JSON-LD name/description 均为西语；inLanguage: es-VE 保留；原中文 name 删除 | index.astro 两个 Schema 节点 |
| S-07 | rule | Head 加入 CSP upgrade-insecure-requests + sitemap link + hreflang x-default + og:locale:alternate 5 国 | BaseLayout.astro head |
| S-08 | rule | robots.txt 声明 Sitemap: 完整 HTTPS URL | public/robots.txt |
| S-09 | rubric (≥4) | GSC 关键词意图覆盖率：5 聚类（核心名/ubicación/cómo llegar/caracas/plaza whats on）全部在 Schema alternateName + Hero 首段自然 ≥1 次匹配 | grep 聚类关键词词形变化 |
