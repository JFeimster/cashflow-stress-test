# Cash Flow Stress-Test Copilot

A static launch site and embeddable browser-based companion application for a 13-week small-business cash-flow stress test.

The project uses plain HTML, CSS, and JavaScript. There is no build step, backend, database, paid API, analytics, tracker, or fake chatbot experience.

## Project structure

```text
/
├── README.md
├── vercel.json
└── site/
    ├── index.html
    ├── styles.css
    ├── script.js
    ├── embed.html
    ├── embed.css
    ├── embed.js
    ├── embed-loader.js
    ├── privacy.html
    ├── terms.html
    ├── 404.html
    ├── assets/
    │   ├── favicon.svg
    │   ├── favicon-source.png
    │   ├── logo-mark.svg
    │   ├── og-image.svg
    │   ├── profile-image-1.png
    │   ├── profile-image-2.png
    │   ├── thumbnail-1.png
    │   ├── thumbnail-2.png
    │   └── thumbnail-3.png
    ├── data/
    │   ├── industry-risk-profiles.json
    │   └── sample-scenarios.json
    └── docs/
        └── EMBED.md
```

## Local preview

From the project root:

```bash
python -m http.server 8000 --directory site
```

Open `http://localhost:8000/`.

Do not open the HTML files directly with `file://`; local HTTP serving is required for consistent iframe and JSON behavior.

## Replace the Custom GPT URL

The placeholder is centralized in two configuration objects:

- `site/script.js`
- `site/embed.js`

Replace:

```js
gptUrl: "{{CASH_FLOW_STRESS_TEST_COPILOT_URL}}"
```

with the published Custom GPT URL in both files.

The embed may also receive an approved ChatGPT URL through the URL-encoded `gptUrl` query parameter. Only `chatgpt.com` and `chat.openai.com` URLs are accepted.

## Customize colors and copy

Main-site colors are CSS variables at the top of `site/styles.css`. Embed colors are at the top of `site/embed.css`.

Core marketing copy is in `site/index.html`. Calculator labels and explanatory text are in `site/embed.html`.

The supplied PNG artwork is in `site/assets/`. The project also includes editable SVG favicon, logo mark, and Open Graph art.

## Calculation behavior

The quick baseline creates 13 weeks from typical inflows, typical non-payroll outflows, and the selected payroll schedule. Detailed mode exposes weekly input rows.

The model follows these rules:

- Ending cash equals beginning cash plus total inflows minus total outflows.
- Each week's beginning cash equals the prior week's ending cash.
- Delayed receivables are removed from the original week before being added to the revised week.
- Lost revenue does not reappear.
- Protected revenue is not also counted as lost.
- Baseline payroll is not added again during a closure.
- Repair, rental/outsourcing, capacity loss, recovery work, and insurance are timed separately.
- Insurance proceeds count only in the selected receipt week.
- Available credit is not cash until an intentional working-capital draw is modeled.
- Deferred expenses remain obligations and are added back in their modeled payment week.
- Funding gap equals `max(0, protected minimum - lowest projected cash)`.
- Recovery requires cash to return to or above the protected minimum for two consecutive modeled weeks after the low point.
- Protected-minimum runway and positive-cash runway are calculated separately.
- Sample data is labeled fictional and is not an industry benchmark.

The browser tool is deterministic. It is not the full Custom GPT and does not claim to provide conversational analysis.

## Privacy behavior

By default:

- No financial input is sent over the network.
- No automatic storage occurs.
- No cookies are required.
- No analytics or trackers are enabled.
- No hidden lead capture is present.
- No input is automatically submitted to Moonshine Capital or another party.

The optional **Save this draft on this device** control uses `localStorage` only after explicit opt-in. A visible deletion control is included.

Markdown, CSV, JSON, copy, and print exports are generated in the browser.

## Embedding

See [`site/docs/EMBED.md`](site/docs/EMBED.md) for:

- Basic iframe code
- Responsive resize helper
- Query parameters
- Wix implementation
- WordPress implementation
- Framer, Webflow, Carrd, and custom HTML notes
- Production origin verification

## Vercel deployment

This package is prepared for a static Vercel deployment, but it has not been deployed.

The intended output directory is `site/`. In Vercel project settings:

1. Set **Framework Preset** to **Other**.
2. Leave **Build Command** empty.
3. Set **Output Directory** to `site`.
4. Leave **Install Command** empty.
5. Confirm the production domain before replacing canonical and Open Graph placeholders.

`vercel.json` disables Git deployments by default:

```json
"git": {
  "deploymentEnabled": {
    "*": false,
    "main": false
  }
}
```

Only when an intentional production deployment is authorized, temporarily change:

```json
"main": true
```

After the authorized deployment, return it to:

```json
"main": false
```

Do not enable automatic production deployment casually.

## QA checklist

### Site

- [x] Hero states the audience, outcome, and 13-week mechanism immediately.
- [x] Primary CTA scrolls to the embedded quick stress test.
- [x] Placeholder GPT links are gracefully disabled.
- [x] Lead magnet uses the force-copy URL.
- [x] Scenario buttons load fictional presets into the iframe.
- [x] Responsive layouts remove horizontal page overflow.
- [x] FAQ content and FAQ structured data are generated.
- [x] WebApplication and Breadcrumb structured data are included.
- [x] Compliance language is visible.

### Embed

- [x] Width is capped at 1200 pixels.
- [x] Height is capped at 940 pixels.
- [x] Responsive iframe behavior and resize messages are implemented.
- [x] Quick and detailed baseline modes are present.
- [x] Slow-week, equipment, weather, delayed-receivable, and stacked-shock workflows are present.
- [x] Weekly balances chain from prior ending cash.
- [x] Available credit remains separate until drawn.
- [x] Insurance is counted only in its receipt week.
- [x] Response levers recalculate results.
- [x] Green, Yellow, and Red statuses include text explanations.
- [x] Markdown, CSV, JSON, copy, and print exports are browser-generated.
- [x] Clear All Data and local-draft deletion controls are present.
- [x] No financial input is transmitted by application code.
- [x] GPT URL is centralized in configuration.

### Accessibility and performance

- [x] Semantic headings, labels, landmarks, captions, focus states, and keyboard controls are included.
- [x] Chart data has an accessible table equivalent.
- [x] Calculation results update an `aria-live` screen-reader summary.
- [x] Status is expressed by text as well as color.
- [x] Reduced-motion preferences are respected.
- [x] No framework, blocking third-party script, or required font download is used.

## Known limitations

- The quick tool is a planning calculator, not accounting software, underwriting software, or the full Custom GPT.
- Detailed mode accepts weekly categories but does not import bank or accounting files.
- Payroll coverage is based on modeled payroll weeks and ending cash after all obligations in those weeks.
- “Best response lever” requires user-entered response tests; the quick tool does not optimize every possible operational tradeoff.
- Browser print styling varies by browser.
- The canonical URL and Open Graph image URL remain placeholders until a production domain is approved.
- The Custom GPT URL remains a placeholder until the GPT is published.
- Sample scenarios are fictional and are not benchmarks.

## Compliance

This stress test is a planning tool based on user-provided information and stated assumptions. It does not guarantee funding, eligibility, rates, terms, insurance reimbursement, approval, or financial performance and does not replace professional accounting, tax, legal, lending, insurance, or underwriting judgment.

Moonshine Capital is not a bank.
