# Folio

Folio is a net worth and investment tracker: one calm place to see your net worth across ASX and US-listed holdings, in one base currency. Tagline: **"Every asset, every currency, one number."**

This repo starts as the marketing landing page. The product is a **native iOS app (iPhone first, Android later)**, so tokens, copy and data types need a single source of truth that both the website and the app can use. How much code they share depends on the iOS approach, which is still to be confirmed (see section 4).

## How to use this file

- **`docs/PRD.md`** is the source of truth for **what** to build: scope, requirements, calculations, data model, open questions, canonical mock data. Read it before starting any feature.
- **This file** is the source of truth for **how it looks, sounds and is built**: brand, design system, voice, conventions.
- If the two conflict, or a request conflicts with either, flag it instead of silently picking one. If something is missing or marked `[Open]` in the PRD, ask before inventing it.
- Folio is a **tracking tool, not a broker or adviser.** Never write copy or UI that implies trading, holding funds, recommendations or promised returns.
- The owner is a solo developer with a C# / SQL Server background. **No price data source has been chosen yet.** Build against a provider-agnostic price interface (get the latest and previous close for a ticker) and don't hardcode a vendor or scrape sites without checking their terms. Ask before integrating one.

---

## 1. Brand

### Logo

- **Wordmark:** lowercase `folio` in **Manrope SemiBold (600)**, letter-spacing about -0.03em. The final "o" is a **donut chart ring** made of three segments.
- **App icon:** the same ring on an ink navy rounded square (corner radius about 22% of the icon width).
- **Ring geometry** (clockwise from 12 o'clock): segment 1 spans 36.6% of the circle, 2.8% gap, segment 2 (gold) spans 32.1%, gap, segment 3 (blue-grey) spans 22.9%, gap. Stroke is about 16.7% of the ring's outer diameter. Ring outer diameter equals the height of the letter "o".
- **Colourways:** full colour on light (navy letters and first segment, gold, blue-grey), reversed on navy (off-white letters and first segment, same gold and blue-grey), one colour (all navy, the gaps carry the shape).
- **Always use the exported SVGs** (`folio-logo.svg`, `folio-icon.svg`). Never rebuild the wordmark from typed text with a ring beside it; the ring alignment is exact.
- **Favicon:** the three-segment ring becomes a blob at 16px. Use a simplified two-segment version with thicker gaps and confirm the design with the owner.
- No drop shadows, gradients, outlines or effects on the logo.

### Colour tokens

Define once (CSS variables or the Tailwind theme) and reference everywhere. **No hardcoded hex values in components.**

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#14213D` | Primary buttons, headings, primary text, active tab, selected states, icon background |
| `--gold` | `#C8963E` | Accent only. One small accent per screen or section. Never for gains or losses. Never small text on white (fails contrast) |
| `--blue-grey` | `#7F9CC7` | Third brand colour, chart segment |
| `--bg` | `#F6F7FA` | Page background (app and landing page) |
| `--surface` | `#FFFFFF` | Cards, list rows, inputs, tab bar |
| `--border` | `#E3E6EC` | Dividers, card and input borders |
| `--text` | `#14213D` | Primary text |
| `--text-muted` | `#5F6B7A` | Secondary text, labels, inactive icons |
| `--cream` | `#F1EFE8` | Ring segment and text on navy |
| `--gain` | `#1E8E5A` | Positive returns, arrows, chart line |
| `--gain-text` | `#187A4C` | Text inside a gain pill |
| `--gain-tint` | `#E3F3EA` | Gain pill background |
| `--gain-on-navy` | `#4FD1A1` | Gains on navy |
| `--loss` | `#D64545` | Negative returns, destructive actions |
| `--loss-on-navy` | `#FF8080` | Losses on navy |
| `--loss-tint` | `#FBE9E9` | Loss pill background (proposed, not yet in Figma) |
| `--crypto-tag-bg` | `#F3E6C9` | CRYPTO tag fill (navy text) |

**Chart palette, in order:** `#14213D`, `#7F9CC7`, `#2A9D8F`, `#C8963E`, `#8E7DBE`, `#D9C7A0`. Charts must stay legible without colour alone (labels and legends).

**Usage rules**

- About **60% neutral, 30% navy, 10% accent** on any screen.
- Green and red mean gain and loss **and nothing else**. Never use navy or gold to show gain or loss.
- Gold is a highlight, not a large fill. Example: the unread dot on the bell.
- Text contrast must meet **WCAG AA**.
- Dark mode is planned later (deeper navy about `#0B1426` for the background, `#14213D` for cards). Structure tokens by role now so it's one edit later.

### Typography

- **Manrope 600:** wordmark only (large marketing headlines only if the owner approves).
- **UI and body:** the Figma frames use a neutral sans (Inter). Use Inter unless the owner says otherwise.
- Numbers (net worth, values) use tabular figures.
- Sentence case for UI copy and buttons.

### Shape, spacing, depth

- 8pt grid. Mobile-first at **390 x 844** (iPhone 15 Pro), scale up from there.
- Cards: white, 1px `--border`, about 16px radius, **no shadow**. Buttons are **full pills**. Inputs about 12px radius.
- Flat and calm: **no drop shadows, no heavy gradients, no glass effects.** The one allowed gradient is the soft green fade under the net worth line chart.
- Icons: outline, about 24px, 1.75px stroke, navy (active) or `--text-muted` (inactive).

---

## 2. Components

- **Primary button:** navy pill, white medium-weight text, no shadow.
- **Secondary button:** white pill, 1px `--border`, navy text.
- **Destructive button:** outlined `--loss` pill with red text (Sign out). "Delete holding" is red text with no underline.
- **Timeframe pills** (1D 1W 1M 3M 1Y ALL): selected navy fill with white text, others `--text-muted` with no fill.
- **Segmented toggle** (Sector / Region / Asset / Individual): selected navy fill with white text, others white with a border.
- **Gain pill:** `--gain-tint` fill, `--gain-text` text, up arrow, e.g. "↑ $312.40 (+0.66%) today". The loss version uses the loss tint and red.
- **Bell:** **not in the MVP.** Notifications are out of scope, so hide the bell (and the Notifications row in Profile). Spec for later: navy outline, 24px, 44px tap area, no circle, small gold dot (8px, 2px ring in `--bg`) for unread. Never show it on the landing page mockups.
- **Bottom tab bar:** white, three tabs **Worth, Allocation, Profile**. Active navy, inactive `--text-muted`.
- **Net worth header:** muted label "NET WORTH (AUD)", large navy number, gain pill underneath. The chart sits directly on the page background with no grey box.
- **Top Movers:** horizontal scroll of small white cards (ticker and day change).
- **Holding row:** bold ticker and muted company name on the left, value and return on the right. Locked ticker fields show a padlock.
- **CRYPTO tag:** `--crypto-tag-bg` fill, navy small-caps text.
- **Avatar:** `#E3E6EC` circle with navy initials, no outline.

### Screen layout notes

- **Sign in / Get started:** centred logo (about 30% larger than default, slightly above vertical centre), tagline in `--text-muted`, buttons pinned to the bottom, legal text beneath. No panel or shadow behind the buttons.
- **Worth:** net worth header (no bell in the MVP), line chart (full width, green), timeframe pills, Top Movers, "Prices updated" line, tab bar.
- **Allocation:** title, donut with total and day change in the centre, legend rows, toggle, Holdings list with an edit pencil.
- **Profile:** avatar, name, email, "Member since" chip, Settings card (Base Currency, Security; Notifications and Appearance hidden in the MVP), More card, Sign out, Delete account, version text with clear space above the tab bar.
- **Edit Holdings / Edit Holding / Add Holding:** see PRD section 6.2.

---

## 3. Voice and copy

- **Tone:** calm, clear, plain English. Confident without hype. A tidy financial notebook, not a trading terminal.
- **Avoid:** hype, urgency, gamification, emojis, jargon, and clichés (bulls, rockets, coins). No trading-app language.
- **Australian English** (colour, favourite, organise). Currency as `$47,832.15`, label `AUD` where the base currency matters. Times in AEST/AEDT.
- **Locked copy:**
  - Tagline: "Every asset, every currency, one number"
  - Buttons: "Get started", "Sign in"
  - Legal line 1: "By continuing, you agree to our Terms of Service and Privacy Policy."
  - Legal line 2: "Folio is a tracking tool and doesn't provide financial advice."
  - Footers: "Values shown in AUD" (lists), "Enter values in native currency" (forms)
- Keep the disclaimer visible in the landing page footer and on the sign-in screen. Never name competitors on public pages. Never claim returns, ratings, user counts or features that don't exist.

---

## 4. Engineering conventions

- **Stack is not decided.** The landing page is a website and the app is **native iOS first**. Propose an approach and get approval before scaffolding. Two options to weigh: (a) a TypeScript monorepo with a Next.js and Tailwind landing page plus an Expo / React Native iOS app sharing one tokens package and types (closest to one codebase), or (b) SwiftUI in a separate repo with tokens exported from a single shared file. Keep the API layer easy to separate from either front end.
- **Tokens first:** colours, spacing, radii and type scale live in one place and every component consumes them. Set them up before building screens.
- **Components:** small, composable, named after section 2, built once and reused on the landing page and in the app.
- **Prices:** all price access goes through one provider-agnostic interface (latest close and previous close for a ticker and date). The backend stores its own daily closes and daily FX rates, and the app reads only from that store. Never call a data vendor from the app, never scrape sites whose terms prohibit it, and never hardcode a vendor's response shape outside its adapter.
- **Money:** never use floats for currency in production code. Use integer minor units or a decimal library. Percentages that must total 100 use largest-remainder rounding.
- **One dataset:** use the canonical mock data in PRD Appendix A everywhere (mockups, seeds, tests). Add tests that holdings sum to net worth and allocation percentages sum to 100.
- **Accessibility:** WCAG AA, keyboard navigation (web), VoiceOver labels (app), alt text, text alternatives for charts, respect reduced motion.
- **iOS specifics:** force the light interface style until dark mode is designed. Holdings are entered manually only (no broker linking). Cost basis is converted at today's FX rate. Account deletion must be possible in-app. Check the current App Store Review Guidelines before submitting.
- **Security:** secrets and API URLs in environment variables only, never in the repo. Never send holdings data to third-party analytics.
- Don't add features, dependencies or pages that weren't asked for. Prefer boring, well-supported libraries.
- Small, reviewable changes with short commit messages.
- When unsure about design intent, match the Figma frames. If the frames and this file disagree, this file wins, and you should flag the difference.

---

## 5. First tasks

1. Read this file and `docs/PRD.md`. Reply with a short summary and questions (iOS approach, hosting, waitlist provider, price data provider, sign-in methods).
2. Propose the repo structure and stack, and wait for approval.
3. Set up design tokens, font loading and a base layout.
4. Add the logo SVG components and a simplified favicon.
5. Build the landing page from PRD section 12 using the canonical mock data.