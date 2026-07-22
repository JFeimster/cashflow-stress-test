# Cash Flow Calculation Rules

## Purpose

This file is the calculation source of truth for **Cash Flow Stress-Test Copilot**. It defines the terms, formulas, weekly reconciliation rules, runway measures, scenario controls, and double-counting protections used across the 13-week cash-flow model.

Use these rules together with:

- `local-business-cash-flow-stress-test-kit.md`
- `13-week-cash-flow-template.csv`
- `stress-test-scenario-methodology.md`
- `scenario-inputs-and-formulas.json`
- `trigger-response-playbook.md`

> **Planning boundary:** These calculations support scenario planning. They do not guarantee funding, predict future performance with certainty, or replace accounting, tax, legal, lending, insurance, or underwriting judgment.

---

# 1. Core Definitions

## Available Business Cash

Cash currently available for ordinary business use at the beginning of Week 1.

Include:

- Cleared business checking balances
- Cleared business savings balances intentionally available for operations
- Cash equivalents that can be used without a material delay or penalty

Do not automatically include:

- Available credit
- Pending deposits
- Uncollected receivables
- Restricted funds
- Personal funds
- Expected insurance proceeds
- Tax reserves that the owner does not intend to use

## Beginning Cash

The amount of available business cash at the start of a forecast week.

- **Week 1 Beginning Cash:** User-provided current available business cash
- **Weeks 2–13 Beginning Cash:** Prior week’s ending cash

## Cash Inflow

Cash expected to become available during a specific week.

Common inflows:

- Cash sales and deposits
- Accounts receivable collected
- Other operating inflows
- Approved reserve transfers
- Intentional credit draws
- Insurance proceeds received during the modeled week

An expected payment is not an inflow until it is assigned to the week in which it is reasonably expected to clear.

## Cash Outflow

Cash expected to leave the business during a specific week.

Common outflows:

- Payroll
- Rent or occupancy
- Suppliers and inventory
- Debt and equipment payments
- Taxes
- Insurance
- Utilities
- Software and subscriptions
- Marketing and advertising
- Owner distributions
- Repairs or replacement costs
- Refunds or customer credits
- Other operating outflows

## Protected Minimum Cash Balance

The minimum cash level the owner wants to preserve for operational safety. This is a planning threshold, not a lender requirement or universal benchmark.

## Safety Buffer

An optional amount maintained above the protected minimum. The owner defines this amount based on operating volatility, payroll timing, fixed obligations, and risk tolerance.

## Reserve Cash

Cash intentionally held outside ordinary operating cash. Reserve cash remains separate until the model includes a specific transfer into the operating account during a specific week.

## Available Credit

Unused borrowing capacity. Available credit is **not cash** and must not be added to beginning cash. It enters the model only when a specific draw amount and draw week are intentionally modeled.

## Shock

A scenario adjustment that changes revenue, collections, expenses, timing, capacity, or recovery assumptions.

## Response Lever

An action tested after a shock, such as accelerating receivables, requiring deposits, freezing discretionary spending, using reserves, negotiating payment timing, or evaluating working capital.

---

# 2. Sign Convention

Use positive numbers for both cash inflows and cash outflows.

The model subtracts the outflow total from available cash. Do not enter expenses as negative numbers unless a separate implementation explicitly requires signed transactions.

| Item | Entry Convention |
|---|---:|
| Cash sale | Positive inflow |
| Receivable collected | Positive inflow |
| Payroll | Positive outflow |
| Repair bill | Positive outflow |
| Refund received from vendor | Positive inflow or reduction of the original outflow, not both |
| Customer refund paid | Positive outflow |

---

# 3. Weekly Cash-Flow Formulas

For each week:

**Total Cash Inflows = Sum of all inflow lines assigned to that week**

**Total Cash Outflows = Sum of all outflow lines assigned to that week**

**Ending Cash = Beginning Cash + Total Cash Inflows − Total Cash Outflows**

For Week 2 through Week 13:

**Beginning Cash in Week N = Ending Cash in Week N − 1**

## Variance to Protected Minimum

**Variance to Protected Minimum = Ending Cash − Protected Minimum Cash Balance**

Interpretation:

- Positive variance: cash is above the protected minimum
- Zero variance: cash equals the protected minimum
- Negative variance: cash is below the protected minimum

## Weekly Zone

- **Green:** Ending cash is at or above the protected minimum plus the owner-defined safety buffer
- **Yellow:** Ending cash is nonnegative but below the green threshold
- **Red:** Ending cash is negative, or a critical obligation cannot be paid when due

A business may also use a stricter Yellow trigger when cash is projected to breach the protected minimum within a defined number of weeks.

---

# 4. Required Stress-Test Outputs

## Lowest Projected Cash Balance

The minimum ending-cash value across the modeled weeks.

**Lowest Projected Cash = minimum(Ending Cash Week 1 through Week 13)**

## Week of Lowest Cash Balance

The first week in which the lowest projected cash balance occurs. If the same minimum occurs more than once, also disclose the repeated weeks when useful.

## First Week Below Protected Minimum

The first week in which:

**Ending Cash < Protected Minimum Cash Balance**

Return `None` when no week breaches the protected minimum.

## First Negative-Cash Week

The first week in which:

**Ending Cash < 0**

Return `None` when cash remains nonnegative for all 13 weeks.

## Funding Gap

**Funding Gap = max(0, Protected Minimum Cash Balance − Lowest Projected Cash Balance)**

This is the estimated amount required to keep projected cash at the protected minimum under the modeled scenario. It is not automatically the recommended borrowing amount.

## Positive-Cash Runway

The number of full forecast weeks completed before ending cash becomes negative.

- If Week 1 ending cash is negative, positive-cash runway is `0 weeks`.
- If cash stays nonnegative through Week 13, report `13+ weeks within the modeled horizon`.

## Protected-Minimum Runway

The number of full forecast weeks completed before ending cash falls below the protected minimum.

- If Week 1 ends below the protected minimum, protected-minimum runway is `0 weeks`.
- If the threshold is not breached, report `13+ weeks within the modeled horizon`.

Always distinguish protected-minimum runway from positive-cash runway.

## Payroll Coverage

Payroll coverage is the number of scheduled payroll cycles that remain payable without ending cash becoming negative after all modeled obligations for the relevant week are included.

Rules:

1. Use the actual payroll schedule when available.
2. Do not calculate payroll coverage by dividing cash by average payroll alone when other obligations are material.
3. If a payroll cycle is only partially covered, mark it as vulnerable rather than covered.
4. Disclose the first vulnerable payroll date or week.

## Recovery Week

The first week after the scenario’s lowest cash point in which ending cash returns to or above the protected minimum and remains there for at least two consecutive modeled weeks.

If this does not occur within the 13-week horizon, report:

`Not recovered within the 13-week forecast horizon.`

The two-week confirmation rule reduces false recovery signals caused by one temporary inflow.

## Largest Cash-Pressure Driver

The single modeled item or timing change with the largest negative effect on ending cash. When several drivers interact, identify the primary driver and list the secondary contributors.

## Best Response Lever

The tested response action that produces the greatest improvement in the selected decision measure, normally:

1. Reduction in funding gap
2. Improvement in lowest cash balance
3. Delay or prevention of threshold breach
4. Protection of payroll or critical obligations

Disclose tradeoffs, timing, and new risks. The best numerical lever is not automatically the best business decision.

---

# 5. Baseline Reconciliation Rules

## Week 1

1. Beginning cash must equal the user-approved current available business cash.
2. All expected inflows and outflows must be assigned to specific weeks.
3. Pending or uncertain items must be labeled as assumptions.

## Weeks 2–13

1. Beginning cash must equal the prior week’s ending cash.
2. Do not manually overwrite chained beginning-cash formulas unless correcting an error.
3. A transfer between the business’s own accounts must not be counted as revenue or a net inflow unless it changes the amount of cash intentionally available for operations.

## Actual-versus-Forecast Updating

At the start of each weekly review:

1. Replace the completed week’s forecast figures with actual cleared cash activity.
2. Reconcile the ending cash to the actual available balance.
3. Move unpaid receivables to their revised expected collection weeks.
4. Move unpaid obligations to the weeks in which they are now expected to clear.
5. Document material variances and updated assumptions.
6. Recalculate the remaining forecast and scenarios.

## Reconciliation Tolerance

The completed week should reconcile to the actual available cash balance. Any unexplained variance must be investigated before scenario results are treated as reliable.

---

# 6. Scenario Calculation Rules

## Slow-Week Revenue Formula

**Stress Revenue = Baseline Revenue × (1 − Revenue Decline Percentage)**

**Weekly Revenue Loss = Baseline Revenue − Stress Revenue**

Apply the reduction only to the affected revenue lines and weeks.

## Delayed Receivable Rule

A delayed receivable is moved from the original expected collection week to the revised week.

Do not:

- Leave the amount in the original week
- Add the same amount again in the revised week
- Treat the delay as a permanent revenue loss unless collection is no longer expected

## Equipment-Failure Cash Effect

Model cash effects by week, not as one net number.

Possible components:

- Repair payment
- Replacement payment
- Rental or outsourcing cost
- Vendor deposit
- Revenue lost during downtime
- Overtime or catch-up cost
- Insurance deductible
- Insurance proceeds received later

## Weather-Closure Cash Effect

Possible components:

- Revenue lost during closure or reduced capacity
- Payroll still owed
- Cleanup
- Spoilage or inventory loss
- Customer refunds or credits
- Temporary equipment
- Reopening costs
- Insurance deductible
- Insurance proceeds received later

## Stacked-Shock Rule

A stacked scenario must be recalculated week by week using all approved scenario adjustments.

Do not calculate a stacked shock by simply adding the separate funding gaps. Individual gaps occur at different times and may overlap.

## Response Lever Rule

Each response lever must have:

- Amount
- Timing
- Duration, when applicable
- Cash-flow line affected
- Operational tradeoff

Recalculate the complete scenario after applying the lever.

---

# 7. Double-Counting Controls

## Revenue Loss and Delayed Collections

Do not count the same cash twice as both:

- Lost revenue and delayed receivable
- Reduced sales and canceled receivable
- Closure revenue loss and equipment downtime revenue loss for the same operating period

When effects overlap, use the best supported single treatment or clearly separate non-overlapping amounts.

## Repair, Replacement, Rental, and Outsourcing

Do not automatically include full repair, full replacement, and full rental costs together. Model the selected decision path or clearly labeled alternatives.

A short overlap may be valid when, for example, temporary rental is needed while a repair is completed.

## Insurance

- Record the deductible or uncovered cost as an outflow.
- Record insurance proceeds only in the week reasonably expected to be received.
- Do not subtract expected proceeds from the initial repair cost and also add the proceeds later.
- Do not assume a claim will be approved.

## Reserves

- Reserve cash remains outside operating cash until a specific transfer is modeled.
- Do not include reserves in beginning cash and again as a later inflow.

## Credit

- Available credit is not cash.
- Record a draw only once, in the week funds are expected to become available.
- Record related fees and repayments as separate outflows.
- Do not treat a credit draw as revenue.

## Owner Contributions

Record a confirmed owner contribution as an inflow in the modeled week. Do not assume personal funds are available.

## Taxes and Restricted Funds

Do not count restricted tax funds as ordinary available cash unless the user intentionally models their use and understands the resulting obligation.

## Payroll

Do not include payroll in baseline outflows and add it again as a separate closure cost unless the closure creates a genuinely incremental payroll obligation.

## Refunds and Credits

Use one treatment:

- Reduction of the related revenue, or
- Separate cash outflow when the refund is actually paid

Do not use both for the same amount.

## Transfers

Internal transfers should not create revenue or expense. Count only the change in cash intentionally available for operations.

---

# 8. Missing Data and Assumptions

For every analysis, separate:

1. User-provided facts
2. Calculated values
3. Assumptions
4. Missing information

Do not invent exact financial figures.

When an assumption materially changes the result:

- State the assumption
- Explain why it matters
- Ask the user to confirm it when practical
- Show a range or sensitivity analysis when requested

---

# 9. Rounding and Display Rules

- Preserve full precision during calculations.
- Display currency to two decimal places unless the user requests whole dollars.
- Display percentages to one or two decimal places.
- Display weeks as whole numbers when referring to a week number.
- Clearly mark negative cash values.
- Use `None` or `Not reached within horizon` instead of inventing a week.

---

# 10. Quality-Control Checks

Before presenting results, verify:

- [ ] Week 1 beginning cash matches the approved input
- [ ] Every later beginning-cash value equals the prior ending-cash value
- [ ] Total inflows equal the sum of inflow rows
- [ ] Total outflows equal the sum of outflow rows
- [ ] Ending cash uses the core formula
- [ ] Scenario changes affect the intended weeks only
- [ ] Delayed receivables were moved, not duplicated
- [ ] Insurance proceeds were not counted early
- [ ] Reserves and credit were modeled separately from available cash
- [ ] Stacked shocks were recalculated weekly
- [ ] Response levers were not counted twice
- [ ] Funding gap uses the protected minimum
- [ ] Protected-minimum runway and positive-cash runway are reported separately
- [ ] Recovery requires two consecutive weeks above the protected minimum
- [ ] Assumptions and missing information are disclosed

---

# 11. Compliance Language

Use language such as:

- may help
- can support
- could improve
- designed to help
- eligibility varies
- terms may change
- not a guarantee
- depending on the business profile

Never state or imply that the model:

- Guarantees funding
- Determines approval
- Selects a lender or product without full review
- Replaces accounting, legal, tax, lending, insurance, or underwriting judgment
- Proves that a business can repay financing
