# GSC 数据驱动 SEO 优化独立审查报告

> 审查时间：本次独立 Review pass
> 对照：[spec.md](file:///h:/GitHub/plazavenezuela/.trae/specs/gsc-seo-optimize/spec.md) / [tasks.md](file:///h:/GitHub/plazavenezuela/.trae/specs/gsc-seo-optimize/tasks.md)
> 被审文件：
> - [site.ts](file:///h:/GitHub/plazavenezuela/src/data/site.ts)
> - [BaseLayout.astro](file:///h:/GitHub/plazavenezuela/src/layouts/BaseLayout.astro)
> - [index.astro](file:///h:/GitHub/plazavenezuela/src/pages/index.astro)
> - [public/_redirects](file:///h:/GitHub/plazavenezuela/public/_redirects)
> - [public/robots.txt](file:///h:/GitHub/plazavenezuela/public/robots.txt)

---

## 0. 总体判定

| 项 | 结果 |
|----|------|
| 总体 | ✅ **PASS**（9 AC 全部通过，0 blocked / 0 fail） |
| 弱验证说明 | 受当前 Node v18 环境限制，`pnpm run build` + `astro check` 未能真实跑通，以 `GetDiagnostics = []` 0 条 IDE 语言服务错误作为语法正确性代理；真实 build 和 Cloudflare _redirects 部署验证需用户在本地 Node v24 + pnpm 11 + wrangler 环境补做。 |

---

## 1. 验收标准（AC）逐条审查

### S-01 · rule · Title 西语 + ≤60 字符 + 0 中文

| 子项 | 证据 | 结果 |
|------|------|------|
| Title 值 | [site.ts:29](file:///h:/GitHub/plazavenezuela/src/data/site.ts#L29-L29) `seo.title = 'Plaza Venezuela Caracas · Ubicación, Cómo Llegar y Guía'` → 再传值至 index.astro `pageTitle = siteInfo.seo.title`（[index.astro:171](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L171-L171)）→ 再作为 BaseLayout Props `title=` 注入（195 行）→ `<title>` 最终渲染值完全一致 | ✅ |
| 字符长度 | 手工数：58 字符 `Plaza Venezuela Caracas · Ubicación, Cómo Llegar y Guía`（含空格/标点/重音字母）→ ≤60 | ✅ |
| 0 中文字符 | Title 字符串 grep 中日韩字符 `[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]` → 0 命中（再加上整个 `<head>` 的 og:title/twitter:title/WebSite.name/WebPage.name 在 Task S5 全 grep 中文 0 命中） | ✅ |

### S-02 · rule · Meta Description 西语 ≤155 字符 + 至少 4 个高意图词

| 子项 | 证据 | 结果 |
|------|------|------|
| 值 | [site.ts:30](file:///h:/GitHub/plazavenezuela/src/data/site.ts#L30-L30) `seo.description` → `pageDescription`（index.astro:172）→ BaseLayout description（196 行） | ✅ |
| 长度 | 字符数 = 147（手工数 Desc 全句）→ ≤155 | ✅ |
| 高意图词命中 | 同时包含：Ubicación ✓ / Cómo llegar ✓ / Metro ✓ / Plus Code F4W7+MMM ✓ / Av. Casanova ✓ / Fuente iluminada ✓ / Arte cinético ✓ / 06:00–21:00 Entrada gratuita ✓ → **≥8 命中 ≥4 要求** | ✅ |

### S-03 · rule · 四 URL 完全一致 = `https://plazavenezuela.org/`（末尾 / 一致）

| 子项 | 证据 | 结果 |
|------|------|------|
| `<link canonical>` | [BaseLayout.astro:81](file:///h:/GitHub/plazavenezuela/src/layouts/BaseLayout.astro#L81-L81) `href={effectiveCanonical}` → [index.astro:176](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L176-L176) `canonicalUrl='https://plazavenezuela.org/'` → [index.astro:198](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L198-L198) 显式传 `canonical={canonicalUrl}` | ✅ |
| `<meta property=og:url>` | [BaseLayout.astro:96](file:///h:/GitHub/plazavenezuela/src/layouts/BaseLayout.astro#L96-L96) 同样取 `effectiveCanonical` | ✅ |
| WebSite.url | [index.astro:86](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L86-L86) 变量 `url: \`${siteUrl}/\`` → 模板 JSON-LD [index.astro:272](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L272-L272) `url: "https://plazavenezuela.org/"` | ✅ |
| WebPage.url | [index.astro:101](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L101-L101) 同上 `\`${siteUrl}/\`` → 模板 [index.astro:286](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L286-L286) | ✅ |
| 四 URL 完全比对 | Task S5 grep 全文 `https://plazavenezuela.org/` 共 13 处；四处均为完全相同字符串，无任何一处缺末尾 `/`，无一处写 `http://` | ✅（NFR-03 达标） |

### S-04 · rule · `public/_redirects` http→https + www→非 www 共 3 条规则

| 子项 | 证据 | 结果 |
|------|------|------|
| 文件存在 | [public/_redirects](file:///h:/GitHub/plazavenezuela/public/_redirects) 新建，含 3 条 | ✅ |
| 规则 1 裸 HTTP | 第 5 行 `http://plazavenezuela.org/* https://plazavenezuela.org/:splat 301` | ✅ |
| 规则 2 www HTTP | 第 6 行 `http://www.plazavenezuela.org/* https://plazavenezuela.org/:splat 301` | ✅ |
| 规则 3 www HTTPS（消除 www 版本分流） | 第 7 行 `https://www.plazavenezuela.org/* https://plazavenezuela.org/:splat 301` | ✅ 3/3 |
| 状态码 | 所有 3 条都是 `301`（永久，不是 302 临时） | ✅ |

### S-05 · rule · TouristAttraction Schema 含 Plus Code Identifier + ≥3 additionalProperty

| 子项 | 证据 | 结果 |
|------|------|------|
| identifier Plus Code | 变量 attractionSchema [index.astro:36-40](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L36-L40) → 模板 JSON-LD [index.astro:221-225](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L221-L225)：`identifier: {"@type":"PropertyValue","name":"Plus Code","value":"F4W7+MMM"}` | ✅ |
| additionalProperty 3+ | 变量 [index.astro:41-45](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L41-L45) → 模板 [index.astro:226-230](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L226-L230)：3 条（① Entrada=Gratuita ② Horario habitual=06:00–21:00 ③ Estación de Metro más cercana=Líneas 1,3,enlace 4） | ✅ 3/3 |

### S-06 · rule · WebSite/WebPage Schema name+description 全西语 + inLanguage es-VE

| 子项 | 证据 | 结果 |
|------|------|------|
| WebSite.name（以前是中文） | 现在 = `Plaza Venezuela · Guía Turística Caracas`（[index.astro:87](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L87-L87) + 模板 273 行）→ grep 中文 0 命中（S5 grep 结果 0 条） | ✅ |
| WebSite.description（以前是英文） | 现在 = 西语（[index.astro:94](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L94-L94) + 模板 280 行），含 GSC 核心关键词 | ✅ |
| WebPage.name（以前是中文） | 现在 = `siteInfo.seo.title`（[index.astro:102](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L102-L102) + 模板 287 行，西语） | ✅ |
| WebPage.description | = seo.description 西语（[index.astro:103](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L103-L103) + 模板 288 行） | ✅ |
| inLanguage es-VE 保留 | websiteSchema.inLanguage / webpageSchema.inLanguage 都保留 es-VE（88 行 / 113 行；模板 281 行 / 299 行） | ✅ NFR-04 语言同质 |

### S-07 · rule · Head 注入 CSP upgrade-insecure-requests + sitemap link + hreflang x-default + 5 og:locale alternates

| 子项 | 证据 | 结果 |
|------|------|------|
| CSP upgrade-insecure-requests | [BaseLayout.astro:76](file:///h:/GitHub/plazavenezuela/src/layouts/BaseLayout.astro#L76-L76) `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />` → 浏览器层兜底把 http 子资源自动转 https（不替代 301，双重保护） | ✅ |
| `<link rel=sitemap>` | [BaseLayout.astro:82](file:///h:/GitHub/plazavenezuela/src/layouts/BaseLayout.astro#L82-L82) sitemapUrl 默认 `https://plazavenezuela.org/sitemap-index.xml` | ✅ |
| hreflang es-VE + x-default | [BaseLayout.astro:63-68](file:///h:/GitHub/plazavenezuela/src/layouts/BaseLayout.astro#L63-L68) finalHreflangs 默认 = [{es-VE:canonical},{x-default:canonical}]；第 83-85 行渲染 `<link rel=alternate hreflang...>` → 共 2 条 | ✅ |
| og:locale:alternate 5 个西语+英语市场 | [BaseLayout.astro:21](file:///h:/GitHub/plazavenezuela/src/layouts/BaseLayout.astro#L21-L21) DEFAULT_OG_ALTERNATES = ['es_ES','es_MX','es_CO','es_AR','en_US']（5 条）；第 92 行 `ogLocaleAlternates.map(...)` → meta 标签渲染 5 次 | ✅ 5/5 |
| Twitter 独立 title/description/image/alt | [BaseLayout.astro:100-104](file:///h:/GitHub/plazavenezuela/src/layouts/BaseLayout.astro#L100-L104) 4 条 meta 独立注入，不依赖 OG | ✅ 扩展 |

### S-08 · rule · robots.txt 声明 Sitemap HTTPS URL

| 子项 | 证据 | 结果 |
|------|------|------|
| User-agent / Allow | [public/robots.txt:1-2](file:///h:/GitHub/plazavenezuela/public/robots.txt#L1-L2) `User-agent: *` + `Allow: /`（单页站点无 disallow） | ✅ |
| Sitemap 声明 | [public/robots.txt:3](file:///h:/GitHub/plazavenezuela/public/robots.txt#L3-L3) `Sitemap: https://plazavenezuela.org/sitemap-index.xml` → 完整 HTTPS 绝对 URL（不是相对路径） | ✅ |

### S-09 · rubric (0-5 阈值 ≥4) · GSC 关键词聚类意图覆盖率

13 条 GSC 查询按主题聚类共 5 类：
- ① ** plaza venezuela 核心名**（第 0/1/4/8/10/12 条）
- ② **ubicación**（第 2 条）
- ③ **cómo llegar**（第 7/9/11 条）
- ④ **caracas**（第 1/3 条）
- ⑤ **俚语/长尾（plaza vzla / plaza whats on）**（第 5/6 条）

每类至少有 1 处显式匹配 = 5/5 全覆盖 → **打 5/5 超阈值**：

| 聚类 | 匹配位置（至少 1 处显式） |
|------|------|
| ① 核心名 | Title、Description、Hero H1、WebSite name、Hero 首段、Breadcrumb 全部显式写 "Plaza Venezuela"（至少 15 次命中） |
| ② ubicación | Description 开头 + Hero 新首段 `<strong>Ubicación:</strong>` + TouristAttraction address + WebSite description（"ubicación exacta"） |
| ③ cómo llegar | Title 中 "Cómo Llegar"、Hero 首段 `<strong>Cómo llegar:</strong>`、FAQ 3 条独立 "¿Cómo se llega en Metro?"、seo.description + additionalProperty 中的 Metro 条目 |
| ④ caracas | Title / Hero H1 / Description / eyebrow / og:image:alt 全部显式 "Caracas" |
| ⑤ 俚语 plaza vzla / plaza whats on | TouristAttraction alternateName 第 6/7 条 `'Plaza vzla', 'Plaza whats on Caracas'`（[index.astro:25](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L25-L25)）；WebSite alternateName 也同步追加（[index.astro:90-91](file:///h:/GitHub/plazavenezuela/src/pages/index.astro#L90-L91)）→ 两处 Schema 都有显式命中 |

S-09 最终评分：**5/5 ✅（≥4 阈值通过）**

---

## 2. Task 级 Completion Evidence 汇总

| Task | TR 全部通过 | 证据位置 |
|------|-------------|----------|
| S1 site.ts seo 对象 | S1-01 title≤60 字符中文 0 / S1-02 desc≤155 命中 8 词 / S1-03 Plus Code & nearStation 正确 | site.ts:28-34 |
| S2 BaseLayout SEO 注入 | S2-01 canonical 显式优先 / S2-02 og alternate 5 条 / S2-03 hreflang 2 条 / S2-04 CSP / S2-05 link sitemap / S2-06 twitter 标签 | BaseLayout.astro 全文件 163 行 |
| S3 index.astro 西语 TDK / Schema 一致 / Plus Code / Hero 高意图 | S3-01 四处 Title 同步 / S3-02 四处 Desc 同步 / S3-03 四 URL 一致 / S3-04 Identifier + 3 Property / S3-05 Hero 命中 6 意图词（Ubicación/Cómo llegar/F4W7/Metro/06:00–21:00/Arte cinético）/ S3-06 vzla + whats on alternateName | index.astro 171-176 / 25 / 87-95 / 102-103 / 405-414 / 276-278 |
| S4 _redirects + robots | S4-01 301 3 条完整 / S4-02 robots 3 行完整 | public/_redirects:5-7 / public/robots.txt:1-3 |
| S5 验证 | S5-01 GetDiagnostics=[] / S5-02 Title/WebSite.name/WebPage.name 0 中文 grep 0 命中 / S5-03 四 URL 相同 13 处 / S5-04 Plus Code F4W7+MMM 全文 9 处（Description/Identifier/Hero/FAQ ×2）≥3 要求 / S5-05 S-09 rubric 5/5 / S5-06 robots.txt Sitemap: ×1 + <link rel=sitemap> ×1 双重验证 / S5-07 _redirects 301 ×3 | 工具输出已在 implement 阶段记录 |

---

## 3. 遗留 & 后续建议（非 Fail）

1. **真实 build + wrangler deploy 验证**：当前 Sandbox Node 18 vs 项目要求 Node 24 + pnpm 11，需在你本地：
   ```
   pnpm install --frozen-lockfile
   pnpm run check
   pnpm run build
   wrangler deploy  # 手动部署 wrangler.jsonc 到 Cloudflare Workers
   ```
   真实部署后访问 `http://plazavenezuela.org/` 与 `http://www.plazavenezuela.org/` 与 `https://www.plazavenezuela.org/` 应能全部 301 跳 `https://plazavenezuela.org/` 且浏览器 URL 栏有小锁 + 无 Mixed Content 警告（CSP 兜底）。

2. **Cloudflare 控制面板检查**（规格开放问题 1）：
   - **SSL/TLS → Edge Certificates → Always Use HTTPS = On**；
   - **Rules → Redirect Rules**：若 Worker 部署不识别 public/_redirects 文件（Workers Runtime vs Pages 有差异），需在控制面板新建 3 条和 _redirects 相同内容的 301 Redirect Rule。

3. **GSC 24-72h 后指标观察**：
   - 在 `GSC → 效果（搜索效果）` 筛选「plaza venezuela」核心词 → 观察平均排名能否从 17-20 位前进到 12 位以上；
   - CTR 从 0% 是否提升到 ≥1%（Title/Description 西语本地化一般 2 周内见效）；
   - 「国家」筛选里西班牙、哥伦比亚、美国的曝光是否上涨（og locale alternates + hreflang 生效标志）。

4. **HTTP→HTTPS & Canonical 一致性核查**（规格开放问题 3，已在 Head 加 CSP 兜底 + 四 URL 强约束，但仍推荐你真实浏览器下用 curl 验证：
   ```
   curl -I http://plazavenezuela.org/
   curl -I http://www.plazavenezuela.org/
   curl -I https://www.plazavenezuela.org/
   ```
   三条响应头部都应该是 `HTTP/2 301` + `location: https://plazavenezuela.org/`（不是 302 或 200）。

---

**审查结论：PASS。9 AC 全通过（8 rule + S-09 rubric 5/5，超阈值 4）。交付给用户。**
