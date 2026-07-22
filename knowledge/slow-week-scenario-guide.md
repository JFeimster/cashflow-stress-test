# Slow-Week Scenario Guide

## Purpose

This file defines how **Cash Flow Stress-Test Copilot** should model a temporary revenue decline inside a reconciled 13-week cash-flow forecast.

A “slow week” may represent:

- Fewer booked jobs
- Lower foot traffic
- Customer cancellations
- Reduced order volume
- Lower close rates
- Seasonal softness
- Advertising underperformance
- A temporary demand shock
- A delayed project start
- A local event that suppresses sales without fully closing the business

Use this file with:

- `cash-flow-calculation-rules.md`
- `13-week-cash-flow-template.csv`
- `stress-test-scenario-methodology.md`
- `scenario-inputs-and-formulas.json`
- `trigger-response-playbook.md`

> A slow week is not merely “revenue down.” The model must identify when cash is lost, when it is delayed, which variable costs fall with sales, which costs remain fixed, and how long recovery takes.

---

# 1. Required Inputs

## Minimum Inputs

| Field | Type | Unit | Required |
|---|---|---:|---|
| Scenario start week | Integer | Week 1–13 | Yes |
| Scenario duration | Integer | Weeks | Yes |
| Baseline weekly cash inflows | Number | Currency | Yes |
| Revenue decline | Number | Percent or currency | Yes |
| Revenue treatment | Enum | Lost / Delayed / Mixed | Yes |
| Protected minimum cash | Number | Currency | Yes |
| Fixed weekly outflows | Number | Currency | Yes |
| Variable-cost behavior | Number | Percent or currency | Recommended |
| Recovery pattern | Enum | Immediate / Ramp / Custom | Yes |
| Recovery start week | Integer | Week 1–13 | Yes |

## Recommended Inputs

- Sales channel affected
- Product or service line affected
- Historical comparison period
- Customer concentration
- Booked backlog
- Appointment or quote pipeline
- Receivable timing
- Deposit policy
- Payroll flexibility
- Supplier commitments
- Owner distributions
- Marketing response budget
- Known seasonality
- Confidence level for each assumption

---

# 2. Scenario Definitions

## Lost Revenue

Revenue is **lost** when the sale or service will not occur later.

Examples:

- A canceled restaurant visit
- A customer chooses a competitor
- A perishable appointment slot passes unused
- A retail sale disappears rather than moving to another week

### Modeling Rule

Remove the affected inflow from the original week. Do not add it to a later week.

## Delayed Revenue

Revenue is **delayed** when the underlying sale or service still exists, but cash arrives later.

Examples:

- A project start moves from Week 3 to Week 5
- An invoice expected in Week 4 is collected in Week 7
- Weather moves scheduled work into a later week

### Modeling Rule

Remove the cash inflow from the original week and add the same cash inflow to the revised receipt week.

## Mixed Revenue

A portion is lost and a portion is delayed.

Example:

- Of a $20,000 decline, $8,000 is permanently lost and $12,000 shifts two weeks.

### Modeling Rule

Split the adjustment into separate lost and delayed components.

---

# 3. Core Formulas

## Percentage-Based Revenue Decline

```text
Revenue Reduction for Week t
= Baseline Eligible Cash Inflow for Week t × Decline Percentage
```

## Currency-Based Revenue Decline

```text
Scenario Cash Inflow for Week t
= max(0, Baseline Eligible Cash Inflow for Week t − Stated Reduction)
```

## Delayed Revenue

```text
Original Week Adjustment
= −Delayed Amount

Revised Receipt Week Adjustment
= +Delayed Amount
```

The same delayed amount must appear exactly once in the revised week.

## Avoided Variable Cost

A revenue decline may reduce some costs, but only when the expense is truly avoidable in the modeled period.

```text
Avoided Variable Cost
= Lost or Delayed Activity Base × Avoidable Cost Rate
```

Examples may include:

- Merchant-processing fees
- Materials not ordered
- Job-specific subcontractor cost
- Packaging
- Delivery expense
- Sales commission not earned

Do not reduce:

- Rent
- Contracted payroll
- Debt payments
- Insurance
- Software subscriptions
- Taxes already due
- Inventory already committed
- Fixed supplier minimums

unless the user specifically confirms the cost can be avoided or delayed.

## Net Weekly Scenario Effect

```text
Net Weekly Scenario Effect
= Cash Inflow Adjustments − Cash Outflow Adjustments
```

A reduced outflow is entered as a positive benefit to cash relative to baseline.

---

# 4. Recovery Patterns

## Immediate Recovery

Revenue returns to baseline in the first week after the shock.

Use only when:

- Demand is expected to normalize immediately
- Capacity remains available
- No backlog or customer loss persists
- The assumption is supported by the user

## Linear Ramp

Revenue returns gradually.

Example:

| Week | Revenue Versus Baseline |
|---|---:|
| Shock Week 1 | 70% |
| Shock Week 2 | 75% |
| Recovery Week 1 | 85% |
| Recovery Week 2 | 95% |
| Recovery Week 3 | 100% |

## Backlog Recovery

Delayed work creates higher inflows later, but may also create:

- Overtime
- Temporary labor
- Subcontracting
- Material purchases
- Capacity constraints
- Longer collection periods

Do not add backlog revenue without modeling the resources needed to complete and collect it.

## Partial Structural Recovery

Revenue does not fully return within 13 weeks.

Use when:

- A major customer is lost
- Traffic permanently changes
- The business has a sustained lead-generation problem
- Pricing or conversion deteriorates
- The decline reflects a structural issue rather than a temporary shock

Clearly label this as a structural-risk scenario.

---

# 5. Scenario Construction Workflow

## Step 1 — Validate the Baseline

Confirm:

- Week 1 beginning cash equals current available business cash.
- Each week’s beginning cash equals the prior week’s ending cash.
- Cash inflows are recorded when expected to be received.
- Cash outflows are recorded when expected to be paid.
- Available credit is listed separately.
- The protected minimum is defined.

## Step 2 — Select the Revenue Base

Specify exactly which inflow lines are affected.

Examples:

- Cash sales
- Customer deposits
- Accounts receivable collections
- Platform payouts
- Project draws
- Recurring service revenue

Do not reduce unrelated inflows.

## Step 3 — Apply the Decline

Use either:

- A percentage
- A fixed amount
- A custom week-by-week schedule

## Step 4 — Classify Revenue

For every reduced inflow, classify it as:

- Lost
- Delayed
- Mixed
- Unknown

Do not silently assume lost revenue becomes delayed revenue.

## Step 5 — Model Avoided Costs

Identify costs that decline because the sale did not occur.

Use confirmed values first. Use assumptions only when labeled.

## Step 6 — Model Response Costs

Examples:

- Recovery marketing
- Discounts
- Overtime
- Temporary staffing
- Additional sales commissions
- Customer credits
- Rescheduling costs

## Step 7 — Chain the Cash Forecast

Recalculate all remaining weeks. A Week 3 shortfall must flow into Week 4 and beyond.

## Step 8 — Calculate Required Outputs

Return:

1. Lowest projected cash balance
2. Week of lowest cash balance
3. First week below protected minimum
4. First negative-cash week
5. Protected-minimum runway
6. Positive-cash runway
7. Payroll coverage
8. Estimated funding gap
9. Recovery week
10. Best response lever

---

# 6. Response Levers

Model each response lever separately before combining them.

## Collections

- Contact past-due customers
- Offer approved electronic-payment options
- Request deposits
- Convert milestones into billing events
- Confirm invoice receipt
- Resolve documentation blockers

Do not assume every receivable can be collected early.

## Expense Controls

- Freeze discretionary purchases
- Pause noncritical subscriptions
- Reduce owner distributions
- Delay nonessential capital expenditures
- Reschedule optional marketing
- Negotiate supplier timing

Do not describe delayed expenses as eliminated expenses.

## Revenue Recovery

- Reactivate past customers
- Fill schedule gaps
- Offer approved maintenance packages
- Increase deposit requirements
- Prioritize higher-contribution work
- Rebook delayed appointments
- Use capacity-preserving promotions

Do not assume discounts improve cash without modeling lower margin and timing.

## Capital Support

- Use reserves
- Model a deliberate credit draw
- Prepare for working-capital discussions
- Organize a funding-readiness packet

Do not count available credit until a draw is intentionally modeled.

---

# 7. Trigger Recommendations

## Green

Potential Green conditions:

- Ending cash remains above the protected minimum plus the safety buffer.
- Payroll remains covered.
- No critical payment is threatened.
- Recovery occurs within the expected period.
- Assumptions remain stable.

## Yellow

Potential Yellow conditions:

- Cash falls below the protected minimum but remains positive.
- Payroll coverage narrows.
- Receivables slip beyond the modeled date.
- The decline lasts longer than planned.
- The recovery campaign costs more than expected.
- A large customer or sales channel weakens further.

## Red

Potential Red conditions:

- Cash becomes negative.
- Payroll, rent, taxes, insurance, or a critical supplier payment is at risk.
- The model relies on uncertain inflows to remain solvent.
- Recovery does not occur within the forecast.
- The funding gap widens after response levers.
- The decline appears structural.

Use the precise thresholds in `trigger-response-playbook.md`.

---

# 8. Worked Example

## Fictional Mobile Service Business

### Baseline

- Current cash: $32,000
- Protected minimum: $15,000
- Normal weekly cash inflows: $20,000
- Normal weekly outflows: $18,500
- Scenario begins: Week 3
- Duration: Two weeks
- Decline: 25%

### Step 1 — Revenue Reduction

```text
Weekly Reduction
= $20,000 × 25%
= $5,000
```

Two-week gross reduction:

```text
$5,000 × 2 = $10,000
```

### Step 2 — Classify the Reduction

- $6,000 is permanently lost.
- $4,000 is delayed from Weeks 3–4 into Week 6.

### Step 3 — Avoided Variable Costs

Assume $1,200 in materials and processing costs are genuinely avoided.

### Step 4 — Recovery Cost

A $1,500 reactivation campaign is paid in Week 5.

### Net Scenario Effects

| Week | Inflow Adjustment | Outflow Adjustment | Net Effect |
|---|---:|---:|---:|
| 3 | −$5,000 | −$600 avoided cost | −$4,400 |
| 4 | −$5,000 | −$600 avoided cost | −$4,400 |
| 5 | $0 | +$1,500 recovery cost | −$1,500 |
| 6 | +$4,000 delayed inflow | $0 | +$4,000 |

The GPT must chain these effects through every subsequent week.

---

# 9. Common Modeling Errors

## Error: Reducing Recognized Revenue Instead of Cash Receipts

The 13-week model is cash-based. Adjust the receipt week.

## Error: Treating All Declines as Permanent

Ask whether sales are lost, delayed, or mixed.

## Error: Ignoring Avoided Variable Costs

Some costs may decline with sales. Confirm them.

## Error: Cutting Fixed Costs Automatically

Fixed costs remain unless the user identifies a real timing or cost change.

## Error: Adding Delayed Revenue Without Removing It

This double counts the inflow.

## Error: Assuming a V-Shaped Recovery

Use a user-supported recovery pattern.

## Error: Counting a Credit Line as Cash

Only an intentional draw becomes an inflow.

## Error: Calling a Temporary Gap a Profitability Problem

Cash timing and economic profitability are related but not identical.

---

# 10. Required GPT Output

When the user requests a slow-week analysis, return:

1. Scenario definition
2. Affected revenue lines
3. Lost-versus-delayed classification
4. Avoided cost assumptions
5. Recovery assumptions
6. Weekly adjustment table
7. Baseline-versus-scenario comparison
8. Seven key numbers
9. Response-lever comparison
10. Green/Yellow/Red triggers
11. Missing information
12. Reality check and disclaimer

---

# 11. QA Checklist

- [ ] The baseline reconciles.
- [ ] Only eligible inflows are reduced.
- [ ] Lost and delayed revenue are separated.
- [ ] Delayed revenue is removed from the original week.
- [ ] Avoided costs are genuinely avoidable.
- [ ] Fixed costs remain unless explicitly changed.
- [ ] Recovery costs are included.
- [ ] Backlog revenue includes capacity effects.
- [ ] Available credit remains separate.
- [ ] The funding gap uses the protected minimum.
- [ ] Recovery means cash returns to the defined threshold.
- [ ] No funding, insurance, or performance outcome is guaranteed.

---

# Final Principle

A slow week becomes dangerous when the business mistakes a temporary sales problem for a harmless timing issue—or a structural decline for a temporary dip.

Model the difference before choosing the response.
