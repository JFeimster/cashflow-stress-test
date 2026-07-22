# Stress-Test Scenario Methodology

## Purpose

This file defines the operating methodology used by **Cash Flow Stress-Test Copilot** to build a 13-week baseline, apply individual shocks, combine stacked disruptions, measure recovery, test response levers, and produce decision-ready outputs.

The methodology is designed for local businesses such as contractors, trades businesses, restaurants, clinics, agencies, repair shops, retailers, and other operators with payroll, fixed obligations, receivables, equipment dependencies, or location-based risk.

> A stress test is not a prediction. It is a controlled planning exercise that shows how stated assumptions could affect cash timing and operating decisions.

---

# 1. Methodology Overview

Use this sequence:

1. Define the business and forecast horizon.
2. Build and reconcile the 13-week baseline.
3. Define one disruption in operational terms.
4. Translate the disruption into weekly cash-flow changes.
5. Run the individual scenario.
6. Repeat for each additional individual scenario.
7. Build the stacked-shock scenario.
8. Identify the lowest cash point, warning week, runway, payroll risk, funding gap, and recovery timing.
9. Test operational response levers.
10. Create green, yellow, and red triggers.
11. Prepare a funding-document checklist when a real gap remains.
12. Produce a lender or advisor summary when requested.

---

# 2. Phase One — Define the Business Context

Collect or confirm:

- Business type and operating model
- Current available business cash
- Protected minimum cash balance
- Optional safety buffer
- Payroll schedule and amount
- Primary fixed obligations
- Accounts receivable and expected collection dates
- Reserve cash
- Available credit, kept separate from cash
- Equipment, location, supplier, customer, and weather dependencies
- Known seasonal patterns
- Forecast start date

## Data Hierarchy

Use data in this order of preference:

1. Reconciled actual business cash and recent cleared activity
2. User-approved weekly forecast
3. Current receivable and obligation schedules
4. User-approved estimates
5. Clearly labeled fictional or illustrative assumptions

Do not silently substitute generic industry assumptions for missing business data.

---

# 3. Phase Two — Build the 13-Week Baseline

## Step 1: Set Week 1 Beginning Cash

Week 1 beginning cash must equal current available business cash approved by the user.

Do not include unused credit, uncollected receivables, expected insurance proceeds, or restricted funds unless separately and intentionally modeled.

## Step 2: Assign Inflows by Week

Assign each expected inflow to the week in which cash is reasonably expected to clear:

- Cash sales and deposits
- Receivables collected
- Other operating inflows
- Reserve transfers
- Credit draws
- Insurance proceeds

## Step 3: Assign Outflows by Week

Assign each expected outflow to the week in which cash is reasonably expected to leave:

- Payroll
- Rent or occupancy
- Suppliers or inventory
- Debt and equipment payments
- Taxes and insurance
- Utilities
- Software and subscriptions
- Marketing
- Owner distributions
- Repairs, refunds, and other obligations

## Step 4: Calculate the Weekly Chain

For each week:

**Ending Cash = Beginning Cash + Total Inflows − Total Outflows**

For Weeks 2–13:

**Beginning Cash = Prior Week Ending Cash**

## Step 5: Reconcile the Baseline

Confirm:

- Weekly beginning and ending cash chain correctly
- Inflow and outflow totals foot
- Receivables appear once
- Internal transfers do not create fake revenue
- Reserves and credit remain separate until intentionally used
- The baseline represents normal expected operations before shocks

## Baseline Outputs

Record:

- Lowest baseline cash balance
- Week of lowest baseline cash
- First week below protected minimum
- First negative-cash week
- Protected-minimum runway
- Positive-cash runway
- Payroll coverage
- Recovery pattern, if the baseline itself breaches the threshold

If the baseline already shows a gap, disclose that the business has a baseline operating or timing problem before additional shocks are applied.

---

# 4. Phase Three — Define an Individual Scenario

A scenario must be translated into four components:

1. **Revenue effect** — reduction, cancellation, or delayed collection
2. **Cost effect** — repair, replacement, cleanup, refunds, overtime, or temporary capacity
3. **Timing** — start week and payment or collection week
4. **Duration and recovery** — how long the disruption lasts and how operations normalize

## Scenario Intake Template

| Field | Required Detail |
|---|---|
| Scenario name | Plain-English label |
| Scenario type | Slow week, equipment failure, weather closure, delayed receivable, custom |
| Start week | Week 1–13 |
| Duration | Days or weeks |
| Revenue effect | Amount or percentage by week |
| Cost effect | Amount and payment week |
| Capacity effect | Closed, reduced, delayed, outsourced, or normal |
| Insurance effect | Deductible, proceeds, and expected receipt week |
| Recovery assumption | Immediate, gradual, or extended |
| Confidence | Confirmed, estimated, or unknown |

When the user describes a custom shock, translate it into these fields and confirm material interpretations before calculating.

---

# 5. Phase Four — Run Individual Scenarios

Each individual scenario starts from the same approved baseline.

Do not run Scenario B on top of Scenario A unless intentionally creating a stacked scenario.

## Slow Week or Revenue Decline

1. Identify affected revenue lines.
2. Apply the approved decline percentage or amount to the affected weeks.
3. Move delayed receivables instead of duplicating them.
4. Add recovery or marketing costs only when provided or explicitly assumed.
5. Recalculate every week through Week 13.

## Equipment or Vehicle Failure

1. Identify the selected operating path: repair, replace, rent, outsource, delay work, or a defined combination.
2. Add costs in the weeks they are expected to be paid.
3. Reduce revenue only for the period capacity is genuinely lost.
4. Add temporary rental, outsourcing, overtime, or catch-up costs when applicable.
5. Add insurance proceeds only in the expected receipt week and never assume claim approval.
6. Recalculate the complete 13-week chain.

## Weather or Operational Closure

1. Define closure or reduced-capacity dates.
2. Estimate revenue lost or delayed during the affected period.
3. Include payroll still owed, cleanup, spoilage, refunds, temporary equipment, and reopening costs when applicable.
4. Separate delayed revenue from permanently lost revenue.
5. Model insurance or assistance proceeds only when timing and availability are reasonably supported.
6. Recalculate the complete chain.

## Delayed Receivable

1. Remove the receivable from its original collection week.
2. Add it to the revised expected collection week.
3. Do not change recognized revenue unless the scenario also assumes a cancellation or write-off.
4. Evaluate customer concentration and payroll timing.
5. Recalculate all affected weeks.

## Individual Scenario Outputs

For each scenario, record:

- Lowest cash balance
- Week of lowest cash
- First week below protected minimum
- First negative-cash week
- Protected-minimum runway
- Positive-cash runway
- Payroll coverage
- Funding gap
- Recovery week
- Primary cash-pressure driver
- Material assumptions

---

# 6. Phase Five — Build the Stacked-Shock Scenario

A stacked shock combines two or more approved disruptions while preserving timing.

## Stacking Procedure

1. Start again from the approved baseline.
2. Apply each scenario adjustment to the correct week and cash-flow line.
3. Identify overlapping effects.
4. Remove duplicate revenue losses, costs, receivables, payroll, insurance, reserves, or response actions.
5. Recalculate the entire 13-week chain.
6. Compare the result with the baseline and each individual scenario.

## Overlap Review

Before calculating, ask:

- Does weather closure already include the equipment downtime days?
- Is a receivable delayed because of the same closure, or is it a separate customer issue?
- Is payroll already included in baseline outflows?
- Is the model using repair and replacement as alternatives or as a valid combination?
- Were reserves already included in beginning cash?
- Is insurance being netted from a cost and added later?
- Is the same response lever applied to multiple scenarios?

## Stacked Scenario Rule

Do not add the funding gaps from individual scenarios. The stacked funding gap must come from the recalculated weekly cash series.

---

# 7. Phase Six — Measure the Stress-Test Result

Use the calculation definitions in `cash-flow-calculation-rules.md`.

Required measures:

1. Lowest projected cash balance
2. Week of lowest cash balance
3. First week below protected minimum
4. First negative-cash week
5. Protected-minimum runway
6. Positive-cash runway
7. Payroll coverage
8. Funding gap
9. Recovery week
10. Largest cash-pressure driver
11. Best response lever

## Recovery Methodology

Recovery is not simply the first positive week.

The standard recovery week is the first week after the trough in which ending cash returns to or above the protected minimum and remains there for two consecutive modeled weeks.

When the threshold is not regained for two consecutive weeks, report:

`Not recovered within the 13-week forecast horizon.`

Also disclose whether recovery depends on:

- One unusually large collection
- Insurance proceeds
- A reserve transfer
- A credit draw
- Deferred obligations
- Permanent cost reductions
- Restored operating capacity

---

# 8. Phase Seven — Test Response Levers

Test response levers after the unmitigated scenario is calculated. This preserves visibility into the actual shock before corrective actions.

## Response Lever Categories

### Collect

- Accelerate receivables
- Follow up on overdue invoices
- Require deposits
- Offer approved early-payment terms

### Cut or Pause

- Freeze discretionary spending
- Delay noncritical purchases
- Reduce owner distributions
- Pause low-priority marketing or subscriptions

### Reschedule

- Negotiate supplier timing
- Reschedule noncritical payments
- Change project or staffing schedules

### Restore Capacity

- Repair
- Rent
- Replace
- Outsource
- Add overtime or catch-up capacity

### Add Liquidity

- Transfer approved reserves
- Model an owner contribution
- Review insurance or disaster-assistance options
- Evaluate working-capital options

## Testing Method

For each lever:

1. State the amount and timing.
2. Identify the cash-flow line affected.
3. Recalculate the full scenario.
4. Compare the new lowest cash balance.
5. Compare the new funding gap.
6. Identify tradeoffs and new obligations.
7. Rank the lever by impact, timing, reversibility, and risk.

Do not automatically recommend borrowing. First distinguish a temporary timing gap from structurally weak economics.

---

# 9. Phase Eight — Create Trigger Zones

Use `trigger-response-playbook.md` to convert the model into operating rules.

## Green

Cash remains above the owner-defined green threshold and critical obligations remain covered.

## Yellow

Cash is projected below the green threshold, the protected minimum is approaching or breached, or a material obligation is becoming vulnerable while cash remains nonnegative.

## Red

Cash becomes negative, payroll or another critical obligation cannot be paid when due, or the disruption requires immediate escalation.

Every trigger must include:

- Trigger condition
- Action
- Owner
- Deadline
- Required evidence or document
- Escalation path

---

# 10. Phase Nine — Funding Readiness and Advisor Handoff

When a real gap remains after reasonable operational levers are tested:

1. Calculate the gap without additional funding.
2. Model any funding amount separately.
3. Include timing, costs, and repayment obligations when known.
4. Do not imply approval or eligibility.
5. Prepare the funding-document checklist.
6. Generate a one-page summary when requested.

The summary should explain:

- Business context
- Disruption
- Lowest cash point
- Timing of the gap
- Intended use of funds
- Actions already taken
- Recovery assumptions
- Repayment considerations
- Missing information and risks

---

# 11. Scenario Comparison Format

| Measure | Baseline | Slow Week | Equipment Failure | Weather Closure | Delayed Receivable | Stacked Shock |
|---|---:|---:|---:|---:|---:|---:|
| Lowest cash balance | | | | | | |
| Week of lowest cash | | | | | | |
| First week below minimum | | | | | | |
| First negative-cash week | | | | | | |
| Protected-minimum runway | | | | | | |
| Positive-cash runway | | | | | | |
| Payroll coverage | | | | | | |
| Funding gap | | | | | | |
| Recovery week | | | | | | |
| Primary pressure driver | | | | | | |
| Best response lever | | | | | | |

Place an **Assumptions and Missing Data** section immediately below the comparison.

---

# 12. Quality-Assurance Procedure

Before finalizing an analysis:

- [ ] Baseline begins with approved available cash
- [ ] Weekly beginning cash chains from prior ending cash
- [ ] Inflows and outflows foot correctly
- [ ] Scenario timing is preserved
- [ ] Individual scenarios start from the baseline
- [ ] Stacked scenario starts from the baseline
- [ ] Overlapping revenue losses are removed
- [ ] Delayed receivables are moved, not duplicated
- [ ] Insurance proceeds are not counted early
- [ ] Reserve and credit use are explicit
- [ ] Response levers are calculated after the unmitigated scenario
- [ ] Funding gap uses the protected minimum
- [ ] Recovery uses the two-consecutive-week rule
- [ ] Assumptions are clearly labeled
- [ ] Results do not imply funding approval or professional advice

---

# 13. Recommended Output Order

1. Executive result
2. Data-quality note
3. Baseline summary
4. Scenario assumptions
5. Scenario comparison table
6. Seven critical numbers
7. Cash-pressure drivers
8. Response lever comparison
9. Green/yellow/red trigger plan
10. Funding document checklist, when relevant
11. Lender or advisor summary, when requested
12. Assumptions, missing information, and limitations
13. Next actions
