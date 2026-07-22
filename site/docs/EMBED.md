# Embedding the Quick Stress Test

The embeddable app is `site/embed.html`. It is static, responsive, local-browser only, and does not require a backend.

## Basic embed

```html
<div id="cash-flow-stress-test-wrap"
     style="width:100%;max-width:1200px;margin:0 auto;">
  <iframe
    id="cash-flow-stress-test"
    src="https://YOUR-DOMAIN.vercel.app/embed.html"
    title="Cash Flow Stress-Test Copilot"
    loading="lazy"
    allow="clipboard-write"
    style="display:block;width:100%;height:940px;max-height:940px;border:0;">
  </iframe>
</div>
```

## Responsive auto-resize

Paste this after the iframe, or load `embed-loader.js`.

```html
<script>
const frame = document.getElementById("cash-flow-stress-test");

window.addEventListener("message", (event) => {
  if (event.data?.type !== "cash-flow-stress-test:resize") return;

  // Recommended after deployment:
  // if (event.origin !== "https://YOUR-DOMAIN.vercel.app") return;

  const nextHeight = Math.min(
    940,
    Math.max(620, Number(event.data.height) || 940)
  );

  frame.style.height = `${nextHeight}px`;
});
</script>
```

The child uses `ResizeObserver` and sends:

```js
window.parent.postMessage({
  type: "cash-flow-stress-test:resize",
  height: document.documentElement.scrollHeight
}, "*");
```

The requested height is capped at 940 pixels. The wrapper should never exceed 1200 pixels wide.

## Query parameters

| Parameter | Values | Example |
|---|---|---|
| `theme` | `light`, `dark` | `?theme=dark` |
| `compact` | `0`, `1` | `?compact=1` |
| `scenario` | `contractor`, `restaurant`, `clinic`, `retail`, `repair` | `?scenario=restaurant` |
| `branding` | `full`, `minimal` | `?branding=minimal` |
| `gptUrl` | URL-encoded ChatGPT URL | `?gptUrl=https%3A...` |

The `gptUrl` parameter accepts only `https://chatgpt.com/` or `https://chat.openai.com/` URLs. Query parameters are never inserted as arbitrary HTML.

## Wix

1. Add an **Embed Code** or **HTML iframe** element.
2. Paste the iframe code.
3. Set the container width to 100%.
4. Set the maximum width to 1200 pixels.
5. Set the fallback height to 940 pixels.
6. Paste the resize script when Wix permits it; otherwise keep the 940-pixel fallback.
7. Test desktop, tablet, and mobile.
8. Do not place the embed inside a container that clips overflow.

## WordPress

1. Add a **Custom HTML** block.
2. Paste the wrapper, iframe, and resize script.
3. Confirm the theme does not force an iframe width.
4. Add the deployed domain to any Content Security Policy allowlist.
5. Test page caching and lazy loading.
6. Do not use a plugin that strips the resize script unless you retain a 940-pixel fallback height.

## Framer, Webflow, Carrd, and custom HTML

Use the platform's embed/custom-code element. Paste the basic iframe. Add the resize script in a page-level custom-code area when the platform permits scripts. Keep width at 100%, maximum width at 1200 pixels, and fallback height at 940 pixels.

## Security hardening after deployment

Set `ALLOWED_ORIGIN` in `embed-loader.js` to the exact deployed origin. The child currently posts resize messages to `"*"` for broad embed compatibility; the parent should verify the sender origin in production.
