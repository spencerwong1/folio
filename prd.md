# Folio: Product Requirements Document

| | |
|---|---|
| **Version** | 0.2 (draft) |
| **Date** | 29 September 2026 |
| **Owner** | Solo founder / developer |
| **Status** | Design complete (hi-fi Figma). Landing page next, then the iOS app MVP |
| **Companion doc** | `CLAUDE.md` (brand, design system, voice, conventions) |

Items marked **[Assumption]** are working assumptions to be confirmed. Items marked **[Open]** are undecided and are collected in section 15.

**Decisions locked (29 Sep 2026):** manual holdings entry only (no broker linking); cost basis converted at today's FX rate; notifications are out of the MVP; the app is a **native iOS app first**.

---

## 1. Overview

Folio is a calm, single place to see your net worth across your investments. Users enter what they hold, Folio prices it daily, converts everything into one base currency, and shows one number plus how it's changing and where the money sits.

**Tagline:** "Every asset, every currency, one number."

Folio is Australian-first (AUD is the default base currency) and supports ASX-listed and US-listed stocks and ETFs from day one. It launches as a native iPhone app first, with Android later.

Folio is a **tracking tool only**. It doesn't place trades, hold money or give financial advice.

## 2. Problem and opportunity

- People who invest across several platforms (a local broker, a US broker, crypto) have no single view of their net worth. They check multiple apps or maintain a spreadsheet.
- Existing trackers are built for US markets first. A common frustration is that they can't add **ASX-listed stocks or Betashares ETFs**, which are the core holdings for many Australian investors.
- Multi-currency holdings make manual tracking harder, because values need converting into one currency to make sense.
- Most finance apps feel like trading terminals: noisy, urgent and gamified. There's room for a calmer, clearer product aimed at people who invest for the long term.

**Opportunity:** be the simplest, best-looking way for Australian investors to see one net worth number across ASX and US holdings.

## 3. Target users

**Primary:** Australian retail investors, roughly 20 to 45, who hold ASX shares/ETFs and often some US shares. They're comfortable with apps, invest regularly, and want a clear overview without connecting bank logins.

**Secondary (later):** friends who want to compare returns with each other (social phase).

**Not the target (for now):** active day traders, professional advisers, people who want trade execution.

### Key user stories

1. As an investor, I want to add my holdings once so I can see my total net worth without doing maths.
2. As an investor, I want to see how my net worth changed today and over time, so I know whether I'm on track.
3. As an investor with US and Australian holdings, I want everything converted to AUD so the total makes sense.
4. As an investor, I want to see how my money is split by region and sector, so I can spot concentration.
5. As an investor, I want to edit or remove a holding quickly when I buy or sell.
6. As a visitor to the landing page, I want to understand what Folio does in seconds and join the waitlist.

## 4. Goals, non-goals and success metrics

### Goals

- **G1:** Launch a landing page that clearly explains Folio and collects waitlist signups.
- **G2:** Ship an MVP where a user can add holdings and see net worth, daily change, returns and allocation, all in AUD or another base currency.
- **G3:** Keep the product feeling calm, fast and trustworthy.

### Non-goals (MVP)

- Trading or order execution, or holding user funds.
- Financial advice, recommendations or "insights" that could be read as advice.
- Automatic import from brokers or banks. Holdings are **manual entry only** for the MVP (decided).
- Social features (friends, shared portfolios, leaderboards).
- Tax reporting, dividends tracking, or cost-base tax calculations.
- Real-time streaming prices.
- Notifications of any kind (push or in-app). The bell and the Notifications setting are hidden in the MVP.
- Android, web app and iPad-specific layouts.
- Dark mode.

### Success metrics **[Assumption: owner to set targets]**

| Stage | Metric | Target |
|---|---|---|
| Landing page | Waitlist signups | TBD |
| Landing page | Visitor-to-signup conversion | TBD |
| MVP | Users who add at least 3 holdings in their first session | TBD |
| MVP | Week-4 retention | TBD |
| MVP | Price data freshness (prices updated after each market close) | 99%+ of days |

## 5. Scope and phases

| Phase | Scope | Exit criteria |
|---|---|---|
| **0. Design** | Hi-fi Figma for key screens, brand, logo | Done |
| **1. Landing page** | Marketing site, waitlist, legal pages, real screen mockups | Live, collecting signups |
| **2. iOS app MVP** | Sections 6.1 to 6.7 (iPhone only) | Owner and a small TestFlight beta group use it daily with correct numbers |
| **3. Social** | Friends, viewing portfolios, comparing returns, portfolio privacy | Decide after MVP feedback |
| **Later** | Notifications, Android, CSV import, crypto holdings, dark mode, dividends | TBD |

The landing page is a website and the app is native iOS, so how much code they can share depends on the iOS approach (see section 9 and Open Questions). Whichever is chosen, design tokens, copy and data types should have a single source of truth.

---

## 6. Functional requirements (MVP)

### 6.1 Accounts and onboarding

- Users can create an account and sign in. **[Open]** Sign-in methods (email + password, Apple, Google). If any third-party sign-in such as Google is offered, App Store rules require Sign in with Apple to be offered too; check the current App Store Review Guidelines.
- Users can **delete their account and data from inside the app** (an App Store requirement for apps with account creation). This isn't in the Figma designs yet, so add a row in Profile.
- Landing/sign-in screen offers **Get started** (primary) and **Sign in** (secondary).
- Onboarding includes choosing a **base currency** (default AUD).
- Legal line shown at sign-in: "By continuing, you agree to our Terms of Service and Privacy Policy." plus "Folio is a tracking tool and doesn't provide financial advice."

**Acceptance criteria**
- A new user can go from Get started to the empty Worth screen in under 2 minutes.
- Base currency is stored per user and applied everywhere.

### 6.2 Holdings management

Screens: **Edit Holdings** (list), **Edit Holding**, **Add Holding**.

- Holdings are entered **manually**. There is no broker or bank linking in the MVP.
- **Add:** ticker (searchable by symbol or name), quantity, average cost price, purchase date. Cost price is entered in the holding's native currency (shown as a label, e.g. AUD or USD).
- **Edit:** quantity, average cost price, purchase date. The **ticker is locked** after creation (padlock icon shown).
- **Delete:** available from the Edit screen and from the list. Requires confirmation.
- **List:** search, each row shows ticker, name, value (in base currency), quantity, edit and delete actions. Sorted by value, descending.
- Footer note on the list: "Values shown in AUD" (updates to the base currency).
- Supported instruments at MVP: ASX-listed and US-listed stocks and ETFs (including Betashares ETFs).

**Acceptance criteria**
- Any ASX or US-listed security available in the price source can be found and added.
- Adding, editing or deleting a holding updates Worth and Allocation immediately.
- Validation: quantity greater than 0, cost price 0 or more, purchase date not in the future.

### 6.3 Price data

- Prices come from a **licensed market data provider** covering ASX-listed and US-listed securities (there is no existing price source yet). **[Open]** Which provider, its cost, update times and whether its licence allows showing prices to end users in a public app.
- **[Assumption]** MVP uses end-of-day prices, updated after each market's close. The Worth screen shows a "Prices updated" timestamp (e.g. "Prices updated 4:10 PM AEST").
- **Approach by stage:**
  - *Development and private beta:* a free tier from a data provider is acceptable, as long as its terms allow it. Free tiers often restrict commercial use and request rates, and coverage of ASX tickers must be checked.
  - *Public launch:* a **licensed provider** covering both ASX and US, with the right to show prices to end users confirmed in writing.
  - **No scraping** of sites whose terms prohibit it.
- All price access goes through a **provider-agnostic interface** (latest close and previous close for a ticker and date), so changing provider is a change in one place.
- The backend stores **its own daily closes** (one close and one previous close per security per day) and the app reads from that store. It never calls the provider from the phone. This keeps API usage and cost low, gives history for the net worth chart, and avoids real-time data entirely.
- Daily FX rates come from the same provider where possible.
- Each security stores previous close so day change can be calculated.
- If prices are stale or a fetch fails, the app shows the last known price and an unobtrusive stale indicator. It never shows a blank or zero value.

**Acceptance criteria**
- Prices refresh at least once per trading day for both markets.
- Timestamp reflects the actual last successful update.

### 6.4 Worth (home) screen

- Header: label "NET WORTH (AUD)" (uses base currency), large total, and a gain/loss pill showing day change in dollars and percent, e.g. "↑ $312.40 (+0.66%) today".
- Line chart of net worth over time with timeframe pills: **1D, 1W, 1M, 3M, 1Y, ALL** (default 1M).
- **Top Movers:** horizontally scrolling cards for the user's holdings showing ticker and day change, ordered by absolute day change. **[Open]** Also show worst performers here or on a dedicated view.
- "Prices updated" timestamp.
- No notification bell in the MVP. It appears in the Figma frame but is hidden until notifications exist (see 6.8).

**Acceptance criteria**
- Net worth equals the sum of every holding's value in the base currency, to the cent.
- Chart history is built from stored daily prices and the user's holding dates. **[Open]** Behaviour before the first holding's purchase date (assume the chart starts at the earliest purchase date).
- Empty state (no holdings): friendly prompt to add a first holding.

### 6.5 Allocation screen

- Donut chart with total in the centre and day change underneath.
- Legend rows: colour dot, name, percent, value.
- Toggle: **Sector / Region / Asset / Individual**.
  - **Region:** Australia, US, Asia (and others as needed).
  - **Sector:** e.g. Financials, Materials, Technology, Broad market ETFs.
  - **Asset:** stock vs ETF (and crypto later).
  - **Individual:** per holding.
- **Holdings** list beneath, sorted by value, with total return per holding. An edit button opens Edit Holdings.

**Acceptance criteria**
- Percentages sum to 100% (largest-remainder rounding) and segment sizes match the legend exactly.
- Legend values sum to the net worth total.
- **[Open]** Source of sector and region classification for each security, and how ETFs are classified (by fund mandate, e.g. VAE = Asia, VOO = US).

### 6.6 Base currency

- User can choose a base currency in onboarding and change it in Profile.
- All displayed values are converted to the base currency using daily FX rates.
- Inputs (cost price) stay in each holding's native currency.

**Acceptance criteria**
- Changing base currency re-renders every screen with converted values and updated labels, with no stale AUD text.
- **Decided:** cost basis is converted at **today's FX rate**, so no historical FX data is needed. Consequence: a holding's total return % equals its return in its own currency and does not include how the exchange rate has moved since purchase. Revisit later if users want true AUD returns.
- **[Open]** FX rate source.

### 6.7 Profile and settings

- Header: avatar (initials), name, email, "Member since" chip.
- **Settings:** Base Currency, Security (Face ID, password, 2FA). **Hidden in the MVP:** the Notifications row (no notifications yet) and the Appearance toggle (light only until dark mode exists). Force the light interface style on iOS so the app doesn't switch to unstyled dark mode.
- **More:** Invite Friends, Rate the App, Terms & Privacy.
- **Sign out** (destructive style), **Delete account**, and app version text.

### 6.8 Notifications (out of scope for MVP)

No notifications of any kind in the MVP. Hide the bell on the Worth screen and the Notifications row in Profile, and don't request notification permission. The bell and the row stay in the Figma designs for later. Candidate future triggers: a daily summary after market close, or a large daily move on a holding. Remove the bell from any landing page mockups so the site doesn't show a feature that doesn't exist.

---

## 7. Key calculations

All monetary values are in the user's base currency unless stated.

- **Holding value** = quantity × latest price × FX rate (native to base).
- **Holding cost** = quantity × average cost price × **today's** FX rate (decided).
- **Total return %** = (value − cost) ÷ cost. Because cost uses today's rate, this equals the return in the holding's own currency (FX movement is not included).
- **Holding day change** = quantity × (latest price − previous close) × FX rate.
- **Net worth** = sum of holding values.
- **Net worth day change** = sum of holding day changes; percent = day change ÷ (net worth − day change).
- **Allocation %** = category value ÷ net worth, rounded with the largest-remainder method so totals equal exactly 100%.

Never compute currency with floating point in production. Use integer minor units or a decimal library.

## 8. Data model (draft)

| Entity | Key fields |
|---|---|
| **User** | id, email, name, base_currency, created_at |
| **Security** | id, ticker, exchange (ASX / NYSE / NASDAQ), name, currency, type (stock / etf / crypto later), region, sector |
| **Holding** | id, user_id, security_id, quantity, average_cost, cost_currency, purchase_date |
| **Price** | security_id, date, close, previous_close, fetched_at |
| **FxRate** | from_currency, to_currency, date, rate |
| **Waitlist entry** | id, email, created_at, consent flag |

**[Open]** Whether a holding is a single position with an average cost (as designed) or a list of purchase lots. The current screens assume a single average cost and one purchase date. Average cost is simpler and matches the design, so it's the default for MVP.

Later: Friendship, PortfolioPrivacy setting, Notification, Session.

---

## 9. Non-functional requirements

- **Performance:** Worth screen renders in under 1 second on a mid-range phone after first load. Landing page targets 90+ Lighthouse performance and accessibility.
- **Accessibility:** WCAG AA contrast, keyboard navigation on web, screen-reader labels on charts (donut and line chart need text alternatives), respect reduced motion.
- **Security:** all traffic over HTTPS, passwords hashed, 2FA supported for accounts, secrets in environment variables, least-privilege access to the price API and database.
- **Privacy:** collect the minimum data needed. Holdings are sensitive financial information, so treat them accordingly. Comply with Australian privacy law (Privacy Act 1988 and the Australian Privacy Principles). Waitlist emails require a clear consent statement and an unsubscribe route.
- **Reliability:** price refresh failures must degrade gracefully (last known value plus stale indicator).
- **Analytics:** privacy-respecting, aggregate analytics only. Never send holdings data to third-party analytics.
- **Platforms:** **native iOS app first** (iPhone, portrait, designed at 390 x 844 for iPhone 15 Pro). Android later. Light theme only at MVP. Landing page is a responsive website.
- **iOS approach [Open]:** either (a) React Native / Expo in a TypeScript monorepo with the landing page, which shares tokens and types and is closest to the "one codebase" idea, or (b) SwiftUI in a separate repo, with tokens exported from one shared file. Either way, use Face ID through the system authentication API and distribute betas through TestFlight.

## 10. Legal and compliance

- Folio is a tracking tool and does not provide financial advice. This disclaimer must appear on the sign-in screen and in the landing page footer.
- Avoid wording that reads as a recommendation ("you should buy", "best performers to buy").
- Get the final disclaimer, Terms of Service and Privacy Policy reviewed by a lawyer, and check ASIC guidance on general vs personal advice before public launch.
- The App Store requires a privacy policy URL, a completed App Privacy (nutrition label) declaration, and in-app account deletion. Terms and Privacy pages need to exist before the landing page goes live. Check the current App Store Review Guidelines, including the rules for finance apps and third-party sign-in.
- **Trademark:** "Folio" is a common word. Search IP Australia's trademark database and both app stores for existing finance apps named Folio before investing further in the brand.
- Price data licensing: confirm that the chosen provider's licence allows displaying prices to end users in a public app (some tiers are personal-use only). Don't scrape sites whose terms prohibit it. This is a real risk before launch (see Risks).

## 11. Design

- Figma: hi-fi screens for Sign in, Worth, Allocation, Profile, Edit Holdings, Edit Holding and Add Holding. Base Currency onboarding is designed at wireframe level.
- Brand, colour tokens, components, typography and voice are in `CLAUDE.md`. That file is the source of truth for the visual system.
- The design's tab bar has **Worth, Allocation, Profile**. Returns content (chart, top movers) lives on Worth.
- Two elements in the Figma frames are hidden in the MVP: the notification bell on Worth and the Notifications row in Profile. Delete Account needs a design.

## 12. Landing page requirements (Phase 1)

**Goal:** explain Folio in seconds and collect waitlist signups.

**Structure**
1. **Hero:** logo, tagline as headline, one line of supporting copy, waitlist email field with a "Get started" button, phone mockup of the Worth screen.
2. **Three feature blocks**, each with a phone mockup:
   - *One number* (Worth): see your whole net worth at a glance.
   - *See where it sits* (Allocation): by region and sector.
   - *Every currency, converted* (Edit Holdings / Base Currency). Mention ASX-listed stocks and Betashares ETFs are supported.
3. **How it works:** add your holdings, watch your net worth update daily, understand your allocation.
4. **Final call to action.**
5. **Footer:** disclaimer, Terms, Privacy, contact.

**Requirements**
- Mobile-first, responsive, fast, accessible.
- Use the canonical mock data in the appendix so every mockup agrees.
- Waitlist: email field, consent text, success and error states, duplicate email handled gracefully. **[Open]** Provider (own database, Mailchimp, Loops, etc.).
- Don't name competitors. Don't claim returns, ratings, user counts or features that don't exist yet.
- The product is coming to **iPhone first**. Say so; don't imply Android or web app availability. Link to the App Store once live.
- Mockups must match the MVP: no notification bell.
- Include favicon (simplified two-segment ring), social share image and metadata.
- Social features may be mentioned as "coming soon" only if the owner approves.

**Acceptance criteria**
- A visitor can join the waitlist in one step from the hero.
- All required legal pages exist and are linked.
- Passes WCAG AA contrast and works at 360px width and up.

## 13. Milestones

| Milestone | Deliverable |
|---|---|
| M1 | Repo, design tokens, fonts, logo components, base layout |
| M2 | Landing page built with mockups, waitlist working, legal pages in place |
| M3 | Landing page live, name and trademark checks done |
| M4 | iOS app skeleton: auth, base currency, manual holdings CRUD |
| M5 | Choose the price data provider, build the price interface and daily close storage, then the Worth and Allocation screens with real calculations |
| M6 | TestFlight beta with a small group, fix number-accuracy issues |
| M7 | App Store release, then decide on social and notifications |

Dates to be set by the owner.

## 14. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Price data cost or licence blocks a public launch (licensed ASX data can be expensive; free tiers are often personal-use only) | High: core product depends on it | Choose the provider early, confirm display rights in writing, keep a provider-agnostic price interface, store daily closes in your own database |
| Wrong numbers destroy trust | High | One canonical dataset in tests, cent-accurate calculations, reconciliation tests (holdings sum to net worth, percentages sum to 100) |
| Regulatory misinterpretation as advice | High | Disclaimer, neutral copy, lawyer review |
| "Folio" name collision or trademark conflict | Medium | Search early, have a backup name shortlist |
| Solo capacity | Medium | Keep scope tight, landing page first, defer social and notifications |
| App Store review rejection (privacy, sign-in, account deletion, finance-app rules) | Medium | Build account deletion and Sign in with Apple support in from the start, keep the disclaimer visible, check the current guidelines before submitting |
| Manual entry is tedious | Medium | Make the add flow fast, add CSV import later |

## 15. Open questions

Decided on 29 Sep 2026 (no longer open): manual entry only, cost basis at today's FX rate, no notifications in the MVP, native iOS first.

1. **iOS approach:** React Native / Expo (shared monorepo with the landing page) or SwiftUI (separate repo)?
2. **Price data provider and cost:** which one, cost per month (licensed ASX data can be expensive), update times, display-rights licence, and a fallback. If data cost is significant, decide whether Folio needs a paid tier. Until then, a small private beta can run on a free tier or a limited set of tickers. Candidates to evaluate: EODHD (ASX and US), Alpha Vantage (US, free key for development), others.
3. **Intraday vs end-of-day** prices for MVP (assumed end-of-day).
4. **FX rate source** for daily conversion.
5. **Security classification:** where do region and sector for each security come from?
6. **Single average cost vs purchase lots** (assumed single average cost).
7. **Auth methods:** email, Apple, Google? (Apple is required if Google or other third-party sign-in is offered.)
8. **Worst performers:** where do they appear?
9. **Waitlist provider** and email consent wording.
10. **Success metric targets.**
11. **Crypto:** when and how to include it (the Region donut has no crypto slice).
12. **Account deletion:** design and what happens to data.
13. **Social phase:** privacy defaults for sharing portfolios.
14. **Broker linking:** not planned. Revisit only if manual entry proves too much friction.

---

## Appendix A: Canonical mock data

Use this dataset everywhere (mockups, seed data, tests). All values in AUD. Totals reconcile exactly.

| Ticker | Name | Qty | Value | Total return | Region |
|---|---|---|---|---|---|
| TSM | Taiwan Semiconductor | 30 shares | $8,940 | +27.9% | Asia |
| CBA | Commonwealth Bank | 40 shares | $8,560 | +20.4% | Australia |
| VAE | Vanguard FTSE Asia ETF | 100 units | $6,844 | -3.2% | Asia |
| BHP | BHP Group | 170 shares | $6,290 | +6.2% | Australia |
| VAS | Vanguard Australian Shares ETF | 50 units | $5,240 | +8.4% | Australia |
| VOO | Vanguard S&P 500 ETF | 5 units | $4,850 | -1.5% | US |
| NVDA | NVIDIA | 20 shares | $4,210 | +41.3% | US |
| GOOGL | Alphabet | 14 shares | $2,898 | +12.6% | US |

- Net worth: $47,832.15 (VAE's exact value is $6,844.15 so holdings sum to the cent).
- Day change: +$312.40 (+0.66%). The Allocation donut centre shows +0.7%.
- Region split: Australia 42% ($20,090), US 25% ($11,958), Asia 33% ($15,784).
- Top movers: BHP +2.4%, NVDA -1.1%, TSM +3.8%, GOOGL +1.7%.
- Edit example (CBA): quantity 40, average cost $177.74, purchase date 12 Mar 2024.
- Profile mock: Spencer Wong, `spencer.wong@folio.com`, member since March 2026, initials "SW".