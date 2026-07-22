# Weather-Closure Scenario Guide

## Purpose

This file defines how **Cash Flow Stress-Test Copilot** should model a weather-related closure, reduced-capacity period, access disruption, utility outage, evacuation, or reopening event inside a 13-week cash-flow forecast.

Potential events include:

- Severe storms
- Flooding
- Hurricanes or tropical systems
- Tornadoes
- Snow or ice
- Extreme heat
- Wildfire or smoke
- Power outages
- Road closures
- Water-service interruptions
- Local emergency orders
- Supplier interruptions caused by weather

Use this file with:

- `cash-flow-calculation-rules.md`
- `stress-test-scenario-methodology.md`
- `funding-document-checklist.md`
- `business-continuity-resource-directory.md`
- `trigger-response-playbook.md`

> A weather event may close the front door, reduce demand, interrupt suppliers, delay collections, damage equipment, preserve some revenue through remote operations, and create costs after reopening. Model the timeline—not merely the headline.

---

# 1. Required Inputs

## Event Inputs

| Field | Type | Required |
|---|---|---|
| Location | City/state or ZIP | Yes |
| Event type | Enum / text | Yes |
| Forecast or actual event | Enum | Yes |
| Closure start | Date or week | Yes |
| Closure duration | Hours, days, or weeks | Yes |
| Operating status | Closed / Reduced / Remote / Relocated | Yes |
| Capacity percentage | Percent | Recommended |
| Reopening date | Date or week | Recommended |

## Financial Inputs

- Normal cash inflows for affected days
- Cash sales lost
- Cash sales delayed
- Receivables delayed
- Customer refunds
- Credits
- Payroll still owed
- Emergency payroll
- Spoilage
- Inventory damage
- Cleanup
- Repairs
- Temporary equipment
- Generator, fuel, storage, or relocation
- Security
- Additional delivery cost
- Supplier price increases
- Reopening costs
- Recovery marketing
- Insurance deductible
- Expected insurance proceeds and timing
- Public assistance assumptions and timing
- Tax or payment deferrals when verified

## Operational Inputs

- Employee availability
- Customer access
- Supplier access
- Utilities
- Internet and communications
- Remote-work capacity
- Alternate location
- Inventory exposure
- Equipment exposure
- Safety restrictions
- Regulatory restrictions
- Communication plan

---

# 2. Event Status

Classify the event:

## Forecast

A potential future event. Use ranges and scenario bands.

Do not present a weather forecast as certainty.

## Active

The event is occurring. Use confirmed closures and current official alerts when available.

## Post-Event

The event has passed. Use actual closure days, invoices, damage evidence, and confirmed operational status.

---

# 3. Revenue Treatment

## Lost Revenue

Sales that will not occur later.

Examples:

- Closed restaurant service
- Lost retail foot traffic
- Canceled event attendance
- Perishable appointment capacity

## Delayed Revenue

Sales or collections that move later.

Examples:

- Contractor jobs rescheduled
- Clinic visits rebooked
- Invoices collected late
- Deliveries moved

## Protected Revenue

Revenue preserved through:

- Remote service
- Alternate site
- Delivery
- Online sales
- Rescheduling
- Temporary equipment
- Reduced-capacity operation

## Formula

```text
Gross Revenue at Risk
= Normal Eligible Cash Inflow × Affected Operating Fraction
```

```text
Protected Revenue
= Gross Revenue at Risk × Protected Capacity Percentage
```

```text
Lost Revenue
= Gross Revenue at Risk − Protected Revenue − Delayed Revenue
```

---

# 4. Closure Cost Categories

## During Closure

- Payroll
- Rent
- Debt
- Insurance
- Utilities
- Security
- Temporary storage
- Generator and fuel
- Emergency transport
- Customer refunds
- Spoilage
- Inventory loss
- Temporary location
- Communication expense

## Reopening

- Cleanup
- Repairs
- Inspections
- Replacement inventory
- Overtime
- Restocking
- Rebooking
- Recovery marketing
- Customer credits
- Safety supplies
- Additional insurance cost
- Vendor acceleration fees

## After Reopening

- Lower traffic
- Backlog costs
- Collection delays
- Supplier delays
- Higher input cost
- Customer churn
- Employee availability issues

---

# 5. Payroll Modeling

Do not assume payroll disappears when the business closes.

Classify payroll as:

- Fully payable
- Partially payable
- Shifted
- Covered by paid leave
- Reduced through approved scheduling changes
- Unknown

Model payroll at the actual expected payment date.

Flag legal, policy, contract, or employee-relations questions for qualified review.

---

# 6. Inventory, Spoilage, and Damage

Track separately:

- Inventory already included in baseline
- New replacement inventory
- Spoilage
- Salvage value
- Insurance reimbursement
- Disposal cost
- Supplier credit

Do not:

- Count the full inventory purchase twice
- Subtract an insurance reimbursement from the loss and add it again later
- Treat retail value as cash cost without explanation
- Assume all damaged inventory is unsellable without evidence

---

# 7. Insurance Modeling

Use these statuses:

- Not reported
- Claim filed
- Under review
- Partially approved
- Approved
- Paid
- Denied
- Unknown

Only `Paid` or a user-supported expected receipt should enter the cash forecast, and the timing must be explicit.

The model should show:

- Gross damage or interruption cost
- Deductible
- Potentially covered amount
- Amount expected
- Expected receipt week
- Uncovered amount
- Timing risk

Insurance terms vary. Do not interpret coverage as legal or claims advice.

---

# 8. Public Assistance Modeling

Public assistance or disaster financing may depend on:

- Event declaration
- Geography
- Business type
- Documented injury
- Program status
- Filing deadline
- Eligibility rules
- Credit and underwriting review
- Use-of-funds limitations

Do not add assistance as cash until:

1. The program is identified.
2. The user confirms an application or approved amount.
3. The modeled receipt week is documented.

A public program appearing in a directory does not establish eligibility.

---

# 9. Scenario Bands

## Mild

- Reduced traffic
- No full closure
- Limited operating costs
- No physical damage
- Recovery within one week

## Moderate

- One to three closure days
- Payroll and fixed costs continue
- Cleanup or spoilage
- Partial revenue recovery
- Some delayed collections

## Severe

- Multiweek disruption
- Physical damage
- Equipment loss
- Utility interruption
- Major supplier disruption
- Insurance uncertainty
- Material funding gap
- Recovery outside the 13-week horizon

Use user-confirmed inputs instead of generic bands whenever available.

---

# 10. Response Levers

## Before the Event

- Accelerate receivables
- Move cash to the appropriate business operating account
- Confirm payroll timing
- Secure inventory
- Protect equipment
- Confirm backup procedures
- Communicate closure policies
- Request customer deposits
- Delay noncritical purchases
- Review insurance contacts
- Preserve records securely

Do not instruct users to ignore evacuation or public-safety orders.

## During the Event

- Activate communications
- Track closure time
- Record costs
- Photograph damage when safe
- Protect employees
- Shift approved work
- Use alternate capacity
- Notify insurers
- Contact critical customers and suppliers

## After the Event

- Reconcile actual losses
- Update the forecast
- File or update claims
- Rebook delayed work
- Document refunds and credits
- Compare reopening options
- Prepare a funding packet
- Escalate trigger status

---

# 11. Worked Example

## Fictional Restaurant

### Baseline

- Current cash: $38,000
- Protected minimum: $22,000
- Normal weekly cash inflows: $32,000
- Event: Three-day winter closure in Week 2
- Affected operating fraction: 3/7
- Protected delivery capacity: 15%
- Delayed catering revenue: $2,000
- Spoilage: $4,000
- Cleanup: $1,500
- Payroll remains payable
- Recovery marketing: $1,200 in Week 3
- Expected insurance receipt: $3,500 in Week 7

### Gross Revenue at Risk

```text
$32,000 × 3/7 = $13,714.29
```

### Protected Revenue

```text
$13,714.29 × 15% = $2,057.14
```

### Lost Revenue

```text
$13,714.29 − $2,057.14 − $2,000
= $9,657.15
```

### Weekly Adjustments

| Week | Adjustment |
|---|---:|
| 2 | −$9,657.15 lost revenue |
| 2 | −$4,000 spoilage |
| 2 | −$1,500 cleanup |
| 3 | +$2,000 delayed catering cash |
| 3 | −$1,200 recovery marketing |
| 7 | +$3,500 insurance proceeds |

Payroll remains in baseline and is not added again.

---

# 12. Double-Counting Controls

- Do not count delayed revenue as lost.
- Do not count protected revenue as lost.
- Do not add payroll again if it is already in baseline.
- Do not count damaged inventory at both cost and retail value without separate labels.
- Do not net insurance against damage and add it as inflow later.
- Do not add public assistance before documented receipt assumptions.
- Do not count closure days and reduced-capacity percentages against the same revenue twice.
- Do not treat a tax deadline extension as cash inflow.
- Do not treat available credit as cash before a draw.

---

# 13. Trigger Escalation

## Yellow Examples

- Closure extends one day beyond plan.
- Cash drops below protected minimum.
- A major receivable slips.
- Insurance timing becomes uncertain.
- Supplier restart is delayed.
- Payroll coverage narrows.
- Reopening costs exceed estimate.

## Red Examples

- Cash becomes negative.
- Payroll, rent, taxes, insurance, or critical suppliers are at risk.
- The business cannot reopen safely.
- Critical equipment remains unavailable.
- Insurance or assistance is the only assumed source preventing insolvency.
- Recovery falls outside the forecast.
- The gap widens after response levers.

Use the exact playbook thresholds.

---

# 14. Required GPT Output

1. Event and location
2. Forecast, active, or post-event status
3. Official-source reference when used
4. Closure and capacity assumptions
5. Lost, delayed, and protected revenue
6. Closure, damage, and recovery costs
7. Payroll treatment
8. Insurance assumptions
9. Public-assistance assumptions
10. Weekly adjustment table
11. Baseline-versus-scenario comparison
12. Seven key numbers
13. Trigger status
14. Required documents
15. Missing information
16. Safety, eligibility, and financial disclaimers

---

# 15. QA Checklist

- [ ] Location and event type are identified.
- [ ] Closure dates are explicit.
- [ ] Revenue treatment is separated.
- [ ] Payroll is not silently removed.
- [ ] Spoilage and replacement inventory are distinct.
- [ ] Insurance timing is explicit.
- [ ] Assistance is not treated as guaranteed.
- [ ] Safety orders take priority.
- [ ] Official public sources are labeled.
- [ ] The cash chain reconciles.
- [ ] The protected-minimum gap is calculated.
- [ ] Recovery is operational and financial.

---

# Final Principle

A weather event ends when the sky clears. A cash-flow event ends when the business restores safe operations and cash returns to a defined threshold.
