(() => {
"use strict";
const CONFIG = {
  productName: "Cash Flow Stress-Test Copilot",
  gptUrl: "{{CASH_FLOW_STRESS_TEST_COPILOT_URL}}",
  leadMagnetUrl: "https://docs.google.com/document/d/1hxSQw3UO06G13ijV90MKtpSjbPgwY6_7SZ5uBSWCg3I/copy",
  moonshineUrl: "https://distilledfunding.com/",
  partnerUrl: "https://tally.so/r/mOe658",
  maxEmbedWidth: 1200,
  maxEmbedHeight: 940
};
const faq = [
["What is a 13-week cash-flow stress test?","A short-horizon planning model that chains weekly beginning cash, inflows, outflows, and ending cash, then applies timed disruptions to show where cash pressure may appear."],
["Is this a loan-approval tool?","No. It does not underwrite, approve, price, or guarantee funding. An estimated gap is a planning figure, not an approved amount."],
["Can I use it without a spreadsheet?","Yes. The quick tool creates a 13-week baseline from typical weekly inputs or lets you edit a detailed weekly model in the browser."],
["What is a protected minimum cash balance?","A business-specific safety threshold the owner wants to preserve for operations. It is not a universal benchmark or lender requirement."],
["What is the difference between lost and delayed revenue?","Lost revenue does not return later. Delayed revenue is removed from its original week and added to a revised collection week."],
["Does the quick tool save my financial data?","Not by default. It calculates locally and makes no backend submission. Device storage is used only after you opt in to save a draft."],
["Can I embed the tool on Wix or WordPress?","Yes. Use the provided iframe and optional resize helper. Keep the container at 100% width, no more than 1200 pixels wide, with a 940-pixel fallback height."],
["Can the tool predict insurance reimbursement?","No. Insurance proceeds count only when you enter an expected amount and modeled receipt week. A filed claim is not cash."],
["How often should I rerun the stress test?","Rerun it when cash balances, collections, payroll, major commitments, equipment status, weather exposure, or response assumptions change."],
["What happens when the model finds a funding gap?","First compare operational and timing levers. When a gap remains, organize documents and review potential working-capital options before the projected shortfall week."]
];

function wireLinks(){
  document.querySelectorAll(".lead-link").forEach(a=>a.href=CONFIG.leadMagnetUrl);
  const placeholder=/\{\{|CASH_FLOW_STRESS_TEST_COPILOT_URL/.test(CONFIG.gptUrl);
  document.querySelectorAll(".gpt-link").forEach(a=>{
    if(placeholder){
      a.removeAttribute("href");
      a.setAttribute("aria-disabled","true");
      a.addEventListener("click",e=>e.preventDefault());
      a.classList.add("is-disabled");
    } else a.href=CONFIG.gptUrl;
  });
  document.querySelectorAll(".gpt-status").forEach(el=>el.hidden=!placeholder);
}
function renderFaq(){
  const list=document.getElementById("faqList");
  list.innerHTML=faq.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join("");
  document.getElementById("faqSchema").textContent=JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity":faq.map(([q,a])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))
  });
}
function loadScenario(name){
  const frame=document.getElementById("cash-flow-stress-test");
  document.getElementById("quick-test").scrollIntoView({behavior:"smooth"});
  const send=()=>frame.contentWindow?.postMessage({type:"cash-flow-stress-test:load-scenario",scenario:name},"*");
  if(frame.contentWindow)send(); else frame.addEventListener("load",send,{once:true});
}
document.querySelectorAll("[data-scenario]").forEach(btn=>btn.addEventListener("click",()=>loadScenario(btn.dataset.scenario)));
window.addEventListener("message",event=>{
  if(event.data?.type!=="cash-flow-stress-test:resize")return;
  const frame=document.getElementById("cash-flow-stress-test");
  const nextHeight=Math.min(CONFIG.maxEmbedHeight,Math.max(620,Number(event.data.height)||CONFIG.maxEmbedHeight));
  frame.style.height=`${nextHeight}px`;
});
wireLinks();
renderFaq();
})();