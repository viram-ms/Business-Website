# Namo 9 Tea — Website Project Context

## Project Overview

Static HTML website for **Namo 9 Tea** (brand of Vikram Brothers), a three-generation family tea business based in Mumbai, India. Founded 1984. Owner: **Meet Parekh** (certified tea taster, MBA in International Marketing). The site is purely informational — no e-commerce, no CMS, no backend.

- **Live domain:** `https://namo9tea.com`
- **Hosting:** Netlify (static deploy, no build step)
- **GitHub repo:** `viram-ms/Business-Website` (owner account: `viram-ms`)
- **Main branch:** `master`

---

## Tech Stack — Critical Constraints

**No build tools. No npm. No framework. No jQuery. No Bootstrap.**

Deploy directly as static HTML/CSS/JS to Netlify. Every file must work by simply opening in a browser.

| Layer | What's used |
|---|---|
| CSS | Single file: `css/namo9.css` (~1,800 lines) |
| JS | Single file: `js/namo9.js` (~200 lines, vanilla JS only) |
| Fonts | Google Fonts — Playfair Display + Inter only (one combined `<link>`) |
| Analytics | Google Analytics via `gtag` (ID: `G-P4F1ELXHQ5`) — on every page |
| Contact widget | GetButton.io (WhatsApp + email float button, bottom-right) — on every page |
| Maps | Google Maps `<iframe>` embed (no Maps JS API) — in footer of most pages + contact page body |

---

## Design System

### Color Palette (CSS custom properties)
```css
--color-forest:      #1a3a2a   /* Deep forest green — primary, headers, CTAs */
--color-forest-mid:  #2d5c42   /* Mid green — hover states, featured card accents */
--color-forest-lt:   #4a7c5f   /* Light green */
--color-gold:        #c9a84c   /* Warm artisan gold — accent, dividers, highlights */
--color-gold-lt:     #e8d5a0   /* Pale gold */
--color-gold-pale:   #f5eed8
--color-cream:       #faf6f0   /* Page background */
--color-cream-dk:    #f0e8d8   /* Alternate section background */
--color-bark:        #3d2b1f   /* Footer background */
--color-text:        #2c2015   /* Body text */
--color-text-muted:  #6b5c4e   /* Captions, meta text */
--color-border:      rgba(201, 168, 76, 0.25)
```

### Glassmorphism Tokens
```css
--glass-bg:     rgba(250, 246, 240, 0.72)
--glass-border: rgba(201, 168, 76, 0.30)
--glass-blur:   blur(16px)
--glass-shadow: 0 8px 32px rgba(26, 58, 42, 0.12)
```

### Typography
- **Headings (h1–h4):** Playfair Display (serif) — `var(--font-display)`
- **Everything else:** Inter (sans-serif) — `var(--font-body)`
- Fluid type scale using `clamp()` — min at 375px viewport, max at 1440px:
  ```
  --text-xs through --text-hero (8 steps)
  ```

### Spacing
`--space-1` (0.25rem) through `--space-32` (8rem) in 4px increments.

### Section rhythm
`--section-gap: clamp(4rem, 3rem + 4vw, 8rem)` — used on all major sections.

### Header height
`--header-h: 72px` — all pages have `padding-top: var(--header-h)` on their first section.

---

## File Structure

```
/
├── index.html          Home page
├── about.html          About Us
├── journey.html        Our Journey (timeline)
├── products.html       Products (carousels + modals)
├── packaging.html      Packaging options
├── contact.html        Contact (map + info card)
├── press.html          Press & Media coverage
├── robots.txt          Allows all crawlers, points to sitemap
├── sitemap.xml         All 7 pages with priorities
├── css/
│   └── namo9.css       SINGLE stylesheet (replaces Bootstrap + 13 old CSS files)
├── js/
│   └── namo9.js        SINGLE JS file (replaces jQuery + 17 plugins)
└── img/
    └── icons/          All images live here (logos, product images, team photos)
```

### Key images
| File | Used for |
|---|---|
| `img/icons/Namo 9 LOGO FNAL.png` | Header logo + footer logo |
| `img/icons/namo9_tea_fevicon.png` | Favicon |
| `img/icons/stress_buster_2.png` | Home page hero background (desktop), OG image for all pages |
| `img/icons/stress_buster_mob.jpg` | Home page hero background (mobile, ≤768px) |
| `img/icons/meet2.jpeg` | Meet Parekh team photo |
| `img/icons/nilesh3.jpeg` | Nilesh Parekh team photo |
| `img/icons/bulk_packaging.png` | Packaging page — bulk section |
| `img/icons/loose_packaging.png` | Packaging page — private label section |
| `img/icons/facebook.png` | Social icon |
| `img/icons/instagram.png` | Social icon |
| `img/icons/linkedin.png` | Social icon |

---

## namo9.js — How the JS Works

All functionality is vanilla JS, initialized in `DOMContentLoaded`. No jQuery, no external dependencies.

### `initHeader()`
Adds `.scrolled` class to `<header class="site-header">` at 80px scroll threshold. CSS uses this to switch from transparent to glassmorphism style.

### `initMobileMenu()`
Hamburger (`#hamburger`) toggles `.is-open` on `#mobile-menu`. Escape key and clicking any `.mobile-nav-link` closes it.

### `Carousel` class
- Activated by `data-carousel` attribute on a container element
- Children are the slides
- Auto-advances every 3500ms
- CSS opacity fade transition between slides
- Looks for `data-prev` / `data-next` buttons within the same parent

### `initModals()`
- `data-modal-trigger="id"` on a button opens the modal with matching `id`
- `data-modal-close` on the X button closes it
- Clicking the backdrop (`.modal-overlay`) also closes
- Escape key closes
- Locks `document.body` overflow while open

### `initScrollReveal()`
Intersection Observer with `threshold: 0.12`. Elements with `data-reveal` get `.is-visible` class added on entry. Variants:
- `data-reveal` — fade up (default)
- `data-reveal="fade"` — fade only (no translate)
- `data-reveal="fade-left"` — slide in from left
- `data-reveal="fade-right"` — slide in from right
- `data-reveal="scale"` — scale up
- `data-reveal-delay="100"` — stagger in milliseconds (sets inline `transition-delay`)

`prefers-reduced-motion: reduce` disables all animations.

---

## CSS Structure (namo9.css sections)

1. Design tokens (`:root`)
2. Reset + Base
3. Typography scale
4. Layout utilities (`.container`, `.section-gap`, `.text-center`, etc.)
5. Header / nav
6. Hero sections (home full-bleed + interior page hero)
7. Buttons (`.btn-primary`, `.btn-outline`)
8. Section headers (`.section-label`, `.section-title`, `.section-divider`)
9. Bento grid (`.bento-grid`, `.bento-card`)
10. Product cards (`.products-grid`, `.product-card`)
11. Carousel (`.carousel-wrap`, `.carousel-track`, `.carousel-slide`)
12. Modals (`.modal-overlay`, `.modal-box`)
13. About page (`.about-story`, `.carousel-wide`, `.expertise-grid`)
14. Timeline (`.timeline`, `.timeline-item`, `.timeline-card`, `.timeline-dot`)
15. Team cards (`.team-grid`, `.team-card`, `.team-avatar`)
16. Packaging layout (`.packaging-section`, `.packaging-row`, `.packaging-row--reverse`)
17. Contact layout (`.contact-section`, `.contact-grid`, `.contact-map`, `.contact-info-card`)
18. Footer (`.site-footer`, `.footer-grid`, `.footer-map-wrap`)
19. Scroll reveal animations
20. Why section (`.why-section`, `.why-content`)
21. Packaging specifics
22. Responsive breakpoints (1024px, 768px, 480px)
23. Press page (`.press-quote-banner`, `.press-card-featured`, `.press-grid`, `.press-card`, etc.)
24. Utility classes (`.alt-bg`, `.white-bg`)
25. Reduced motion

---

## Page-by-Page Summary

### `index.html` (Home)
- Hero: `stress_buster_2.png` (desktop) / `stress_buster_mob.jpg` (mobile ≤768px), dark overlay gradient
- Sections: Hero → Services bento grid (5 cards) → Featured products (3 cards) → Why Choose Us (centered text only, **no image**) → Team (2 cards) → Footer

### `about.html` (About)
- Sections: Page hero → About story text (centered, max 760px) → Wide carousel (coverpic images) → Expertise grid (4 bento cards) → Team → Footer

### `journey.html` (Journey)
- Sections: Page hero → Vertical CSS timeline with 4 milestones (1984, 1975, 1985, Today)
- Timeline: alternating left/right cards on desktop, single-column on mobile

### `products.html` (Products)
- Sections: Page hero → Brand products grid (6 cards with carousels) → Bulk teas (3 cards with modal triggers) → 3 modal overlays → Premix products (5 cards) → Footer
- Carousel IDs: uses `data-carousel` attribute (no IDs), fixing duplicate ID bug from original

### `packaging.html` (Packaging)
- Sections: Page hero → Bulk Packing (text left, image right) → Private Labeling (reversed via `.packaging-row--reverse`) → Footer

### `contact.html` (Contact)
- Sections: Page hero → Two-column grid (Google Maps iframe left, glassmorphism info card right) → Footer (no map in footer — already shown above)

### `press.html` (Press & Media)
- Sections: Page hero → Pull quote banner ("Quality is King") → Featured card (India Times Now) → Secondary card grid (Lokmat Times) → Press enquiry strip → Footer
- **Award name (Bharat Shreshtha Ratna Sanman 2026) deliberately omitted** from all visible content per owner's request. Articles still link out to the original URLs.

---

## Interior Page Hero
All non-home pages use a pure CSS diagonal gradient (no image):
```css
.page-hero {
  background: linear-gradient(135deg, #1a3a2a 0%, #2d5c42 40%, #3d2b1f 100%);
}
```

---

## Navigation
All 7 pages share identical header and footer markup. When adding a new page:
1. Add `<li><a href="newpage.html" class="nav-link">Name</a></li>` to desktop nav in ALL pages
2. Add the same to mobile nav (`class="mobile-nav-link"`) in ALL pages
3. Add to footer Quick Links in ALL pages
4. Set `aria-current="page"` on the active page's own nav link
5. Add the new page to `sitemap.xml`

---

## SEO Setup (completed)

Every page has:
- Unique `<title>` (50–65 chars)
- Unique `<meta name="description">` (under 160 chars)
- `<link rel="canonical" href="https://namo9tea.com/PAGE">` 
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`, `og:locale`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- JSON-LD structured data:
  - `index.html`: `Organization` + `LocalBusiness` (address, phone, email, social links, founding date)
  - All subpages: `BreadcrumbList`
  - `press.html`: `BreadcrumbList` + `Person` (Meet Parekh)
- OG image for all pages: `https://namo9tea.com/img/icons/stress_buster_2.png`
- Google Site Verification: `OdEFf_aOpcS-l5h-Gwbv_Tt-f6-4uUHpTYOfpOvtZig`

**Post-deploy actions still needed:**
1. Submit `https://namo9tea.com/sitemap.xml` in Google Search Console
2. Request indexing for each page via URL Inspection tool

---

## Third-Party Integrations (keep verbatim on every page)

### Google Analytics
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-P4F1ELXHQ5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-P4F1ELXHQ5');
</script>
```

### GetButton.io Widget (WhatsApp + Email float)
```html
<script type="text/javascript">
  (function () {
    var options = {
      email: "namo9tea@gmail.com",
      whatsapp: "+917977579726",
      call_to_action: "Message us",
      button_color: "#FF6550",
      position: "right",
      order: "email,whatsapp",
    };
    var proto = 'https:', host = "getbutton.io", url = proto + '//static.' + host;
    var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
    s.src = url + '/widget-send-button/js/init.js';
    s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
    var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
  })();
</script>
```

### Google Maps iframe (footer + contact page body)
```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.5270160677123!2d72.83514751484938!3d18.95231868715904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf614b4ccbc1%3A0xbd68b21ad31c6e10!2sVikram%20Brothers!5e0!3m2!1sen!2sin!4v1566650808351!5m2!1sen!2sin"
  title="Vikram Brothers location"
  allowfullscreen
  loading="lazy">
</iframe>
```

---

## Contact Details (used throughout site)
```
Address:  330, Narshi Natha Street, Navrang Building,
          Masjid Bunder (West), Mumbai-400009, Maharashtra, India
Email:    namo9tea@gmail.com
Office:   022-23423282
Phone:    +91 79775 79726
Facebook: https://www.facebook.com/namo9tea
Instagram: https://instagram.com/namo9tea?utm_medium=copy_link
LinkedIn: https://www.linkedin.com/company/namo9tea
```

---

## How to Add a New Press Article

1. Open `press.html`
2. Inside `<div class="press-grid">`, add a new `.press-card`:

```html
<div class="press-card" data-reveal data-reveal-delay="0">
  <div class="press-card-header">
    <span class="press-pub-badge">Publication Name</span>
    <span class="press-date">Month DD, YYYY</span>
  </div>
  <h3 class="press-headline">Article headline here</h3>
  <p class="press-excerpt">
    2–3 sentence summary of the article.
  </p>
  <a href="ARTICLE_URL" class="press-link" target="_blank" rel="noopener">
    Read Article &nbsp;›
  </a>
</div>
```

3. Update `sitemap.xml` `<lastmod>` date for `press.html` if desired.

---

## GitHub Workflow

- **Repo:** `viram-ms/Business-Website`
- **Owner GitHub account:** `viram-ms` (needed for push/PR — use `gh auth switch --user viram-ms`)
- **Main branch:** `master`
- **Feature branch convention:** `feature/description-of-change`
- After switching to `viram-ms`, push via token-embedded URL to avoid keychain conflicts:
  ```bash
  TOKEN=$(gh auth token --user viram-ms)
  git remote set-url origin "https://viram-ms:${TOKEN}@github.com/viram-ms/Business-Website.git"
  git push -u origin feature/your-branch
  git remote set-url origin "https://github.com/viram-ms/Business-Website.git"
  ```
- Switch back after: `gh auth switch --user vshah_tandems`

---

## Key Design Decisions (do not revert)

- **No meeting.jpg** on the Why Choose Us section — owner removed it intentionally
- **No Bootstrap, no jQuery** — deliberately eliminated for performance
- **Interior page heroes** use pure CSS gradient, not the stress_buster images
- **Award name (Bharat Shreshtha Ratna Sanman 2026) not mentioned** on the press page — owner's explicit request; external article links are kept
- **Font stack:** Playfair Display + Inter only — do not add more Google Fonts
- **`font-serif` / `font-sans`** — use CSS custom properties `var(--font-display)` and `var(--font-body)`, not hardcoded font names
