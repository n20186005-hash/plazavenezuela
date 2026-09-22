# GSC SEO 优化任务清单

> 对应 spec：[spec.md](file:///h:/GitHub/plazavenezuela/.trae/specs/gsc-seo-optimize/spec.md)

---

## Task S1：site.ts / 新 SEO 变量 + 常量

**范围**：[site.ts](file:///h:/GitHub/plazavenezuela/src/data/site.ts)
**对应 AC**：S-01/02 变量沉淀
**前置**：无

### 实现
在 site.ts 末尾 `as const;` 之前新增 4 个 SEO 常量，供 index.astro + BaseLayout 调用：
```ts
  seo: {
    title: 'Plaza Venezuela Caracas · Ubicación, Cómo Llegar y Guía',
    description: 'Descubre Plaza Venezuela en Caracas. Ubicación exacta Av. Casanova (Plus Code F4W7+MMM), cómo llegar en Metro, historia de la fuente iluminada, arte cinético y consejos de visita. Entrada gratuita 06:00–21:00.',
    keywords: 'Plaza Venezuela, Caracas, Venezuela, Ubicación, Cómo llegar, Metro de Caracas, Fuente de Plaza Venezuela, Arte Cinético, Guía turística, Plus Code F4W7MMM, Distrito Capital',
    plusCode: 'F4W7+MMM',
    nearStation: 'Estación Plaza Venezuela (Líneas 1, 3, enlace Línea 4)'
  },
```
并在 nearStation 的 description 里不引入中文，保持纯西语；nearStation 的字符串匹配 FR-06 中的 `Estación Metro Plaza Venezuela`。

### Test Requirements
| TR | 类型 | 条件 |
|----|------|------|
| S1-01 | rule | seo.title 长度 ≤60 chars；grep 中文 0 命中 |
| S1-02 | rule | seo.description 长度 ≤155 chars；正则同时包含 4+ 高意图词命中 |
| S1-03 | rule | seo.plusCode === 'F4W7+MMM'；seo.nearStation 包含 'Líneas 1, 3' |

Status: pending
Completion Evidence: —

---

## Task S2：BaseLayout.astro 升级 — Props 扩展 + SEO head 注入

**范围**：[BaseLayout.astro](file:///h:/GitHub/plazavenezuela/src/layouts/BaseLayout.astro)
**对应 AC**：S-03/07 头部标签全覆盖 / canonical 显式支持

### 实现
1. **Props 接口扩展**：新增 `canonical?: string / keywords?: string / ogLocaleAlternates?: string[] / hreflangs?: { hreflang: string; href: string }[] / sitemapUrl?: string`
2. **显式 canonical 优先**：`const effectiveCanonical = Astro.props.canonical || (Astro.site ? new URL(Astro.url.pathname, Astro.site).href : undefined);`
3. **`<meta name="keywords">`**：若传 keywords 则注入；
4. **OG locale alternates**：默认 `['es_ES','es_MX','es_CO','es_AR','en_US']`；用 `meta[property=og:locale:alternate]` 注入（每个 alternate 一标签）；
5. **Hreflang**：默认 `[{hreflang:'es-VE', href: canonical}, {hreflang:'x-default', href: canonical}]`；注入 `<link rel=alternate hreflang>`；
6. **CSP upgrade-insecure-requests**：静态写入 `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`；
7. **`<link rel=sitemap>`**：默认 `https://plazavenezuela.org/sitemap-index.xml`；
8. **`<meta name="twitter:title" />` 和 `<meta name="twitter:description" />`**：独立注入，内容与 og:title / og:description 相同；
9. **保留 og:image / og:image:alt / robots noindex / Service Worker / GA4 consent 原实现不动**。

### Test Requirements
| TR | 类型 | 条件 |
|----|------|------|
| S2-01 | rule | Astro.props.canonical 存在时，effectiveCanonical 等于传入值；og:url、canonical 标签一致 |
| S2-02 | rule | head 中 og:locale:alternate 数量 = 默认数组长度 5 |
| S2-03 | rule | head 中 hreflang=es-VE 与 x-default 共 2 条且 href 均等于 canonical |
| S2-04 | rule | `<meta CSP upgrade-insecure-requests>` 存在 |
| S2-05 | rule | `<link rel=sitemap>` 存在且 href 含 sitemap-index.xml |
| S2-06 | rule | `<meta twitter:title>` 与 `<meta twitter:description>` 均注入 |

Status: pending
Completion Evidence: —

---

## Task S3：index.astro 改造 — 西语 TDK / Schema 语言一致 / Plus Code / Hero 高意图词

**范围**：[index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro)（仅 head 变量、JSON-LD 三个节点、hero 新增一段；不修改任何西语正文长段落）
**对应 AC**：S-01/02/03/05/06/09

### 实现
1. **变量替换（S-01/02）**：
   - `pageTitle = siteInfo.seo.title`
   - `pageDescription = siteInfo.seo.description`
   - `ogTitle = pageTitle`（和 og:title 完全一致）
   - `ogDescription = pageDescription`（和 og 描述完全一致）
   - 传 BaseLayout 时显式传 `canonical='https://plazavenezuela.org/'` 与 `keywords=siteInfo.seo.keywords`
2. **WebSite/WebPage name/description 全西语（S-03/06）**：
   - `websiteSchema.name = 'Plaza Venezuela · Guía Turística Caracas'`；`alternateName` 数组追加：
     ```ts
     'Guía de Plaza Venezuela, Caracas',
     'Plaza vzla',
     'Plaza whats on Caracas',
     'Plaza Venezuela Caracas Travel Guide'
     ```
     （覆盖聚类：核心名 / 俚语简称 / plaza whats on / 英文补充）
   - `webpageSchema.name = pageTitle`；`webpageSchema.description = pageDescription`；
3. **TouristAttraction Identifier + additionalProperty（S-05）**：
   - 追加 `identifier: { '@type':'PropertyValue', name:'Plus Code', value: siteInfo.seo.plusCode }`；
   - 追加 `additionalProperty: [{name:'Entrada',value:'Gratuita'},{name:'Horario habitual', value:siteInfo.hours},{name:'Metro más cercano', value: siteInfo.seo.nearStation}]`；
4. **Hero 新增一段高意图词密集自然植入（S-09）**：
   在 hero H1/H2 下方、正文段落合适位置插入：
   ```astro
   <p class="mt-6 leading-8 text-black/62 text-lg">
     <strong>Ubicación:</strong> Av. Casanova, Caracas 1052 · Plus Code <strong>F4W7+MMM</strong> ·
     <strong>Cómo llegar:</strong> {siteInfo.seo.nearStation} ·
     <strong>Entrada gratuita</strong> · Horario habitual <strong>06:00–21:00</strong> ·
     Fuente iluminada y obras de <strong>arte cinético</strong> al aire libre.
   </p>
   ```
   覆盖聚类 ①②③④ 四类关键词（plaza venezuela/ubicación/cómo llegar/caracas/art）；
5. **保持原 alternateName 数组原有西语项，不删不替换**。

### Test Requirements
| TR | 类型 | 条件 |
|----|------|------|
| S3-01 | rule | `<title>` / `og:title` / WebPage.name / webpageSchema.name 四者 === siteInfo.seo.title |
| S3-02 | rule | meta description / og:description / WebPage.description === siteInfo.seo.description |
| S3-03 | rule | 四 URL（canonical/og:url/WebSite.url/WebPage.url）grep 全部 === `https://plazavenezuela.org/` |
| S3-04 | rule | TouristAttraction identifier 有 Plus Code F4W7+MMM + 至少 3 条 additionalProperty |
| S3-05 | rule | Hero 新增段里同时命中：Ubicación / Cómo llegar / Plus Code F4W7+MMM / Metro / 06:00–21:00 / Arte cinético（≥6 命中） |
| S3-06 | rule | GSC 关键词聚类覆盖（S-09 rubric 证据的基础）：alternateName 包含 Plaza vzla + Plaza whats on |

Status: pending
Completion Evidence: —

---

## Task S4：_redirects + robots.txt （Cloudflare）

**范围**：`public/_redirects`（新建）+ `public/robots.txt`（若内容不全则重写）
**对应 AC**：S-04 / S-08

### 实现
1. **public/_redirects**（新建，Cloudflare Workers 301 全站）：
```
# 全站 HTTP → HTTPS，www → 非 www（GSC 数据显示 http 版本仍有 11 次曝光分流）
http://plazavenezuela.org/*    https://plazavenezuela.org/:splat    301
http://www.plazavenezuela.org/* https://plazavenezuela.org/:splat 301
https://www.plazavenezuela.org/* https://plazavenezuela.org/:splat 301
```
2. **public/robots.txt**：重写为完整内容，确保明确写入 Sitemap:
```
User-agent: *
Allow: /
Sitemap: https://plazavenezuela.org/sitemap-index.xml
```
3. 保留 robots.txt 不 disallow 任何路径；不写 Crawl-delay（Google 忽略）。

### Test Requirements
| TR | 类型 | 条件 |
|----|------|------|
| S4-01 | rule | `_redirects` 3 条规则完整；每条目标都是 `https://plazavenezuela.org/:splat` + `301` status |
| S4-02 | rule | robots.txt 包含 `User-agent: *` / `Allow: /` / `Sitemap: https://plazavenezuela.org/sitemap-index.xml` 三行 |

Status: pending
Completion Evidence: —

---

## Task S5：验证（GetDiagnostics + grep 关键 SEO 字段）

**范围**：整个仓库工具验证
**对应 AC**：S-01~S-09 综合验证 + rubric 打分

### 执行
1. **GetDiagnostics 0 错误**；
2. **grep 中文在 Title/Description/WebSite.name/WebPage.name（S-01 NFR-04）**：0 命中；
3. **四 URL 全一致**（`https://plazavenezuela.org/`）grep 合计 ≥4 次；
4. **Plus Code 出现 ≥3 次**：Description + Identifier + Hero 段；
5. **聚类覆盖 S-09 rubric 打分**：
   - 聚类① 核心名 plaza venezuela：Title/Description/Hero 都有 → 算覆盖；
   - 聚类② ubicación：Description/Hero / TouristAttraction address → 覆盖；
   - 聚类③ cómo llegar：Title/Hero + alternateName + FAQ 3 条 cómo llegar 问答 → 覆盖；
   - 聚类④ caracas：Title/alternateName/Hero → 覆盖；
   - 聚类⑤ plaza vzla / plaza whats on：alternateName 新增 → 覆盖；
   - 目标 5/5 全部覆盖 → **S-09 rubric 给 5/5**；
6. **`_redirects` 内容存在且 3 条全对**（S4-01）；
7. **robots.txt + `<link rel=sitemap>`**（S4-02 + S2-05 双重验证）；
8. 以上任何一条失败 → 返回对应 Task 修改，重来。

### Test Requirements
| TR | 类型 | 条件 |
|----|------|------|
| S5-01 | rule | GetDiagnostics = 0 错误 |
| S5-02 | rule | Title/Desc/WebSite.name/WebPage.name 0 中文命中 |
| S5-03 | rule | canonical/og:url/WebSite.url/WebPage.url 4 处完全相同 |
| S5-04 | rule | Plus Code F4W7+MMM 全文 ≥3 次出现（Description+Identifier+Hero） |
| S5-05 | rubric(≥4) | S-09 聚类覆盖 ≥4/5，目标 5/5，写打分理由 |
| S5-06 | rule | robots.txt Sitemap 字段 + `<link rel=sitemap>` 双重验证通过 |
| S5-07 | rule | `_redirects` 301 规则 3 条完整 |

Status: pending
Completion Evidence: —

---

## AC → Tasks 映射矩阵

| AC | 任务 |
|----|------|
| S-01 西语 Title | S1（变量）+ S3（传参）+ S5（验证） |
| S-02 西语 Description | S1 + S3 + S5 |
| S-03 四 URL 一致 | S2（BaseLayout canonical 支持）+ S3（显式传值）+ S5 |
| S-04 _redirects 301 | S4 + S5 |
| S-05 Plus Code + additionalProperty | S3 + S5 |
| S-06 WebSite/WebPage 西语 name/desc | S3 + S5 |
| S-07 CSP/sitemap/hreflang/og alternate | S2 + S5 |
| S-08 robots.txt Sitemap | S4 + S5 |
| S-09 rubric 聚类覆盖 ≥4 | S3（Hero + alternateName）+ S5 打分 |
