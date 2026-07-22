# Lender or Advisor Summary Template

## Purpose

This file defines the one-page summary format used by **Cash Flow Stress-Test Copilot** to present a business’s 13-week cash-flow baseline, modeled disruption, estimated cash pressure, response actions, document status, and recovery assumptions.

The summary is designed for:

- Lenders and funding providers
- Accountants and bookkeepers
- Business advisors
- Insurance professionals
- Internal owners and managers

> **Important:** This summary supports a financial conversation. It does not guarantee approval, establish eligibility, provide professional advice, or replace independent review.

---

# Copy-and-Paste One-Page Template

## Cash Flow Stress-Test Summary

**Prepared for:**  
**Prepared by:**  
**Prepared date:**  
**Forecast period:**  
**Currency:**  

---

## 1. Business Overview

**Business name:**  
**Business type / industry:**  
**Primary location:**  
**Years in business:**  
**Owner or authorized contact:**  
**Average monthly revenue:**  
**Current available business cash:**  
**Protected minimum cash balance:**  
**Available reserve cash:**  
**Available credit:**  
*Available credit is listed separately and is not counted as cash unless a draw is modeled.*

---

## 2. Situation Summary

**Primary disruption:**  
**Scenario type:** Slow week / Equipment failure / Weather closure / Delayed receivable / Stacked shock / Custom  
**Start week or date:**  
**Expected duration:**  
**Operational effect:**  
**Direct cash cost:**  
**Estimated revenue lost:**  
**Estimated revenue delayed:**  
**Additional operating costs:**  
**Insurance or assistance assumptions:**  
**Confidence level:** Confirmed / Estimated / Unknown  

### Plain-English Summary

[Describe what happened, why it affects cash timing, and which obligations are most exposed. Keep this section factual, concise, and free of approval claims.]

---

## 3. 13-Week Stress-Test Results

| Measure | Baseline | Stress Scenario | Difference |
|---|---:|---:|---:|
| Lowest projected cash balance | $ | $ | $ |
| Week of lowest cash balance | | | |
| First week below protected minimum | | | |
| First negative-cash week | | | |
| Protected-minimum runway | weeks | weeks | weeks |
| Positive-cash runway | weeks | weeks | weeks |
| Payroll coverage | cycles | cycles | cycles |
| Estimated funding gap | $ | $ | $ |
| Recovery week | | | |

### Funding Gap Definition

**Estimated Funding Gap = max(0, Protected Minimum Cash Balance − Lowest Projected Cash Balance)**

This figure estimates the amount needed to keep modeled cash at the protected minimum. It is not automatically the recommended borrowing amount.

---

## 4. Main Cash-Pressure Drivers

1.  
2.  
3.  

Examples may include:

- Revenue decline
- Delayed receivable
- Repair or replacement cost
- Payroll timing
- Supplier obligations
- Rent
- Insurance deductible
- Closure costs
- Recovery costs
- Existing debt payments

---

## 5. Actions Already Taken

- [ ] Accelerated receivable collection
- [ ] Required deposits on new work
- [ ] Reduced discretionary spending
- [ ] Reduced owner distributions
- [ ] Negotiated supplier timing
- [ ] Negotiated payment timing
- [ ] Used reserve cash
- [ ] Filed an insurance claim
- [ ] Rented temporary equipment
- [ ] Outsourced work
- [ ] Adjusted staffing or scheduling
- [ ] Prepared financial documents
- [ ] Other: __________________________

---

## 6. Response-Lever Comparison

| Response Lever | Amount / Effect | New Lowest Cash | Gap Reduction | Trade-Off |
|---|---:|---:|---:|---|
| Accelerate receivables | $ | $ | $ | |
| Freeze discretionary spending | $ | $ | $ | |
| Reduce owner distributions | $ | $ | $ | |
| Use reserves | $ | $ | $ | |
| Negotiate payment timing | $ | $ | $ | |
| Add working capital | $ | $ | $ | |

**Best modeled response lever:**  
**Reason:**  
**Remaining risk:**  

---

## 7. Use of Funds Under Review

| Use | Amount | Timing | Supporting Document |
|---|---:|---:|---|
| Repair or replacement | $ | | |
| Payroll | $ | | |
| Rent / occupancy | $ | | |
| Supplier / inventory | $ | | |
| Temporary operations | $ | | |
| Insurance deductible | $ | | |
| Recovery cost | $ | | |
| Contingency | $ | | |
| Other | $ | | |
| **Total** | **$** | | |

---

## 8. Recovery Plan

**Expected operational recovery:**  

**Expected cash-flow recovery week:**  

**Expected source of repayment or cash replenishment:**  

**Actions supporting recovery:**

1.  
2.  
3.  

**Main recovery risks:**

1.  
2.  
3.  

> Do not describe repayment as guaranteed. Identify assumptions that could delay recovery.

---

## 9. Documents Available

- [ ] Recent bank statements
- [ ] Current profit-and-loss statement
- [ ] Current balance sheet
- [ ] Accounts receivable aging
- [ ] Accounts payable aging
- [ ] Existing debt schedule
- [ ] Payroll schedule
- [ ] Repair or replacement estimate
- [ ] Insurance documents
- [ ] Closure or incident support
- [ ] 13-week baseline
- [ ] Stress-test output
- [ ] Use-of-funds schedule
- [ ] Recovery plan

**Missing or outdated documents:**  

---

## 10. Assumptions and Limitations

### User-Provided Facts

-  
-  
-  

### Calculated Results

-  
-  
-  

### Assumptions

-  
-  
-  

### Missing Information

-  
-  
-  

---

## 11. Requested Discussion

Choose one:

- [ ] Review the cash-flow assumptions
- [ ] Review the recovery plan
- [ ] Review operational options
- [ ] Discuss appropriate funding options
- [ ] Review insurance implications
- [ ] Review document gaps
- [ ] Other: __________________________

---

## Compliance-Safe Closing

This summary is based on the information and assumptions listed above. It is intended to support planning and discussion. It does not guarantee funding, insurance reimbursement, eligibility, rates, terms, approval, or financial performance. Any financing, insurance, accounting, tax, legal, or underwriting decision remains subject to independent review and applicable requirements.

---

# GPT Completion Rules

Before generating the final summary, the GPT must:

1. Confirm the selected scenario.
2. Confirm the protected minimum cash balance.
3. Reconcile the 13-week cash chain.
4. Separate baseline, scenario, and response-lever results.
5. Separate lost revenue from delayed revenue.
6. List assumptions and missing information.
7. Avoid counting available credit as cash unless drawn.
8. Avoid counting insurance proceeds before the modeled receipt week.
9. Avoid implying approval or provider suitability.
10. Ask for confirmation before sending or saving the summary through an Action.

---

# Recommended Filename

`cash-flow-stress-test-summary-[business-name]-[YYYY-MM-DD].md`
