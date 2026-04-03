# Case Study: Giftly — AI Gift Recommendation Engine

**Project Type:** Independent commercial web product  
**Timeline:** 2025  
**Role:** Solo developer — concept, design, engineering, deployment  
**Live URL:** [your-username.github.io/giftly](https://your-username.github.io/giftly)  
**Repository:** [github.com/your-username/giftly](https://github.com/your-username/giftly)

---

## Problem Statement

Gift-giving is a universal challenge. The existing solutions — browsing Amazon with a vague search term, or buying a generic gift card — fail to account for the recipient's personality, specific interests, or the occasion's context. There was no lightweight, AI-driven tool that could intelligently match a person's profile to relevant gift ideas across multiple specialist retailers.

---

## Solution

Giftly is an AI-powered gift recommendation engine. A user provides details about the gift recipient — their gender, age group, occasion, budget, and hobbies — and the application generates six personalised gift recommendations, each with purchase links from contextually appropriate retailers.

The product is intentionally zero-infrastructure: it runs entirely in the browser with no backend server, no database, and no build pipeline. This makes it instantly deployable, zero-cost to operate, and accessible to anyone with a browser.

---

## Technical Implementation

### Architecture

The application is a single HTML file (~420 lines) containing all CSS, JavaScript, and markup. This was a deliberate architectural choice: eliminating server-side infrastructure removes operational cost, deployment complexity, and latency entirely.

```
Browser → Google Gemini REST API → JSON response → Rendered UI
```

### AI Integration

The core of the product is a structured prompt sent to Google Gemini 2.0 Flash. The prompt is dynamically constructed from the user's inputs and instructs the model to return a strictly formatted JSON array.

Key prompt engineering decisions:
- Explicitly instructing the model to output raw JSON with no markdown wrapping
- Using a `[start, end]` slice extraction strategy on the raw response to handle any stray text robustly
- Increasing `maxOutputTokens` to 3000 to ensure all six recommendations are returned completely
- Instructing the model to select contextually appropriate retailers per gift type, rather than defaulting to a single marketplace

### Multi-Retailer Routing

A key innovation over simpler gift tools is the retailer routing system. The application maintains a curated list of specialist retailers per currency region. These are passed to the AI in the prompt, and the model is instructed to select the most contextually appropriate store for each gift — for example:

- A manga recommendation → ComicSense (India) or Waterstones (UK)
- A fitness gift → HealthKart (India) or REI (US)
- An electronics gift → Croma (India) or Best Buy (US)

This produces more relevant, trustworthy results than routing all gifts through a single general marketplace.

### Affiliate Monetisation

The application includes an affiliate link injection system. Amazon Associates tracking tags are appended to applicable URLs client-side using the `URL` API before any link is opened. This creates a passive revenue stream from user purchases without requiring any server-side processing.

### UI & UX Engineering

The interface was designed without any CSS framework, using:
- CSS custom properties (variables) for a consistent design token system
- `clamp()` for fluid responsive typography
- `animation-delay` staggering for sequential card entrance animations
- A shimmer sweep effect on the submit button using a pseudo-element and `transform` transition
- SVG noise texture via a data URI for a subtle grain overlay
- A double-ring counter-rotating loading spinner built in pure CSS

---

## Challenges & Solutions

**CORS restrictions** — Major AI providers (Anthropic, OpenAI) block browser-to-API calls. After testing multiple approaches including an Express.js proxy server, I identified that Google's Gemini API explicitly supports browser-side CORS, enabling a true zero-backend architecture.

**JSON parsing reliability** — Large language models occasionally wrap JSON in markdown code fences or add explanatory text. Rather than relying on exact format compliance, I implemented a `indexOf('[')` / `lastIndexOf(']')` extraction strategy that robustly finds the JSON array regardless of surrounding content.

**Slider interaction on mobile** — An initial implementation had the page's grain overlay (`body::before`) at a high z-index, intercepting pointer events on the range input. Diagnosed via browser DevTools and resolved by correcting the stacking context.

---

## Outcome & Impact

- Fully deployed, publicly accessible product at a live URL
- Zero operational cost — no server, no hosting fees beyond a free GitHub Pages deployment
- Commercial revenue potential via Amazon Associates affiliate programme
- Open-sourced under MIT licence, demonstrating commitment to the developer community

---

## Skills Demonstrated

- **AI/ML integration** — prompt engineering, response parsing, model selection
- **Frontend engineering** — responsive design, CSS animations, vanilla JS, accessibility
- **Product thinking** — identified a real problem, designed an end-to-end solution, shipped it
- **Commercial awareness** — built affiliate monetisation directly into the product architecture
- **Technical writing** — documented architecture decisions, setup instructions, and design rationale

---

*This case study is submitted as evidence of technical capability and independent product development for the Global Talent Visa (Tech Nation) application.*
