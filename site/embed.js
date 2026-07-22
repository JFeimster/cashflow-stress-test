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

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const money = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(Number(n)||0);
const num = id => Math.max(0, Number($("#"+id)?.value)||0);
const week = id => Math.min(13, Math.max(1, Math.round(num(id)||1)));
const clone = value => JSON.parse(JSON.stringify(value));
const WEEKS = 13;
let activeShockType = "slow";
let stackedShocks = [];
let model = null;
let responseModel = null;

const detailedRows = [
  ["cashSales","Cash sales"],
  ["receivables","Receivables collected"],
  ["deposits","Deposits"],
  ["otherInflows","Other inflows"],
  ["payroll","Payroll"],
  ["rent","Rent / occupancy"],
  ["suppliers","Suppliers / inventory"],
  ["debt","Debt / equipment payments"],
  ["taxes","Taxes / insurance"],
  ["otherOutflows","Other outflows"]
];

function initDetailedEditor() {
  const body = $("#weeklyEditorBody");
  detailedRows.forEach(([key,label]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th scope="row">${label}</th>` + Array.from({length:WEEKS},(_,i)=>`<td><input aria-label="${label}, week ${i+1}" data-row="${key}" data-week="${i}" type="number" min="0" step="100" value="0"></td>`).join("");
    body.appendChild(tr);
  });
  seedDetailed();
}

function seedDetailed() {
  const inflow = num("weeklyInflows") || 28000;
  const outflow = num("weeklyOutflows") || 17350;
  const payroll = num("payrollAmount") || 14500;
  const frequency = Number($("#payrollFrequency")?.value)||2;
  const start = week("payrollStart");
  $$("[data-row]").forEach(input => {
    const row = input.dataset.row;
    const w = Number(input.dataset.week)+1;
    let value = 0;
    if (row === "cashSales") value = inflow;
    if (row === "rent") value = Math.round(outflow * .22);
    if (row === "suppliers") value = Math.round(outflow * .45);
    if (row === "debt") value = Math.round(outflow * .12);
    if (row === "taxes") value = Math.round(outflow * .10);
    if (row === "otherOutflows") value = outflow - Math.round(outflow*.22)-Math.round(outflow*.45)-Math.round(outflow*.12)-Math.round(outflow*.10);
    if (row === "payroll" && w >= start && (w-start)%frequency===0) value = payroll;
    input.value = value;
  });
}

function buildBaseline() {
  const current = num("currentCash");
  const detailed = $("#detailedToggle").checked;
  const weeks = Array.from({length:WEEKS}, (_,i)=>({
    week:i+1, beginning:0, inflows:0, outflows:0, ending:0,
    items:{inflows:{},outflows:{}}
  }));
  if (!detailed) {
    const inflow = num("weeklyInflows");
    const regularOut = num("weeklyOutflows");
    const payroll = num("payrollAmount");
    const frequency = Number($("#payrollFrequency").value)||2;
    const start = week("payrollStart");
    weeks.forEach(w => {
      w.items.inflows.cashSales = inflow;
      w.items.outflows.regular = regularOut;
      w.items.outflows.payroll = w.week >= start && (w.week-start)%frequency===0 ? payroll : 0;
    });
  } else {
    detailedRows.forEach(([key]) => {
      $$(`[data-row="${key}"]`).forEach(input => {
        const w = weeks[Number(input.dataset.week)];
        const value = Math.max(0,Number(input.value)||0);
        if (["cashSales","receivables","deposits","otherInflows"].includes(key)) w.items.inflows[key]=value;
        else w.items.outflows[key]=value;
      });
    });
  }
  reconcile(weeks,current);
  return weeks;
}

function reconcile(weeks, startCash) {
  let opening = startCash;
  weeks.forEach(w => {
    w.beginning = opening;
    w.inflows = Object.values(w.items.inflows).reduce((a,b)=>a+(Number(b)||0),0);
    w.outflows = Object.values(w.items.outflows).reduce((a,b)=>a+(Number(b)||0),0);
    w.ending = w.beginning + w.inflows - w.outflows;
    opening = w.ending;
  });
}

function currentShock() {
  if (activeShockType === "slow") return {
    type:"slow", label:"Slow week", start:week("slowStart"), duration:week("slowDuration"),
    decline:num("slowDecline"), unit:$("#slowDeclineUnit").value, classification:$("#slowClass").value,
    recoveryWeek:week("slowRecoveryWeek"), recoveryCost:num("slowRecoveryCost")
  };
  if (activeShockType === "equipment") return {
    type:"equipment", label:"Broken equipment", failureWeek:week("equipWeek"), repairCost:num("repairCost"),
    repairPayWeek:week("repairPayWeek"), downtime:week("downtimeWeeks"), revenueRisk:num("equipRevenueRisk"),
    protectedPct:num("protectedCapacity"), rentalCost:num("rentalCost"), rentalWeek:week("rentalWeek"),
    delayedWork:num("delayedWork"), recoveryWeek:week("equipRecoveryWeek"), overtimeCost:num("overtimeCost"),
    insurance:num("equipInsurance"), insuranceWeek:week("equipInsuranceWeek")
  };
  if (activeShockType === "weather") return {
    type:"weather", label:"Weather closure", closureWeek:week("weatherWeek"), closedDays:num("closedDays"),
    revenuePerDay:num("revenuePerDay"), protectedPct:num("weatherProtected"), delayedRevenue:num("weatherDelayed"),
    revisedWeek:week("weatherDelayedWeek"), spoilage:num("spoilage"), cleanup:num("cleanup"),
    reopenCost:num("reopenCost"), reopenWeek:week("reopenWeek"), insurance:num("weatherInsurance"),
    insuranceWeek:week("weatherInsuranceWeek")
  };
  return {type:"receivable",label:"Delayed receivable",amount:num("arAmount"),originalWeek:week("arOriginalWeek"),revisedWeek:week("arRevisedWeek")};
}

function addInflow(weeks,w,key,amount){ if(w<1||w>13||!amount)return; weeks[w-1].items.inflows[key]=(weeks[w-1].items.inflows[key]||0)+amount; }
function addOutflow(weeks,w,key,amount){ if(w<1||w>13||!amount)return; weeks[w-1].items.outflows[key]=(weeks[w-1].items.outflows[key]||0)+amount; }
function removeInflow(weeks,w,key,amount) {
  if(w<1||w>13||!amount)return;
  const target=weeks[w-1];
  const available=Object.values(target.items.inflows).reduce((a,b)=>a+(Number(b)||0),0);
  target.items.inflows[key]=(target.items.inflows[key]||0)-Math.min(amount,available);
}

function applyShock(weeks, shock) {
  const notes=[];
  if (shock.type==="slow") {
    for(let w=shock.start; w<shock.start+shock.duration && w<=13; w++){
      const baselineInflow=Object.values(weeks[w-1].items.inflows).reduce((a,b)=>a+(Number(b)||0),0);
      const reduction=shock.unit==="percent" ? baselineInflow*(shock.decline/100) : shock.decline;
      if(shock.classification==="lost") removeInflow(weeks,w,"slowWeekLoss",-0 + reduction);
      if(shock.classification==="delayed"){
        removeInflow(weeks,w,"slowWeekDelay",reduction);
        addInflow(weeks,Math.min(13,shock.recoveryWeek),"delayedRevenueRecovered",reduction);
      }
      if(shock.classification==="mixed"){
        removeInflow(weeks,w,"slowWeekMixed",reduction);
        addInflow(weeks,Math.min(13,shock.recoveryWeek),"delayedRevenueRecovered",reduction/2);
      }
    }
    addOutflow(weeks,shock.recoveryWeek,"recoveryCost",shock.recoveryCost);
    notes.push("Lost revenue does not reappear; delayed revenue returns only in the selected recovery week.");
  }
  if (shock.type==="equipment") {
    addOutflow(weeks,shock.repairPayWeek,"repairCost",shock.repairCost);
    for(let w=shock.failureWeek;w<shock.failureWeek+shock.downtime&&w<=13;w++){
      const loss=shock.revenueRisk*(1-Math.min(100,shock.protectedPct)/100);
      removeInflow(weeks,w,"equipmentRevenueLoss",loss);
    }
    addOutflow(weeks,shock.rentalWeek,"rentalOrOutsourcing",shock.rentalCost);
    addInflow(weeks,shock.recoveryWeek,"delayedWorkRecovered",shock.delayedWork);
    addOutflow(weeks,shock.recoveryWeek,"overtimeRecovery",shock.overtimeCost);
    addInflow(weeks,shock.insuranceWeek,"insuranceProceedsReceived",shock.insurance);
    notes.push("Repair, rental, lost capacity, recovery work, and insurance are timed separately.");
  }
  if (shock.type==="weather") {
    const gross=shock.closedDays*shock.revenuePerDay;
    const protectedAmt=gross*Math.min(100,shock.protectedPct)/100;
    const disruption=Math.max(0,gross-protectedAmt);
    const delayed=Math.min(disruption,shock.delayedRevenue);
    const lost=Math.max(0,disruption-delayed);
    removeInflow(weeks,shock.closureWeek,"weatherLostAndDelayed",lost+delayed);
    addInflow(weeks,shock.revisedWeek,"weatherDelayedRecovered",delayed);
    addOutflow(weeks,shock.closureWeek,"spoilage",shock.spoilage);
    addOutflow(weeks,shock.closureWeek,"cleanupTemporary",shock.cleanup);
    addOutflow(weeks,shock.reopenWeek,"reopeningCost",shock.reopenCost);
    addInflow(weeks,shock.insuranceWeek,"insuranceProceedsReceived",shock.insurance);
    notes.push("Baseline payroll is not duplicated. Insurance counts only in its modeled receipt week.");
  }
  if (shock.type==="receivable") {
    removeInflow(weeks,shock.originalWeek,"receivableMoved",shock.amount);
    addInflow(weeks,shock.revisedWeek,"receivableRescheduled",shock.amount);
    notes.push("The receivable is moved, not duplicated.");
  }
  return notes;
}

function metricsFor(baseline, stress) {
  const protectedMin=num("protectedMin"), buffer=num("safetyBuffer");
  const endings=stress.map(w=>w.ending);
  const low=Math.min(...endings), lowIndex=endings.indexOf(low);
  const firstBelow=endings.findIndex(v=>v<protectedMin);
  const firstNegative=endings.findIndex(v=>v<0);
  const payrollWeeks=stress.filter(w=>(w.items.outflows.payroll||0)>0);
  let covered=0, vulnerable=null;
  for(const w of payrollWeeks){ if(w.ending>=0) covered++; else {vulnerable=w.week; break;} }
  let recovery=null;
  for(let i=lowIndex+1;i<12;i++) if(endings[i]>=protectedMin&&endings[i+1]>=protectedMin){ recovery=i+1; break; }
  const gap=Math.max(0,protectedMin-low);
  const status = firstNegative>=0 ? "red" : (firstBelow>=0 || payrollWeeks.some(w=>w.ending<protectedMin)) ? "yellow" : endings.every(v=>v>=protectedMin+buffer) ? "green" : "yellow";
  const pressure={};
  stress.forEach((w,i)=>{
    const b=baseline[i];
    Object.entries(w.items.outflows).forEach(([k,v])=>{const delta=(v||0)-(b.items.outflows[k]||0);if(delta>0)pressure[k]=(pressure[k]||0)+delta});
    Object.entries(w.items.inflows).forEach(([k,v])=>{const delta=(b.items.inflows[k]||0)-(v||0);if(delta>0)pressure[k]=(pressure[k]||0)+delta});
  });
  const driver=Object.entries(pressure).sort((a,b)=>b[1]-a[1])[0]?.[0]||"No modeled pressure";
  return {
    lowestCash:low, lowWeek:lowIndex+1, firstBelow:firstBelow<0?null:firstBelow+1, firstNegative:firstNegative<0?null:firstNegative+1,
    protectedRunway:firstBelow<0?"13+ weeks":`${firstBelow} weeks`, positiveRunway:firstNegative<0?"13+ weeks":`${firstNegative} weeks`,
    payrollCoverage:`${covered} cycle${covered===1?"":"s"}`, vulnerablePayroll:vulnerable, fundingGap:gap,
    recovery:recovery?`Week ${recovery}`:"Not recovered in 13 weeks", driver:humanize(driver), status
  };
}
function humanize(s){return String(s).replace(/([A-Z])/g," $1").replace(/[_-]/g," ").replace(/^./,m=>m.toUpperCase())}

function runModel() {
  const baseline=buildBaseline();
  const stress=clone(baseline);
  const shocks=[...stackedShocks,currentShock()];
  const notes=shocks.flatMap(s=>applyShock(stress,s));
  reconcile(stress,num("currentCash"));
  const metrics=metricsFor(baseline,stress);
  model={createdAt:new Date().toISOString(),businessType:$("#businessType").value,baseline,stress,shocks,notes,metrics,
    assumptions:["Forecast horizon is 13 weeks.","Inputs are user-provided or fictional sample values.","Available credit is not cash until intentionally drawn.","A filed insurance claim is not cash."]};
  responseModel=null;
  renderResults(model);
  go(3);
  saveIfOpted();
}

function renderResults(m) {
  const x=m.metrics;
  const cards=[
    ["Lowest projected cash",money(x.lowestCash)],["Week of lowest cash",`Week ${x.lowWeek}`],
    ["First week below minimum",x.firstBelow?`Week ${x.firstBelow}`:"Not in horizon"],
    ["Protected-minimum runway",x.protectedRunway],["Positive-cash runway",x.positiveRunway],
    ["Payroll coverage",x.vulnerablePayroll?`${x.payrollCoverage}; risk W${x.vulnerablePayroll}`:x.payrollCoverage],
    ["Estimated funding gap",money(x.fundingGap)]
  ];
  $("#scoreGrid").innerHTML=cards.map(([a,b])=>`<article class="score"><span>${a}</span><strong>${b}</strong></article>`).join("");
  $("#recoveryOutput").textContent=x.recovery; $("#driverOutput").textContent=x.driver;
  $("#leverOutput").textContent=x.fundingGap>0?"Test timing and operating levers":"Preserve the current buffer";
  const zone=$("#resultStatus"); zone.textContent=x.status.toUpperCase(); zone.className=`big-zone ${x.status}`;
  setStatus(x.status, x.status==="green"?"Cash remains above the safety threshold":x.status==="yellow"?"Cash or payroll comfort narrows":"Negative cash or no recovery inside horizon");
  $("#resultsBody").innerHTML=m.stress.map((w,i)=>`<tr><th>Week ${w.week}</th><td>${money(w.beginning)}</td><td>${money(m.baseline[i].ending)}</td><td>${money(w.ending)}</td><td>${zoneFor(w.ending)}</td></tr>`).join("");
  $("#srSummary").textContent=`${x.status.toUpperCase()} result. Lowest projected cash ${money(x.lowestCash)} in week ${x.lowWeek}. Estimated funding gap ${money(x.fundingGap)}.`;
  drawChart(m.baseline,m.stress);
}
function zoneFor(v){return v<0?"Red — negative":v<num("protectedMin")?"Yellow — below minimum":v>=num("protectedMin")+num("safetyBuffer")?"Green — buffered":"Yellow — narrow buffer"}
function setStatus(zone,text){const chip=$("#statusChip");chip.dataset.zone=zone;chip.innerHTML=`<strong>${zone.toUpperCase()}</strong><span>${text}</span>`}

function drawChart(baseline,stress) {
  const svg=$("#cashChart"), width=900,height=320,pad=48, min=Math.min(0,num("protectedMin"),...baseline.map(x=>x.ending),...stress.map(x=>x.ending)), max=Math.max(num("protectedMin")+num("safetyBuffer"),...baseline.map(x=>x.ending),...stress.map(x=>x.ending));
  const x=i=>pad+i*((width-pad*2)/12), y=v=>height-pad-(v-min)/(max-min||1)*(height-pad*2);
  const path=arr=>arr.map((w,i)=>`${i?"L":"M"}${x(i).toFixed(1)} ${y(w.ending).toFixed(1)}`).join(" ");
  const protectedY=y(num("protectedMin")), zeroY=y(0), lowI=stress.map(w=>w.ending).indexOf(Math.min(...stress.map(w=>w.ending)));
  svg.innerHTML=`<title>13-week cash balance chart</title><desc>Baseline cash, stressed cash, protected minimum, negative region, and lowest week.</desc>
    <rect x="${pad}" y="${zeroY}" width="${width-pad*2}" height="${Math.max(0,height-pad-zeroY)}" fill="#ff5c5c" opacity=".18"/>
    ${Array.from({length:13},(_,i)=>`<line x1="${x(i)}" y1="${pad}" x2="${x(i)}" y2="${height-pad}" stroke="#bbb" stroke-width="1"/><text x="${x(i)}" y="${height-16}" font-size="12" text-anchor="middle">W${i+1}</text>`).join("")}
    <line x1="${pad}" y1="${protectedY}" x2="${width-pad}" y2="${protectedY}" stroke="#ff9f00" stroke-width="3" stroke-dasharray="8 6"/><text x="${width-pad}" y="${protectedY-7}" text-anchor="end" font-size="13">Protected minimum</text>
    <path d="${path(baseline)}" fill="none" stroke="#6ea8ff" stroke-width="5"/><path d="${path(stress)}" fill="none" stroke="#0b0b0b" stroke-width="6"/>
    <circle cx="${x(lowI)}" cy="${y(stress[lowI].ending)}" r="9" fill="#ff5c5c" stroke="#0b0b0b" stroke-width="3"/>
    <g font-size="13"><rect x="${pad}" y="10" width="14" height="5" fill="#6ea8ff"/><text x="${pad+20}" y="17">Baseline</text><rect x="${pad+105}" y="10" width="14" height="5" fill="#0b0b0b"/><text x="${pad+125}" y="17">Stress</text></g>`;
}

function applyLevers() {
  if(!model) runModel();
  const stress=clone(model.stress);
  const available=num("availableCredit");
  const credit=Math.min(num("leverCredit"),available);
  addInflow(stress,week("leverARWeek"),"acceleratedReceivables",num("leverAR"));
  addInflow(stress,1,"newDeposits",num("leverDeposits"));
  const savings=num("leverFreeze")+num("leverOwner")+num("leverPurchase");
  if(savings) addInflow(stress,1,"avoidedOrDeferredOutflow",savings);
  if(num("leverSupplier")) { addInflow(stress,1,"supplierTimingRelief",num("leverSupplier")); addOutflow(stress,8,"supplierPaymentDeferred",num("leverSupplier")); }
  addInflow(stress,1,"reserveTransfer",Math.min(num("leverReserve"),num("reserveCash")));
  addInflow(stress,1,"workingCapitalDraw",credit);
  reconcile(stress,num("currentCash"));
  const metrics=metricsFor(model.baseline,stress);
  responseModel={...model,stress,metrics,response:{acceleratedReceivables:num("leverAR"),newDeposits:num("leverDeposits"),expenseFreeze:num("leverFreeze"),ownerDistributionReduction:num("leverOwner"),supplierTiming:num("leverSupplier"),delayedPurchase:num("leverPurchase"),reserveTransfer:Math.min(num("leverReserve"),num("reserveCash")),workingCapitalDraw:credit}};
  const improvement=metrics.lowestCash-model.metrics.lowestCash;
  const gapReduction=model.metrics.fundingGap-metrics.fundingGap;
  $("#responseSummary").innerHTML=`<h3>${metrics.status.toUpperCase()} after modeled responses</h3><p><strong>New lowest cash:</strong> ${money(metrics.lowestCash)} &nbsp; <strong>New funding gap:</strong> ${money(metrics.fundingGap)}</p><p><strong>Lowest-cash improvement:</strong> ${money(improvement)} &nbsp; <strong>Gap reduction:</strong> ${money(gapReduction)}</p><p><strong>Tradeoff:</strong> Deferred supplier payments remain obligations. Reserve transfers reduce the separate reserve. A working-capital draw creates a financing obligation and is not an approval recommendation.</p>`;
  saveIfOpted();
}

function reportText(m=model) {
  if(!m)return "Run the stress test first.";
  const use=responseModel||m, x=use.metrics;
  return `# Cash Flow Stress-Test Summary

Prepared: ${new Date().toLocaleString()}
Business type: ${m.businessType}
Forecast period: 13 weeks

## Seven Key Numbers
- Lowest projected cash: ${money(x.lowestCash)}
- Week of lowest cash: Week ${x.lowWeek}
- First week below protected minimum: ${x.firstBelow ? "Week "+x.firstBelow : "Not within horizon"}
- Protected-minimum runway: ${x.protectedRunway}
- Positive-cash runway: ${x.positiveRunway}
- Payroll coverage: ${x.payrollCoverage}${x.vulnerablePayroll ? "; first vulnerable payroll Week "+x.vulnerablePayroll : ""}
- Estimated funding gap: ${money(x.fundingGap)}

## Decision Outputs
- Status: ${x.status.toUpperCase()}
- Recovery: ${x.recovery}
- Primary cash-pressure driver: ${x.driver}
- Best response lever: ${$("#leverOutput").textContent}

## Assumptions and Boundaries
${m.assumptions.map(x=>"- "+x).join("\n")}

This stress test is a planning tool based on user-provided information and stated assumptions. It does not guarantee funding, eligibility, rates, terms, insurance reimbursement, approval, or financial performance and does not replace professional accounting, tax, legal, lending, insurance, or underwriting judgment.

Moonshine Capital is not a bank.`;
}
function download(name,type,text){const blob=new Blob([text],{type});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function csvText(){
  const m=responseModel||model;if(!m)return "";
  return ["week,beginning_cash,baseline_ending_cash,stress_ending_cash,status",...m.stress.map((w,i)=>[w.week,w.beginning,m.baseline[i].ending,w.ending,zoneFor(w.ending)].map(v=>`"${String(v).replaceAll('"','""')}"`).join(","))].join("\n");
}
function structuredOutput(){
  const m=responseModel||model;if(!m)return {};
  return {schema_name:"cash_flow_stress_test_output",schema_version:"1.0.0",metadata:{created_at:new Date().toISOString(),forecast_horizon_weeks:13,currency:"USD"},business_profile:{business_type:m.businessType,protected_minimum_cash:num("protectedMin"),green_safety_buffer:num("safetyBuffer"),available_reserve_cash:num("reserveCash"),available_credit:num("availableCredit")},seven_key_numbers:m.metrics,weekly_results:m.stress,scenarios:model.shocks,response_levers:responseModel?.response||{},assumptions:model.assumptions,disclaimer:"Planning tool only; no funding or performance guarantee. Moonshine Capital is not a bank."};
}

function go(n){
  $$(".panel").forEach(p=>p.classList.toggle("is-active",Number(p.dataset.panel)===Number(n)));
  $$(".step").forEach(s=>s.classList.toggle("is-active",Number(s.dataset.step)===Number(n)));
  $("#app").scrollTop=0; postHeight();
}
function renderShockList(){
  $("#shockList").innerHTML=stackedShocks.length?stackedShocks.map((s,i)=>`<span class="shock-pill">${s.label}<button aria-label="Remove ${s.label}" data-remove-shock="${i}">×</button></span>`).join(""):'<p class="muted">Current shock will be included. Use “Stack another” to preserve it and add another.</p>';
}
function saveIfOpted(){
  if($("#saveDraft").checked) localStorage.setItem("cashFlowStressTestDraft",JSON.stringify({inputs:Object.fromEntries($$("input,select").filter(x=>x.id&&x.type!=="file").map(x=>[x.id,x.type==="checkbox"?x.checked:x.value])),stackedShocks,model,responseModel}));
}
function restoreDraft(){
  const raw=localStorage.getItem("cashFlowStressTestDraft");if(!raw)return;
  try{const d=JSON.parse(raw);Object.entries(d.inputs||{}).forEach(([id,v])=>{const el=$("#"+id);if(el)el.type==="checkbox"?el.checked=v:el.value=v});stackedShocks=d.stackedShocks||[];model=d.model||null;responseModel=d.responseModel||null;renderShockList();if(model)renderResults(responseModel||model)}catch{}
}
function postHeight(){requestAnimationFrame(()=>window.parent.postMessage({type:"cash-flow-stress-test:resize",height:Math.min(CONFIG.maxEmbedHeight,document.documentElement.scrollHeight)},"*"))}

function loadPreset(name){
  const presets={
    contractor:{businessType:"Contractor / trades",currentCash:42000,protectedMin:18000,safetyBuffer:5000,weeklyInflows:28000,weeklyOutflows:17350,payrollAmount:14500,payrollFrequency:2,payrollStart:2,type:"equipment"},
    restaurant:{businessType:"Restaurant / hospitality",currentCash:30000,protectedMin:15000,safetyBuffer:4000,weeklyInflows:36000,weeklyOutflows:26000,payrollAmount:9000,payrollFrequency:1,payrollStart:1,type:"weather"},
    clinic:{businessType:"Clinic / appointments",currentCash:52000,protectedMin:24000,safetyBuffer:6000,weeklyInflows:42000,weeklyOutflows:26500,payrollAmount:12000,payrollFrequency:2,payrollStart:2,type:"receivable"},
    retail:{businessType:"Retail",currentCash:26000,protectedMin:14000,safetyBuffer:3500,weeklyInflows:24000,weeklyOutflows:17000,payrollAmount:6500,payrollFrequency:2,payrollStart:2,type:"slow"},
    repair:{businessType:"Repair shop",currentCash:34000,protectedMin:16000,safetyBuffer:4000,weeklyInflows:30000,weeklyOutflows:19000,payrollAmount:9000,payrollFrequency:2,payrollStart:2,type:"equipment"}
  };
  const p=presets[name];if(!p)return;
  Object.entries(p).forEach(([id,v])=>{if(id!=="type"&&$("#"+id))$("#"+id).value=v});
  activateShock(p.type); seedDetailed(); go(2);
}
function activateShock(type){
  activeShockType=type;
  $$(".shock-tab").forEach(t=>t.classList.toggle("is-active",t.dataset.shock===type));
  $$(".shock-form").forEach(f=>f.classList.toggle("is-active",f.dataset.shockForm===type));
}

document.addEventListener("click",e=>{
  const next=e.target.closest("[data-next]");if(next)go(next.dataset.next);
  const prev=e.target.closest("[data-prev]");if(prev)go(prev.dataset.prev);
  const step=e.target.closest(".step");if(step)go(step.dataset.step);
  const tab=e.target.closest(".shock-tab");if(tab)activateShock(tab.dataset.shock);
  const remove=e.target.closest("[data-remove-shock]");if(remove){stackedShocks.splice(Number(remove.dataset.removeShock),1);renderShockList()}
});
$("#detailedToggle").addEventListener("change",e=>{$("#quickBaseline").hidden=e.target.checked;$("#detailedBaseline").hidden=!e.target.checked;if(e.target.checked)seedDetailed()});
$("#addShock").addEventListener("click",()=>{stackedShocks.push(currentShock());renderShockList()});
$("#runModel").addEventListener("click",runModel);
$("#applyLevers").addEventListener("click",applyLevers);
$("#downloadReport").addEventListener("click",()=>download("cash-flow-stress-test-report.md","text/markdown",reportText()));
$("#downloadCsv").addEventListener("click",()=>download("cash-flow-weekly-results.csv","text/csv",csvText()));
$("#downloadJson").addEventListener("click",()=>download("cash-flow-stress-test.json","application/json",JSON.stringify(structuredOutput(),null,2)));
$("#copySummary").addEventListener("click",async()=>{await navigator.clipboard.writeText(reportText());$("#copySummary span").textContent="Copied to clipboard"});
$("#printReport").addEventListener("click",()=>window.print());
$("#clearData").addEventListener("click",()=>{if(confirm("Clear all entered data and reset the quick stress test?")){localStorage.removeItem("cashFlowStressTestDraft");location.reload()}});
$("#deleteDraft").addEventListener("click",()=>{localStorage.removeItem("cashFlowStressTestDraft");$("#saveDraft").checked=false;alert("Local draft deleted.")});
$("#saveDraft").addEventListener("change",e=>{if(e.target.checked)saveIfOpted();else localStorage.removeItem("cashFlowStressTestDraft")});
$$("input,select").forEach(el=>el.addEventListener("change",saveIfOpted));

const params=new URLSearchParams(location.search);
if(params.get("theme")==="dark")document.documentElement.style.setProperty("--paper","#151515");
if(params.get("compact")==="1")document.body.classList.add("compact");
if(params.get("branding")==="minimal")$(".embed-head").style.display="none";
const queryGpt=params.get("gptUrl");
if(queryGpt && /^https:\/\/(chatgpt\.com|chat\.openai\.com)\//i.test(queryGpt)) CONFIG.gptUrl=queryGpt;
const isPlaceholder=/\{\{|CASH_FLOW_STRESS_TEST_COPILOT_URL/.test(CONFIG.gptUrl);
if(isPlaceholder){$("#openCopilot").hidden=true;$("#copilotSoon").hidden=false}else $("#openCopilot").href=CONFIG.gptUrl;
initDetailedEditor();restoreDraft();if(params.get("scenario"))loadPreset(params.get("scenario"));
window.addEventListener("message",e=>{if(e.data?.type==="cash-flow-stress-test:load-scenario")loadPreset(String(e.data.scenario||""))});
new ResizeObserver(postHeight).observe(document.documentElement);postHeight();
})();