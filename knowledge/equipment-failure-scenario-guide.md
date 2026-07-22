# Equipment-Failure Scenario Guide

## Purpose

This file defines how **Cash Flow Stress-Test Copilot** should model the cash-flow impact of a broken vehicle, machine, production asset, commercial appliance, technology system, or other revenue-critical equipment.

The guide supports comparison of:

- Repair
- Rent
- Replace
- Outsource
- Operate at reduced capacity
- Delay work
- Combine options in a documented sequence

Use this file with:

- `cash-flow-calculation-rules.md`
- `stress-test-scenario-methodology.md`
- `funding-document-checklist.md`
- `trigger-response-playbook.md`
- `privacy-redaction-and-data-handling.md`

> The cheapest invoice is not always the cheapest option. Downtime, lost capacity, temporary operating costs, payment timing, and recovery risk may matter more than the repair price alone.

---

# 1. Required Inputs

## Asset Information

| Field | Type | Required |
|---|---|---|
| Asset type | Text | Yes |
| Business function | Text | Yes |
| Failure week | Week 1–13 | Yes |
| Current status | Failed / Limited / Intermittent | Yes |
| Expected downtime | Days or weeks | Yes |
| Revenue dependent on asset | Currency per day or week | Yes |
| Alternative capacity | Percent | Recommended |
| Safety or regulatory issue | Boolean / description | Recommended |

## Cost Information

- Diagnostic cost
- Towing or transport
- Repair estimate
- Required repair deposit
- Repair payment timing
- Rental setup and weekly cost
- Replacement purchase price
- Replacement deposit
- Replacement financing payment
- Delivery and installation
- Training
- Permits or inspections
- Outsourcing cost
- Overtime
- Lost materials or spoilage
- Insurance deductible
- Expected insurance receipt week
- Disposal or decommissioning cost
- Maintenance due after restoration

## Decision Information

- Remaining useful life after repair
- Repair warranty
- Replacement warranty
- Probability of repeat failure
- Capacity under each option
- Service-quality effect
- Customer-delay effect
- Contract or SLA exposure
- Resale or salvage value
- User-selected decision criteria

---

# 2. Separate the Cost Layers

## Direct Cash Cost

Examples:

- Repair invoice
- Rental bill
- Replacement deposit
- Outsourcing invoice
- Towing
- Installation
- Deductible

## Lost Revenue

Revenue that disappears because the business cannot perform the work.

## Delayed Revenue

Revenue that moves to a later week because work is rescheduled.

## Protected Revenue

Revenue preserved by:

- Rental equipment
- Outsourcing
- Reassignment
- Reduced-capacity operation
- Temporary process changes

Protected revenue must not also be counted as lost.

## Recovery Cost

Examples:

- Overtime
- Expedited shipping
- Rework
- Customer credits
- Rescheduling
- Recovery marketing
- Additional quality control

## Residual Risk

Examples:

- Repeat failure
- Lower capacity
- Safety risk
- Warranty uncertainty
- Longer lead time
- Vendor dependency
- Financing burden

---

# 3. Core Formulas

## Gross Revenue at Risk

```text
Gross Revenue at Risk
= Revenue Dependent on Asset × Downtime
```

## Protected Revenue

```text
Protected Revenue
= Gross Revenue at Risk × Alternative Capacity Percentage
```

## Lost Revenue

```text
Lost Revenue
= Gross Revenue at Risk − Protected Revenue − Delayed Revenue
```

Do not allow the result to fall below zero.

## Option Cash Cost

```text
Option Cash Cost
= Upfront Cost
+ Temporary Operating Cost
+ Recovery Cost
+ Additional Labor
+ Fees
− Confirmed Proceeds Received During Forecast
```

## Near-Term Cash Burden

```text
Near-Term Cash Burden
= Cash Paid During Weeks 1–13
− Cash Proceeds Received During Weeks 1–13
```

A financed replacement may have a lower 13-week burden than its purchase price but create longer-term obligations. Show both.

## Total 13-Week Scenario Effect

```text
Total 13-Week Scenario Effect
= Lost Cash Inflows
+ Added Cash Outflows
− Avoided Cash Outflows
− Added Protected Cash Inflows
```

Use signed weekly adjustments in the model.

---

# 4. Option Methodology

## Repair

Model:

- Deposit
- Remaining invoice
- Downtime
- Lost and delayed revenue
- Rental or outsourcing during repair
- Overtime after repair
- Warranty
- Repeat-failure risk
- Maintenance due soon

Do not model replacement in the same scenario unless comparing alternatives.

## Rent

Model:

- Setup or delivery
- Weekly rental cost
- Minimum rental period
- Deposit
- Insurance
- Operating differences
- Revenue protected
- Return or removal cost
- Rental availability timing

## Replace

Model:

- Deposit
- Closing payment or financed amount
- Delivery
- Installation
- Training
- Permits
- Downtime before operation
- Old asset disposal
- New payment obligation
- Capacity increase or efficiency benefit

Do not treat the entire financed purchase price as a Week 1 cash outflow unless cash is actually paid then.

## Outsource

Model:

- Vendor rate
- Revenue retained
- Gross-margin reduction
- Transport
- Quality control
- Customer communication
- Vendor capacity
- Payment timing
- Rework risk

Revenue protected by outsourcing is not lost revenue.

## Reduced-Capacity Operation

Model:

- Remaining capacity
- Priority work
- Overtime
- Backlog
- Customer delay
- Safety limitations
- Regulatory limitations

Never recommend unsafe or noncompliant operation.

## Delay Work

Model:

- Delayed revenue
- Cancellation rate
- Customer credits
- Contract penalties
- Backlog-recovery cost
- Collection delay

---

# 5. Decision Matrix

| Factor | Repair | Rent | Replace | Outsource | Reduced Capacity |
|---|---:|---:|---:|---:|---:|
| Upfront cash | | | | | |
| 13-week cash burden | | | | | |
| Time to restore capacity | | | | | |
| Capacity restored | | | | | |
| Revenue protected | | | | | |
| New recurring payment | | | | | |
| Repeat-failure risk | | | | | |
| Operational complexity | | | | | |
| Safety/compliance risk | | | | | |
| Recovery week | | | | | |
| Lowest projected cash | | | | | |
| Funding gap | | | | | |

The GPT may rank options only against user-selected criteria. It should not present a universal “best” option.

---

# 6. Insurance Modeling

## Required Separation

Track separately:

- Claim filed
- Claim accepted
- Amount approved
- Deductible
- Payment expected
- Payment received

## Cash Rule

Only count proceeds in the week they are reasonably expected to be received.

Do not count:

- The policy limit
- The claim amount
- The repair estimate
- The amount the user hopes to receive

as cash.

## Reimbursement Double Counting

When insurance reimburses a cost:

1. Record the full cash payment when paid.
2. Record the proceeds when received.
3. Keep the deductible and uncovered cost visible.
4. Do not subtract the reimbursement from the repair invoice and also add it as an inflow.

---

# 7. Recovery Methodology

## Operational Recovery

The asset or substitute process restores acceptable capacity.

## Cash Recovery

Ending cash returns to the defined recovery threshold.

Operational recovery may occur before cash recovery.

## Backlog Recovery

Model:

- Jobs retained
- Jobs canceled
- Additional hours
- Subcontracting
- Materials
- Billing timing
- Collection timing

A completed backlog does not become cash until collected.

---

# 8. Worked Example

## Fictional Plumbing Contractor

### Baseline Inputs

- Current cash: $45,000
- Protected minimum: $20,000
- Service truck fails in Week 4
- Revenue dependent on truck: $2,400 per workday
- Expected downtime without intervention: 8 workdays
- Repair: $11,500
- Rental: $1,600 per week plus $500 delivery
- Rental restores 80% of capacity
- $3,200 of affected work can be delayed
- Overtime recovery cost: $1,400

### Gross Revenue at Risk

```text
$2,400 × 8 days = $19,200
```

### Protected Revenue With Rental

```text
$19,200 × 80% = $15,360
```

### Lost Revenue

```text
$19,200 − $15,360 − $3,200 = $640
```

### Repair-and-Rent Cash Effects

| Week | Adjustment |
|---|---:|
| 4 | −$5,750 repair deposit |
| 4 | −$2,100 rental setup and first week |
| 4 | −$640 lost revenue |
| 5 | −$5,750 repair balance |
| 5 | −$1,600 rental second week |
| 6 | +$3,200 delayed revenue collected |
| 6 | −$1,400 overtime |

The GPT must compare this scenario with:

- Repair without rental
- Replacement
- Outsourcing
- Reduced capacity

using the same baseline.

---

# 9. Double-Counting Controls

- Do not count all affected revenue as lost when rental protects part of it.
- Do not count delayed revenue as lost.
- Do not include repair and replacement costs in one option unless both are truly paid.
- Do not net insurance proceeds against cost and also add the proceeds later.
- Do not count available credit before a draw.
- Do not count vendor financing as cash inflow unless it actually funds the purchase.
- Do not count avoided maintenance unless the expense was included in baseline.
- Do not treat the asset purchase price and loan principal as two outflows.

---

# 10. Funding-Readiness Handoff

When the scenario leaves a real gap, prepare:

- Repair, rental, replacement, or outsourcing quote
- Downtime estimate
- Revenue-at-risk calculation
- 13-week baseline
- Option comparison
- Existing debt schedule
- Bank statements
- P&L and balance sheet
- AR and AP aging
- Use-of-funds schedule
- Recovery plan
- Insurance documentation
- One-page lender or advisor summary

Do not imply the packet guarantees approval.

---

# 11. Required GPT Output

1. Asset and failure summary
2. User-provided facts
3. Missing information
4. Option assumptions
5. Weekly cash adjustments by option
6. Revenue lost, delayed, and protected
7. Direct and recovery costs
8. Baseline-versus-option comparison
9. Decision matrix
10. Seven key numbers
11. Trigger status
12. Documents needed
13. Reality check and disclaimer

---

# 12. QA Checklist

- [ ] Failure timing is identified.
- [ ] Revenue dependency is documented.
- [ ] Lost, delayed, and protected revenue are separate.
- [ ] Each option has a separate scenario.
- [ ] Payment timing matches quotes.
- [ ] Financing payments are not confused with purchase price.
- [ ] Insurance is timed by expected receipt.
- [ ] Backlog costs are included.
- [ ] Safety and compliance constraints are visible.
- [ ] Beginning cash chains correctly.
- [ ] The funding gap uses the protected minimum.
- [ ] No option is presented as universally best.

---

# Final Principle

Repair price is only one line. The real decision is which option protects the most viable cash flow without creating a worse operating problem later.
