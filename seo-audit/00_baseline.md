# Phase 0: Baseline Audit Report
**Site:** Jegatheesh Web Studio  
**Date:** November 16, 2026  
**Auditor:** Senior Technical SEO + AEO + GEO Engineer  
**Branch:** `seo-aeo-geo`  
**Git Baseline Commit:** `db90874`  
**Local Test Origin:** `http://localhost:8080/`  
**Live Vercel Origin:** `https://jegatheesh-web-std.vercel.app/`  
**Target Production Origin:** `https://jegatheeshwebstudio.online`  

---

## 1. Domain Resolution & Live Environment Status

| Host | Protocol | Status Code | Resolution / Server Header | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `jegatheesh-web-std.vercel.app` | HTTPS | **200 OK** | Vercel (`Server: Vercel`, `x-vercel-id: bom1::...`) | Live source matches local repository 100% byte-for-byte. |
| `jegatheeshwebstudio.online` | HTTPS | **403 Forbidden** | Hostinger Edge (`platform: hostinger`, `server: hcdn`, IPs: `93.127.173.20`, `147.79.69.167`) | **CRITICAL:** Domain is registered / parked on Hostinger and has NOT been pointed to Vercel DNS yet. |
| `www.jegatheeshwebstudio.online` | HTTPS | **403 Forbidden** | Hostinger Edge | Same as apex domain. Needs CNAME to `cname.vercel-dns.com`. |

> [!WARNING]
> **DO NOT DEPLOY TO PRODUCTION UNTIL THE CUSTOM DOMAIN IS CONNECTED IN VERCEL.**  
> `https://jegatheeshwebstudio.online` currently serves a Hostinger 403 Forbidden page. If canonical and redirects are activated before DNS is pointed to Vercel, visitors and crawlers would be redirected to a broken 403 page. Follow the exact Vercel + DNS setup steps detailed in the final checklist.
> In accordance with the project rules, HSTS (`Strict-Transport-Security`) will only be deployed after HTTPS on `jegatheeshwebstudio.online` is active and verified.

---

## 2. Lighthouse Baseline Scores (Measured via Lighthouse v13.6.0)

Audited locally using Chromium Headless v13.6.0 against the exact unthrottled/simulated standard profiles.

| Category | Mobile Baseline | Desktop Baseline | Target Post-Optimization |
| :--- | :---: | :---: | :---: |
| **Performance** | **32** | **54** | **90+** |
| **Accessibility** | **95** | **95** | **100** |
| **Best Practices** | **100** | **100** | **100** |
| **SEO** | **100** | **100** | **100** |

### Core Web Vitals & Runtime Diagnostics

| Metric | Mobile Value | Desktop Value | Status / Opportunity |
| :--- | :---: | :---: | :--- |
| **First Contentful Paint (FCP)** | 2.0 s | 0.4 s | Good on desktop; mobile impacted by render-blocking resources. |
| **Largest Contentful Paint (LCP)** | **17.0 s** | **2.9 s** | **Severe mobile bottleneck:** Preloader delay + uncompressed 1.14 MB `id-card-clean.png` hero badge. |
| **Cumulative Layout Shift (CLS)** | **0.102** | **0.001** | Mobile CLS exceeds recommended threshold (≤ 0.1) due to unsized images. |
| **Total Blocking Time (TBT)** | **3,380 ms** | **460 ms** | Heavy JavaScript execution on mobile CPU (Unicorn Studio, Lenis, Webflow runtime). |
| **Speed Index (SI)** | 11.1 s | 5.2 s | Impacted by preloader animation countdown. |
| **Total Transfer Weight** | 2,852 KiB | 2,852 KiB | Unoptimized PNG images and unminified assets. |

---

## 3. Crawlability, Meta & Discoverability Inventory

| Asset / Feature | Current State | Defect / Problem | Action Required |
| :--- | :--- | :--- | :--- |
| **`<title>`** | Present (`Jegatheesh Web Studio - Premium Portfolio Websites for Photographers`) | 67 characters; slightly over optimal 60 char limit. | Refine to ≤ 60 chars with target entity. |
| **`<meta name="description">`** | Present (154 characters) | Good length, but lacks target geography and domain consistency. | Align with unified brand messaging. |
| **Canonical Tag** | **MISSING** | No `<link rel="canonical">` exists in document `<head>`. | Add self-referencing canonical to `https://jegatheeshwebstudio.online/`. |
| **Open Graph (og:)** | Partial | `og:image` points to `https://cdn.prod.website-files.com/...`. | Self-host 1200×630 WebP/PNG on `https://jegatheeshwebstudio.online/assets/`. |
| **Twitter Card** | Partial | `twitter:image` points to third-party Webflow CDN. | Self-host image and point to apex domain. |
| **Generator Tag** | `<meta content="Webflow" name="generator">` | Stale Webflow marker on custom code. | Remove completely. |
| **Favicon Suite** | Partial | Links `favicon.png`, `favicon-dark.png`, `webclip-180.png`. Missing web manifest. | Add webmanifest, SVG icon, theme-color. |
| **Structured Data** | Outdated / Incomplete | Schema is `@type: "ProfilePage"`, domain points to `jegatheeshwebstudio.in`, and FAQs reflect outdated copy. | Replace with comprehensive `@graph` Schema (Organization, ProfessionalService, Person, WebSite, WebPage, FAQPage, Service, ItemList). |
| **`robots.txt`** | **MISSING** (404) | No crawler instructions or AI bot directives exist. | Create standards-compliant `robots.txt` with verified AI bots. |
| **`sitemap.xml`** | **MISSING** (404) | Search engines must rely on crawler discovery. | Create valid `sitemap.xml` with lastmod and canonical URL. |
| **`llms.txt`** | **MISSING** (404) | AI Answer Engines have no structured markdown overview. | Create concise factual `/llms.txt` and `/llms-full.txt`. |
| **`vercel.json`** | **MISSING** | No automated apex 301 redirects, security headers, or caching policies. | Create comprehensive `vercel.json`. |

---

## 4. Current Heading Hierarchy (H1 – H6 Outline)

```text
[H2] (DOM index 567) "Privacy Policy"  <-- DEFECT: H2 appears in hidden modal before main H1
  [H3] "Data Controller"
  [H3] "Data Collected"
  [H3] "Purpose of Processing"
  [H3] "Third-Party Services"
  [H3] "Cookie"
  [H3] "Data Retention"
  [H3] "Data Subject Rights"
[H1] (DOM index 628) "I build premium, visually stunning portfolio websites that showcase your creativity, captivate your audience, and turn visitors into clients."
  [H2] "Are You a Photographer?"
  [H2] "Your Brand Is More Than Your Photographs."
  [H2] "Imagine Your Own Portfolio Website."
  [H2] "Zyago Studio"
  [H2] "Le PhotoGRAM"
  [H2] "KVM Creations Studio"
  [H2] "Surya Photography"
  [H2] "How We Build Your Website"
    [H3] "Discover Your Vision"
    [H3] "Gather Your Story"
    [H3] "Design & Build"
    [H3] "Review & Refine"
    [H3] "Launch With Confidence"
  [H2] "The most common questions, answered."
```

### Heading Architecture Observations:
1. **Modal Inversion:** The modal privacy policy markup is rendered in the DOM *before* the main content, placing an `<h2>` and seven `<h3>`s ahead of the document's primary `<h1>`.
2. **H1 Copy Length & Specificity:** The `<h1>` has 20 words (137 characters). While expressive, it lacks the studio entity name ("Jegatheesh Web Studio") and the photographer niche keyword in the primary subject position.
3. **FAQ Headings:** The 6 FAQ question items (`.faq-q-text`) are rendered inside `<div>` elements rather than semantic headings or microdata-rich items.

---

## 5. Visual Regression Reference Screenshots

Full-page baseline screenshots have been captured at three critical responsive breakpoints and stored in `/seo-audit/baseline-shots/`:
- **Mobile (375px):** `[baseline-375.png](file:///f:/website-development-agency/jegatheesh%20professional%20website%20finallll/seo-audit/baseline-shots/baseline-375.png)`
- **Tablet (768px):** `[baseline-768.png](file:///f:/website-development-agency/jegatheesh%20professional%20website%20finallll/seo-audit/baseline-shots/baseline-768.png)`
- **Desktop (1440px):** `[baseline-1440.png](file:///f:/website-development-agency/jegatheesh%20professional%20website%20finallll/seo-audit/baseline-shots/baseline-1440.png)`

All post-optimization verification phases will be strictly diffed against these images. Any visual or animation deviation will trigger an immediate rollback.

---

## 6. Comprehensive "Known Problems" Inventory

1. **Hostinger DNS Mismatch:** Target apex domain `jegatheeshwebstudio.online` currently resolves to Hostinger IPs rather than Vercel's global edge (`76.76.21.21`), returning 403 Forbidden.
2. **Stale Generator Signature:** `<meta content="Webflow" name="generator">` remains in the `<head>`, flagging the build as a static export.
3. **Third-Party CDN Dependency:** `og:image` and `twitter:image` point to `cdn.prod.website-files.com`, introducing an external point of failure and brand inconsistency.
4. **Outdated Structured Data:** Embedded schema is typed as `ProfilePage`, references `https://jegatheeshwebstudio.in`, and lists outdated FAQ questions from an earlier template revision.
5. **Accessibility ARIA Defect:** Generic `<span>` tags in `.sticky-title-container` carry `aria-label` attributes without semantic roles, causing an explicit W3C violation and lowering Accessibility to 95.
6. **Heavy Uncompressed Hero Image:** `id-card-clean.png` is 1,140,302 bytes (1.14 MB). Converting to optimized WebP at identical visual fidelity will save ~1 MB on initial page load.
7. **Missing Image Dimensions (CLS Culprits):** Portfolio showcase images (`zyago-studio.webp`, `le-photogram.webp`, `kvm-creations.webp`, `surya-photography.webp`, and `id-card-clean.png`) lack explicit width/height attributes in HTML.
8. **Jurisdiction Mismatch in Privacy Modal:** Privacy text refers to "Italian Privacy Code (Art. 122)" and Cal.eu European infrastructure, while the sole proprietorship is based in India (flagged for review in PROPOSED_CONTENT_CHANGES.md).
9. **Missing Indexing & AI Directives:** No `robots.txt`, `sitemap.xml`, or `llms.txt` exist in the project root.
