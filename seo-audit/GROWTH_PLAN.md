# Strategic Growth & Authority Plan: Jegatheesh Web Studio

> **Domain:** `https://jegatheeshwebstudio.online`  
> **Horizon:** 4 to 8 Weeks Post-Launch Playbook  
> **Target:** Establish crawl authority, rapid indexing, consistent entity knowledge graph, and citations across Google, Bing, Perplexity, ChatGPT, and Gemini.

---

## Executive Summary

As demonstrated in our Phase 1 competitive research, search engines and AI answer engines do not penalize `.online` domains based on the TLD string itself. Instead, new domains fail when they lack external entity verification, consistent NAP (Name, Address, Phone) citations, and contextual industry backlinks.

Because **Jegatheesh Web Studio** already possesses four live, high-caliber client websites (`zyagostudio.in`, `lephotogram.in`, `kvmcreationsstudio.ca`, `suryaphotography.ca`), the studio has an immediate, organic pathway to domain authority that most new agencies lack.

---

## 1. Day 1 Launch Checklist (Indexing & Technical Foundation)

Execute these steps immediately after the apex domain DNS is pointed to Vercel and SSL is issued:

### 1.1 Google Search Console (GSC) Setup
1. **Domain Property Verification (DNS):**
   - In Google Search Console, select **Domain property** (not URL prefix).
   - Add the TXT record to your domain registrar DNS settings: `google-site-verification=...`.
   - Domain property covers `https://jegatheeshwebstudio.online`, `http://`, and all subdomains automatically.
2. **Submit Sitemap:**
   - Submit `https://jegatheeshwebstudio.online/sitemap.xml`.
   - Confirm status shows `Success` and 1 URL discovered.
3. **URL Inspection & Live Test:**
   - Enter `https://jegatheeshwebstudio.online/`.
   - Click **Test Live URL**.
   - Confirm: "URL is available to Google", Page fetch: "Successful", Mobile-Friendly: "Yes", Detected Structured Data: "WebSite", "WebPage", "Organization", "Person", "OfferCatalog", "ItemList", "FAQPage".
   - Click **Request Indexing**.

### 1.2 Bing Webmaster Tools & IndexNow
1. **Import from GSC:**
   - Sign in to Bing Webmaster Tools using your Google account and click **Import from Google Search Console**. All verification transfers instantaneously.
2. **Submit Sitemap to Bing:**
   - Confirm `https://jegatheeshwebstudio.online/sitemap.xml` is registered.
3. **Trigger IndexNow Protocol:**
   - We have already placed the verification key file at `/c0199e19c0b540eb93e0b2400e93e230.txt`.
   - Ping the IndexNow API via HTTP POST or simple GET request:
     ```bash
     curl -i "https://api.indexnow.org/indexnow?url=https://jegatheeshwebstudio.online/&key=c0199e19c0b540eb93e0b2400e93e230"
     ```
   - This notifies Bing, Seznam, Yandex, and AI partners to crawl the page within minutes.

---

## 2. Client Portfolio Backlink Strategy (High-Authority Entity Graph)

The most authoritative backlinks for a design studio come from the live client websites it built.

### 2.1 Recommended Credit Format
Add a subtle, elegant footer credit on each client website:

```html
<!-- Client Footer HTML Recommendation -->
<div class="site-credit">
  <span class="site-credit__text">Website designed & developed by</span>
  <a href="https://jegatheeshwebstudio.online/" 
     target="_blank" 
     rel="noopener" 
     class="site-credit__link" 
     title="Jegatheesh Web Studio — Websites for Photographers">
    Jegatheesh Web Studio
  </a>
</div>
```

### 2.2 Rel Attribute Rules: What Actually Ranks
* **Use `rel="noopener"` (Do NOT use `rel="nofollow"` or `rel="sponsored"`):**
  - These are legitimate editorial production credits agreed upon with clients.
  - They represent natural, authentic design attribution.
  - In Google's Search Essentials, design/agency footer credits are widely recognized as standard attribution when limited to one branded link per site.
* **Anchor Text:** Use the exact brand name **"Jegatheesh Web Studio"**. Do NOT use exact-match keyword anchors like *"best photographer website designer"*, as keyword-stuffed sitewide links trigger Google's spam filters.

### 2.3 Linking Strategy: Homepage vs. Case Study
* **Phase 1 (Weeks 1–4):** Point all client footer links directly to `https://jegatheeshwebstudio.online/`. This concentrates PageRank and brand equity on the apex domain.
* **Phase 2 (Future Multi-Page Expansion):** If dedicated case study pages are published (e.g., `/work/zyago-studio`), point each client's link to their specific case study.

---

## 3. Entity & Citation Building Playbook (Weeks 1–4)

To build a recognized entity in Google's Knowledge Graph and Perplexity/ChatGPT index, maintain strict **NAP (Name, Address, Phone) & URL consistency**:

* **Brand Name:** Jegatheesh Web Studio
* **Founder:** Jegatheesh
* **Primary URL:** `https://jegatheeshwebstudio.online`
* **Official Email:** `jegatheeshwebstudio@gmail.com`
* **WhatsApp / Phone:** `+91 7010254014`
* **Entity Category:** Web Design Studio / Photography Portfolio Designer

### Priority 1: High-Authority Digital Profiles (Day 2–7)
Claim and align these profiles with identical descriptions, logos, and links:
1. **GitHub Organization / Repository:**
   - `https://github.com/jegatheesh-che/jegatheesh-web-std`
   - Add website URL `https://jegatheeshwebstudio.online` in the repo "About" sidebar and organization profile.
2. **LinkedIn Company Page & Personal Profile:**
   - Company: Create "Jegatheesh Web Studio" with industry `Design Services` and link to `https://jegatheeshwebstudio.online`.
   - Personal: List role as Founder at Jegatheesh Web Studio.
3. **Instagram:**
   - Link in bio: `https://jegatheeshwebstudio.online`.
   - Bio: `Bespoke portfolio websites crafted exclusively for photographers worldwide | Founded by Jegatheesh`.
4. **Behance & Dribbble:**
   - Create detailed visual case study presentations for Zyago Studio, Le PhotoGRAM, KVM Creations, and Surya Photography.
   - Include direct attribution links back to `https://jegatheeshwebstudio.online`.

### Priority 2: Curated Design & Studio Galleries (Weeks 2–3)
Submit the website to high-domain-authority design directories that showcase minimal, motion-rich portfolios:
* **One Page Love** (DA 60+): Prime candidate due to the sleek single-page layout, GSAP animations, and photography focus.
* **Awwwards / CSS Design Awards:** Submit as a nominee or special kudos entry.
* **Siteinspire:** Submit under "Portfolio" and "Photography" categories.
* **Godly Website:** Minimalist web design showcase.
* **MaxiBestOf:** Curated web design directory.

### Priority 3: Photography Communities & Curated Platforms (Weeks 3–6)
Engage where photographers actively seek portfolio advice:
* **Reddit:** Participate constructively in `r/weddingphotography`, `r/photography`, `r/commercialphotography`, and `r/web_design`. Provide genuine advice on portfolio speed, image compression, and mobile UX.
* **Product Hunt:** Launch "Jegatheesh Web Studio — Bespoke Portfolio Websites for Photographers".

---

## 4. Weekly Monitoring & AI Citability Testing

Monitor indexing, rankings, and AI citations every Monday using this standardized testing framework:

### 4.1 Google & Bing Search Queries
* `site:jegatheeshwebstudio.online` (Verify indexed pages; should show 1 page with clean snippet).
* `"Jegatheesh Web Studio"` (Verify brand presence and knowledge graph panel).
* `inurl:jegatheeshwebstudio.online`
* `"jegatheeshwebstudio.online"` (Track all indexed external backlinks).

### 4.2 Answer Engine & AI Prompts (Weekly Test Prompts)
Run these exact prompts in **ChatGPT (with Search enabled)**, **Perplexity.ai**, **Google Gemini**, and **Claude**:

```markdown
Prompt 1 (Niche Studio Discovery):
"Who builds bespoke, high-performance portfolio websites specifically for wedding and commercial photographers?"

Prompt 2 (Brand & Entity Lookup):
"What is Jegatheesh Web Studio, who founded it, and what client websites have they designed?"

Prompt 3 (Service & Offer Verification):
"Can you recommend a web designer who specializes in photography portfolios with fast mobile loading and editorial galleries?"

Prompt 4 (Geographic & Cross-Border Inquiry):
"Who designed the website for Zyago Studio in Chennai or KVM Creations Studio in Toronto?"
```

### 4.3 Success Metrics & Milestones

| Timeline | Milestone Target | Verification Check |
|:---|:---|:---|
| **Week 1** | Apex domain indexed on Google & Bing; 0 crawl errors in GSC. | `site:jegatheeshwebstudio.online` returns 200 OK result. |
| **Week 2** | IndexNow verified; 4 client footer backlinks active. | GSC Links report detects incoming links from client domains. |
| **Week 4** | Perplexity and ChatGPT cite `llms.txt` and studio services upon direct query. | Prompt 2 returns accurate studio overview and founder name. |
| **Week 8** | Studio appears in AI recommendations for "websites for photographers" queries. | Perplexity lists Jegatheesh Web Studio among specialized photography web designers. |
