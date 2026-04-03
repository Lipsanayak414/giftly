# Giftly — AI-Powered Gift Recommendation Engine

> A zero-backend, mobile-first web application that uses Google Gemini AI to generate personalised gift recommendations with multi-retailer purchase links.

🌐 **Live Site:** [your-username.github.io/giftly](https://your-username.github.io/giftly)

---

## Overview

Giftly solves a universal problem: finding the right gift for someone is hard. Most people default to generic Amazon searches or gift cards. Giftly uses conversational AI to understand the recipient's personality, interests, budget, and occasion — then returns six thoughtful, curated recommendations with direct purchase links from the most relevant retailers.

The entire application runs in a single HTML file with no backend, no build step, and no dependencies to install.

---

## Features

- **AI-powered recommendations** via Google Gemini 2.0 Flash
- **Multi-retailer routing** — gifts are matched to specialist stores (e.g. ComicSense for manga, Nykaa for beauty, Croma for electronics) rather than defaulting to a single marketplace
- **Multi-currency support** — INR, USD, EUR, GBP with tailored retailer lists per region
- **Affiliate link integration** — Amazon Associates tags injected automatically for India and UK
- **Mobile-first design** — fully responsive, touch-friendly UI built without any CSS framework
- **Zero backend** — no server, no database, no build pipeline
- **Animated UI** — smooth entry animations, double-ring loading spinner, shimmer button effects, card hover lifts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript (ES2017+) |
| AI | Google Gemini 2.0 Flash (REST API) |
| Fonts | Google Fonts — Playfair Display, DM Sans |
| Hosting | GitHub Pages |
| Monetisation | Amazon Associates (affiliate links) |

No frameworks. No npm. No build tools. Intentionally dependency-free for maximum portability and auditability.

---

## How It Works

```
User Input → Prompt Engineering → Gemini API → JSON Parsing → Rendered UI
```

1. User fills in recipient details: gender, age group, occasion, budget, and hobbies
2. The app constructs a structured natural language prompt
3. Gemini returns a JSON array of 6 gift objects with name, description, price, tags, and retailer links
4. The response is parsed and rendered as gift cards with multi-store "Shop Now" buttons
5. Affiliate tags are injected into Amazon URLs client-side before any link is opened

---

## Retailer Coverage

### 🇮🇳 India (INR)
Amazon.in · Flipkart · Myntra · ComicSense · Bookswagon · Nykaa · Croma · The Souled Store · Bewakoof · HealthKart

### 🇺🇸 United States (USD)
Amazon.com · Target · Etsy · Barnes & Noble · Best Buy · Uncommon Goods · REI

### 🇬🇧 United Kingdom (GBP)
Amazon.co.uk · Waterstones · John Lewis · Etsy · Zavvi · Sports Direct · Cult Pens

### 🇪🇺 Europe (EUR)
Amazon.de · Thalia · Zalando · MediaMarkt · Etsy

---

## Project Structure

```
giftly/
├── index.html        # Entire application — UI, styles, and logic
├── README.md         # Project documentation
├── CASE_STUDY.md     # In-depth technical write-up
└── .gitignore        # Git ignore rules
```

---

## Local Development

No installation required. Because browser security blocks API calls from `file://`, use a simple local server:

```bash
git clone https://github.com/your-username/giftly.git
cd giftly
python3 -m http.server 8000
# Open http://localhost:8000
```

### Configuration

**Gemini API key** — get a free key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) and set it in `index.html`:

```js
var apiKey = 'YOUR_GEMINI_API_KEY';
```

**Affiliate tags** — add your Amazon Associates IDs:

```js
var ATAGS = {
  'amazon.in':    'your-tag-21',
  'amazon.co.uk': 'your-tag-21',
};
```

---

## Design Decisions

**Why no framework?** For a single-page UI with minimal state, vanilla JS is faster to ship, easier to audit, and more portable. Adding React or Vue would introduce unnecessary build complexity for no user-facing benefit.

**Why Gemini?** Google's Gemini API is CORS-enabled, making true zero-backend browser-side AI calls possible. Other major AI providers require a server-side proxy.

**Why multi-retailer?** A gift for a manga lover should link to a specialist comic store, not a general marketplace. Contextually appropriate retailer routing improves relevance and user trust.

---

## Interests Supported

Reading · Gaming · Music · Cooking · Fitness · Travel · Art · Photography · Gardening · Yoga · Pets · Sports · Movies · Fashion · Coffee/Tea · DIY/Tech · Puzzles

---

## Licence

MIT — free to use, modify, and deploy.

---

*Built by [Your Name](https://github.com/your-username)*
