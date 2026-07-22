# Business Continuity Resource Directory

## Purpose

This directory gives **Cash Flow Stress-Test Copilot** a curated set of public resources for weather monitoring, emergency planning, disaster declarations, recovery centers, insurance navigation, tax relief, and small-business recovery support.

**Last verified:** July 22, 2026

> Resource availability, program rules, declarations, deadlines, and eligibility may change. The GPT should verify current details before relying on a resource, clearly identify the source, and never imply eligibility or approval.

---

# 1. Immediate Safety

## Emergency Services

**Use:** Immediate danger to life, fire, crime, or urgent medical need  
**Action:** Call 911 in the United States when appropriate.

The GPT must not substitute a financial workflow for emergency instructions.

## Local Public-Safety Authorities

**Use:** Evacuation orders, road closures, boil-water notices, local shelter information, facility reentry, and local emergency rules.

Recommended sources:

- City or county emergency-management office
- Local fire department
- Local law enforcement
- State department of transportation
- Local utility provider
- Local public-health department

Use official local sources before social-media summaries.

---

# 2. Weather and Hazard Monitoring

## National Weather Service

**URL:** https://www.weather.gov/

**Use for:**

- Active alerts
- Local forecasts
- Radar
- Flood, heat, wind, fire-weather, winter, tropical, and severe-weather information
- Public CAP and ATOM alert feeds

**GPT usage rule:** Treat alerts and forecasts as current public information, not certainty. Include the location and retrieval time.

## NWS API

**URL:** https://www.weather.gov/documentation/services-web-api

**Use for:**

- Machine-readable forecasts
- Alerts
- Observation stations
- Zones and grid data

**Action design note:** A public no-auth or controlled proxy Action may retrieve NWS data. Do not send user financial information to a weather endpoint.

## National Hurricane Center

**URL:** https://www.nhc.noaa.gov/

**Use for:**

- Tropical cyclones
- Forecast advisories
- Watches and warnings
- Storm-surge and rainfall context

## NOAA Weather Radio

**URL:** https://www.weather.gov/nwr/

**Use for:** Official warning broadcasts and local alert coverage.

---

# 3. Business Emergency Planning

## Ready.gov Business Emergency Plans

**URL:** https://www.ready.gov/business/emergency-plans

**Use for:**

- Business continuity planning
- Crisis communications
- Emergency response
- IT disaster recovery
- Continuity-team planning

Recommended GPT prompt:

> Use this resource to create an operational continuity checklist. Do not treat it as a financial forecast or professional compliance review.

## Ready.gov Business

**URL:** https://www.ready.gov/business

**Use for:** General preparedness, continuity, response, and recovery planning.

## FEMA Continuity Resources

**URL:** https://www.fema.gov/emergency-managers/national-preparedness/continuity

**Use for:** Continuity concepts, planning resources, and organizational resilience.

---

# 4. Disaster Declarations and Recovery Locations

## FEMA Disaster Declarations

**URL:** https://www.fema.gov/disaster/declarations

**Use for:**

- Searching active and historical federal disaster declarations
- Reviewing designated areas
- Confirming declaration numbers
- Identifying declaration dates and incident periods

**GPT rule:** A declaration does not automatically mean a specific business or expense qualifies for assistance.

## FEMA Disaster Recovery Center Locator

**URL:** https://egateway.fema.gov/ESF6/DRCLocator

**Use for:**

- Locating open Disaster Recovery Centers
- Reviewing hours and services
- Obtaining in-person assistance and referrals

FEMA states that the locator provides current center information and may help users learn about FEMA and SBA programs.

## FEMA Location Search

**URL:** https://www.fema.gov/locations

**Use for:** State, territory, tribal, and regional disaster information.

## State Emergency Management Directory

**URL:** https://www.usa.gov/state-emergency-management

**Use for:** Finding the official emergency-management agency for a state or territory.

---

# 5. Federal Disaster and Business Recovery Assistance

## U.S. Small Business Administration Disaster Assistance

**URL:** https://www.sba.gov/funding-programs/disaster-assistance

**Use for:**

- Current declared-disaster assistance
- Business physical disaster loans
- Economic Injury Disaster Loans
- Mitigation information
- Application and status resources

SBA identifies disaster assistance for eligible businesses and other applicants affected by declared disasters. Program terms, geography, deadlines, and eligibility vary.

## SBA Economic Injury Disaster Loans

**URL:** https://www.sba.gov/funding-programs/disaster-assistance/economic-injury-disaster-loans

**Use for:** Reviewing current official information about disaster-related working-capital assistance.

**GPT rules:**

- Do not imply eligibility.
- Do not quote stale rates or deadlines from memory.
- Verify the active declaration and current program page.
- Do not add proceeds to cash before a supported receipt week.
- Keep physical-damage and working-capital uses distinct.

## SBA Local Assistance

**URL:** https://www.sba.gov/local-assistance

**Use for:** Finding SBA district offices and resource partners.

## DisasterAssistance.gov

**URL:** https://www.disasterassistance.gov/

**Use for:** Federal disaster-assistance information and application routing for eligible individuals and households; business owners should also review SBA resources.

Do not assume every business need is handled through the same application.

---

# 6. Tax Relief and Record Reconstruction

## IRS Disaster Assistance for Individuals and Businesses

**URL:** https://www.irs.gov/businesses/small-businesses-self-employed/disaster-assistance-and-emergency-relief-for-individuals-and-businesses

**Use for:**

- Current federal disaster tax-relief information
- Covered-area guidance
- Record reconstruction
- Disaster-related tax resources
- Business casualty and loss workbooks

The IRS explains that qualifying relief may include postponed filing or payment deadlines for affected taxpayers under applicable declarations and rules.

**GPT rules:**

- Do not provide tax advice.
- Do not describe a deadline extension as a grant or cash inflow.
- Verify the affected location, declaration, tax period, and current IRS notice.
- Refer users to a qualified tax professional for application to their facts.

## IRS Tax Relief in Disaster Situations

**URL:** https://www.irs.gov/newsroom/tax-relief-in-disaster-situations

**Use for:** Current state- or disaster-specific notices.

## IRS Publication 584-B

**URL:** https://www.irs.gov/forms-pubs/about-publication-584-b

**Use for:** Business casualty, disaster, and theft loss record organization.

---

# 7. Insurance Navigation

## National Association of Insurance Commissioners — Natural Disasters

**URL:** https://content.naic.org/consumer/natural-disasters

**Use for:**

- General claims-navigation resources
- Disaster-preparation information
- Finding state insurance-regulator support
- Understanding that some hazards may require separate coverage

**GPT rules:**

- Do not interpret policy coverage.
- Do not state that a loss is covered.
- Direct policy and claims questions to the insurer, licensed professional, or state insurance department.
- Count proceeds only when timing and amount are supportable.

## State Insurance Department Directory

**URL:** https://content.naic.org/state-insurance-departments

**Use for:** Finding the appropriate state insurance regulator.

## National Flood Insurance Program

**URL:** https://www.floodsmart.gov/

**Use for:** Official flood-insurance information and policyholder resources.

Coverage depends on the actual policy and circumstances.

---

# 8. Small-Business Counseling and Recovery Support

## Small Business Development Centers

**URL:** https://www.sba.gov/local-assistance/resource-partners/small-business-development-centers-sbdc

**Use for:** Locating SBDC counseling and business-advisory support.

## SCORE Disaster Preparation and Recovery

**URL:** https://www.score.org/disaster-prep-recovery/

**Use for:**

- Small-business preparedness education
- Recovery planning resources
- Mentoring and workshops

SCORE content may support planning but does not replace official program terms or professional advice.

## Women’s Business Centers

**URL:** https://www.sba.gov/local-assistance/resource-partners/womens-business-centers

**Use for:** Business counseling and training through SBA resource partners.

## Veterans Business Outreach Centers

**URL:** https://www.sba.gov/local-assistance/resource-partners/veterans-business-outreach-center-vboc-program

**Use for:** Business support for eligible veterans, service members, and military spouses.

---

# 9. Utility, Communications, and Infrastructure

Use official providers for:

- Power-outage maps
- Restoration estimates
- Water-service notices
- Gas-service notices
- Internet or telecom outages
- Road closures
- Public transit interruptions

Recommended source order:

1. Official utility
2. State or local emergency-management agency
3. State department of transportation
4. Local government
5. National Weather Service
6. Verified service provider

Do not use unverified crowdsourced outage reports as the sole source for a financial decision.

---

# 10. Cyber and Data Continuity

## Cybersecurity and Infrastructure Security Agency

**URL:** https://www.cisa.gov/topics/cyber-threats-and-advisories

**Use for:** Current cyber advisories and operational security information.

## CISA Cyber Guidance for Small Businesses

**URL:** https://www.cisa.gov/audiences/small-and-medium-businesses

**Use for:** Small-business cybersecurity and resilience guidance.

## NIST Small Business Cybersecurity Corner

**URL:** https://www.nist.gov/itl/smallbusinesscyber

**Use for:** Cybersecurity planning resources for small businesses.

A cyber incident may require a separate operational and financial scenario. Do not mix credentials or incident secrets into ordinary cash-flow prompts.

---

# 11. Resource Verification Workflow

Before the GPT recommends a current program or alert:

1. Identify the user’s location.
2. Identify the event and date.
3. Open the official source.
4. Confirm the page is current.
5. Check geographic scope.
6. Check eligibility language.
7. Check deadlines.
8. Check allowed uses.
9. State what remains unknown.
10. Avoid adding unapproved assistance to the forecast.

## Source Label Format

```text
Source:
Agency:
Page:
Retrieved:
Location or declaration:
What the source confirms:
What the source does not confirm:
```

---

# 12. Funding and Assistance Modeling Rules

The directory may identify potential resources, but the cash-flow model should not count assistance unless there is a documented assumption for:

- Program
- Amount
- Status
- Expected receipt week
- Use restrictions
- Repayment obligation
- Confidence level

Use the following status values:

- Resource identified
- Potentially relevant
- Application planned
- Application submitted
- Under review
- Approved
- Received
- Denied
- Unknown

Only `Received`, or a clearly supported expected receipt explicitly chosen by the user, should enter the main forecast.

---

# 13. Scam and Impersonation Warning

After disasters, users may encounter fraudulent websites, calls, messages, invoices, or funding offers.

The GPT should advise users to:

- Use official government domains for public programs
- Verify lenders, insurers, contractors, and advisors independently
- Avoid sharing credentials or full account information in chat
- Avoid paying advance fees solely to “unlock” government assistance
- Confirm communications through official contact channels
- Review agreements before signing

Do not accuse a specific provider of fraud without evidence.

---

# 14. GPT Response Template

When recommending resources, return:

1. **Immediate safety source**
2. **Weather or incident source**
3. **Declaration source**
4. **Business recovery source**
5. **Insurance source**
6. **Tax or record source**
7. **Local counseling source**
8. **What each source may help with**
9. **What remains unverified**
10. **How the resource affects—or does not yet affect—the cash forecast**

---

# Source Notes

This directory prioritizes official and primary sources, including:

- National Weather Service
- NOAA
- Ready.gov
- FEMA
- U.S. Small Business Administration
- Internal Revenue Service
- USAGov
- National Association of Insurance Commissioners
- CISA
- NIST

SCORE is included as a small-business education and mentoring resource, not as an official source of program eligibility.

---

# Final Principle

A resource link is not cash. Verify the program, status, amount, timing, and restrictions before the forecast counts a dollar.
