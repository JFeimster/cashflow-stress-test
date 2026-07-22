# Trigger Response Playbook

## Purpose

This playbook converts the 13-week cash-flow stress test into clear operating actions. It defines Green, Yellow, and Red trigger zones, assigns owners, sets response deadlines, and creates an escalation path before a projected cash problem becomes an emergency.

Use this file with:

- `cash-flow-calculation-rules.md`
- `13-week-cash-flow-template.csv`
- `stress-test-scenario-methodology.md`
- `scenario-inputs-and-formulas.json`

> Trigger levels are business-specific planning thresholds. They are not universal financial standards, lender requirements, or guarantees of business safety.

---

# 1. Set the Trigger Thresholds

Before using the playbook, define:

| Threshold | Business-Specific Value |
|---|---:|
| Protected minimum cash balance | $ |
| Green safety buffer above minimum | $ |
| Yellow look-ahead window | weeks |
| Minimum payroll coverage | cycles |
| Maximum receivable concentration | % |
| Major unplanned expense threshold | $ |
| Maximum closure or downtime before escalation | days |
| Funding packet preparation trigger | weeks before projected gap |

## Standard Zone Logic

### Green Zone

Ending cash remains at or above:

**Protected Minimum + Safety Buffer**

Critical obligations remain covered and no material breach is projected inside the Yellow look-ahead window.

### Yellow Zone

One or more of the following applies:

- Ending cash falls below the Green threshold
- Ending cash falls below the protected minimum but remains nonnegative
- The protected minimum is projected to be breached inside the Yellow look-ahead window
- Payroll coverage falls below the owner-defined minimum
- A major receivable, repair, closure, or supplier issue could materially reduce cash
- The funding gap is positive under a realistic scenario

### Red Zone

One or more of the following applies:

- Ending cash becomes negative
- Payroll cannot be fully paid when due
- Rent, taxes, insurance, debt, utilities, or a critical supplier cannot be paid when due
- Operations cannot continue safely without immediate intervention
- A confirmed disruption materially exceeds the approved scenario
- A funding or continuity decision requires immediate human escalation

A business can enter Red before cash is negative when a critical legal, safety, payroll, or operational obligation is at risk.

---

# 2. Default Response Deadlines

These are recommended operating defaults. The business may adopt stricter deadlines.

| Zone | Response Deadline |
|---|---|
| Green | Complete routine review on the scheduled weekly review date |
| Yellow | Assign actions within 1 business day and rerun the forecast after material changes |
| Red | Escalate the same business day; address payroll, safety, legal, and operating continuity first |

---

# 3. Responsibility Map

Small businesses may assign several roles to the same person. Name the actual owner for each role.

| Role | Responsibility | Named Owner |
|---|---|---|
| Decision Owner | Approves actions, spending changes, reserve use, and financing discussions | |
| Forecast Owner | Updates actuals, receivables, obligations, and scenario assumptions | |
| Collections Owner | Follows up on receivables and deposit requirements | |
| Operations Owner | Manages capacity, repairs, closures, staffing, and recovery | |
| Document Owner | Maintains financial statements, bank statements, estimates, insurance, and funding documents | |
| Advisor Contact | Accountant, bookkeeper, attorney, insurance professional, or funding advisor | |
| Communications Owner | Contacts employees, customers, vendors, and partners when required | |

---

# 4. Green-Zone Playbook

## Green Objective

Maintain visibility, preserve the buffer, and prevent routine issues from becoming Yellow events.

| Trigger | Required Action | Default Owner | Deadline | Evidence |
|---|---|---|---|---|
| Weekly forecast due | Replace completed week with actual results and reconcile ending cash | Forecast Owner | Weekly review date | Updated 13-week forecast |
| Receivables reviewed | Confirm amount, payer, and expected collection week | Collections Owner | Weekly | AR list with next action |
| Cash above Green threshold | Maintain ordinary operations and reserve discipline | Decision Owner | Ongoing | Reconciled cash balance |
| Major equipment dependency exists | Maintain service, backup, rental, and vendor information | Operations Owner | Review monthly | Continuity notes and vendor contacts |
| Funding documents aging | Update bank statements, P&L, balance sheet, AR, AP, and debt schedule | Document Owner | Monthly or after material change | Current document packet |
| Insurance renewal or operational change | Confirm coverage, deductibles, limits, exclusions, and claims contacts with a qualified professional | Decision Owner | Before renewal/change | Current policy records |

## Green Rules

- Do not use reserves simply because they exist.
- Do not treat unused credit as cash.
- Keep the forecast current even when business feels stable.
- Maintain a documented list of the business’s most expensive points of failure.

---

# 5. Yellow-Zone Playbook

## Yellow Objective

Protect cash, accelerate information, assign owners, and prevent the projected breach from reaching Red.

| Trigger | Required Action | Default Owner | Deadline | Evidence |
|---|---|---|---|---|
| Cash falls below Green threshold | Freeze or review discretionary spending | Decision Owner | 1 business day | Approved spending list |
| Protected minimum projected to be breached | Rerun baseline and all active scenarios | Forecast Owner | 1 business day | Updated scenario comparison |
| Receivable is late or concentrated | Start documented collection follow-up and confirm revised payment date | Collections Owner | Same or next business day | Contact log and revised date |
| Revenue declines beyond plan | Review deposits, pricing, scheduling, offers, and near-term pipeline | Decision + Sales Owner | 1 business day | Revenue response plan |
| Payroll coverage declines | Confirm payroll timing, staffing schedule, receivables, and available response levers | Decision + Forecast Owner | Same business day | Payroll coverage review |
| Major repair estimate exceeds threshold | Compare repair, rental, replacement, outsourcing, and downtime paths | Operations Owner | Before commitment | Written option comparison |
| Closure or reduced capacity begins | Track lost or delayed revenue, payroll, cleanup, refunds, and reopening costs separately | Operations + Forecast Owner | Daily during event | Disruption log |
| Positive funding gap appears | Prepare current documents and use-of-funds schedule without assuming approval | Document Owner | Within 2 business days | Funding-readiness packet |
| Insurance may apply | Contact the qualified insurer or agent and document claim requirements | Decision Owner | Promptly after event | Claim instructions and records |

## Yellow Response Sequence

1. Reconcile current cash.
2. Confirm the disruption and its timing.
3. Freeze unapproved discretionary outflows.
4. Update receivable dates and collection actions.
5. Protect payroll and critical obligations.
6. Compare operational response levers.
7. Prepare the document packet.
8. Rerun the 13-week model.
9. Escalate to Red when a critical obligation becomes vulnerable.

---

# 6. Red-Zone Playbook

## Red Objective

Protect people, legal obligations, critical operations, and decision quality. Avoid making irreversible commitments from incomplete information.

| Trigger | Required Action | Default Owner | Deadline | Evidence |
|---|---|---|---|---|
| Ending cash is projected negative | Convene immediate financial and operating review | Decision Owner | Same business day | Updated cash position and action log |
| Payroll cannot be fully covered | Escalate to qualified payroll, accounting, legal, or financial support as appropriate | Decision Owner | Same business day | Payroll obligation review |
| Rent, tax, insurance, debt, utility, or critical supplier is at risk | Contact the appropriate qualified professional or counterparty before the due date when possible | Decision Owner | Same business day | Contact record and options |
| Operations are unsafe or impossible | Suspend or modify operations as required and activate continuity procedures | Operations Owner | Immediately | Incident and continuity log |
| Repair or closure cost materially exceeds plan | Rebuild the scenario using confirmed estimates | Forecast + Operations Owner | Same business day | Revised stacked scenario |
| Sensitive financial documents must be shared | Use a secure, approved channel and minimum necessary disclosure | Document Owner | Before sharing | Consent and access record |
| Financing discussion is initiated | Present the gap, timing, use of funds, actions taken, repayment considerations, and risks | Decision + Document Owner | Before submission | Lender/advisor summary |
| Proposed funding cost or repayment is unclear | Pause commitment and obtain complete terms and qualified review | Decision Owner | Before acceptance | Written terms and comparison |

## Red Priority Order

1. Safety and legal obligations
2. Payroll and critical operating continuity
3. Current cash reconciliation
4. Confirmed receivables and obligations
5. Vendor, customer, employee, and advisor communication
6. Capacity-restoration options
7. Secure liquidity review
8. Updated recovery plan

## Red Guardrails

- Do not guarantee funding or assume eligibility.
- Do not submit an application without user authorization.
- Do not share sensitive information through an unapproved endpoint.
- Do not treat a short-term loan as a repair for structurally negative economics.
- Do not count expected insurance or assistance funds before receipt timing is supported.

---

# 7. Trigger Matrix by Stress-Test Output

| Output | Green | Yellow | Red |
|---|---|---|---|
| Ending cash | At/above minimum + buffer | Below Green threshold but nonnegative | Negative or critical obligation at risk |
| Protected-minimum runway | Outside look-ahead window | Breach inside look-ahead window | Already breached with no approved recovery action |
| Positive-cash runway | No negative week in horizon | Negative week appears later in horizon | Negative week is imminent or current |
| Payroll coverage | At/above target cycles | Below target cycles | Next payroll not fully covered |
| Funding gap | Zero | Positive but manageable with defined actions | Material unresolved gap affecting critical obligations |
| Receivable timing | On schedule and diversified | Late, concentrated, or uncertain | Required cash is not expected before critical due date |
| Equipment capacity | Operating with backup plan | At risk or partially reduced | Failed with no safe continuity path |
| Weather/closure | No material interruption | Reduced capacity or short closure | Extended closure or unsafe operations |
| Recovery | Above minimum for two consecutive weeks | Recovery depends on uncertain event | No recovery within horizon |

---

# 8. If-Then Trigger Templates

Create at least five business-specific rules.

## Cash Threshold

> **If** projected ending cash falls below **$________** by **Week ________**, **then** ______________________________ will complete ______________________________ by __________________.

## Payroll

> **If** payroll coverage falls below **________ cycles**, **then** ______________________________ will review receivables, staffing, cash timing, and escalation options by __________________.

## Receivable Delay

> **If** a receivable of **$________** is delayed beyond __________________, **then** ______________________________ will contact the customer, revise the collection week, and rerun the forecast by __________________.

## Equipment Failure

> **If** repair or replacement cost exceeds **$________** or downtime exceeds **________ days**, **then** ______________________________ will compare repair, rental, replacement, outsourcing, and delayed-work options before approval.

## Weather Closure

> **If** operations are closed or materially reduced for more than **________ days**, **then** ______________________________ will activate the closure log, customer communication plan, insurance review, and stacked scenario.

## Funding Packet

> **If** a positive funding gap appears within **________ weeks**, **then** ______________________________ will update bank statements, financial reports, debt schedule, use-of-funds plan, and the lender/advisor summary within __________________.

---

# 9. Weekly Trigger Review Agenda

Use this 15–30 minute agenda:

1. Confirm current available cash.
2. Replace the completed week with actual cash activity.
3. Review receivables and revised collection dates.
4. Review obligations due in the next three weeks.
5. Review active shocks and new operating risks.
6. Recalculate baseline and stacked scenario.
7. Identify current zone.
8. Assign actions, owners, and deadlines.
9. Update the document packet when Yellow or Red.
10. Record decisions and assumptions.

---

# 10. Trigger Action Log

| Date | Zone | Trigger | Scenario / Week | Action | Owner | Deadline | Status | Evidence / Link | Result |
|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | |

---

# 11. Funding-Readiness Trigger

Prepare the funding packet when:

- A positive funding gap remains after reasonable operational levers are modeled
- The gap occurs inside the owner-defined preparation window
- Payroll, rent, taxes, critical suppliers, or capacity restoration may be affected
- The business can explain the disruption, amount, timing, use of funds, recovery plan, and repayment considerations

Do not interpret this trigger as a recommendation to borrow or a statement that the business qualifies.

---

# 12. Completion Checklist

- [ ] Protected minimum defined
- [ ] Green safety buffer defined
- [ ] Yellow look-ahead window defined
- [ ] Payroll coverage threshold defined
- [ ] Owners assigned
- [ ] Response deadlines approved
- [ ] Green routine documented
- [ ] Yellow response sequence documented
- [ ] Red escalation contacts documented
- [ ] At least five if-then rules completed
- [ ] Funding packet trigger defined
- [ ] Trigger action log created
- [ ] Weekly review scheduled
- [ ] Sensitive-data handling rules reviewed
