(() => {
"use strict";
const frame = document.getElementById("cash-flow-stress-test");
if (!frame) return;

const MAX_HEIGHT = 940;
const MIN_HEIGHT = 620;
const ALLOWED_ORIGIN = ""; // Optional: set to your deployed embed origin.

window.addEventListener("message", (event) => {
  if (event.data?.type !== "cash-flow-stress-test:resize") return;
  if (ALLOWED_ORIGIN && event.origin !== ALLOWED_ORIGIN) return;

  const nextHeight = Math.min(
    MAX_HEIGHT,
    Math.max(MIN_HEIGHT, Number(event.data.height) || MAX_HEIGHT)
  );

  frame.style.width = "100%";
  frame.style.maxWidth = "1200px";
  frame.style.height = `${nextHeight}px`;
});
})();