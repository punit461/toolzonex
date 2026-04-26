# India Income Tax Knowledge Base for AI Tax Calculator

**Version target:** FY 2025-26 / AY 2026-27  
**Jurisdiction:** India  
**Primary use case:** Consumer and SMB-oriented income tax calculation, guidance, and rule evaluation for individuals  
**Source strategy:** Official Income Tax Department pages first, with reputable secondary sources used only to fill current-year slab and implementation gaps where official pages are not easily machine-consumable.[cite:2][cite:16][cite:17]

## Purpose

This document is designed as an implementation-ready knowledge base for an AI-assisted Indian income tax application. It is not a reproduction of the full Income-tax Act, 1961. Instead, it converts the most relevant consumer tax rules into a structured product document that can be used by an AI coding assistant or rule engine to implement calculations, validations, UI flows, and recommendations.[cite:2][cite:11][cite:16]

The focus is on the most common app scenarios: salaried taxpayers, pensioners, freelancers, professionals, small business users, landlords, and investors. These user groups align closely with the Income Tax Department’s e-filing guidance for individuals and individual business/profession taxpayers, and they map directly to the main return forms used in practice.[cite:2][cite:11][cite:37]

## Scope

This knowledge base covers the following implementation areas:[cite:2][cite:11][cite:16][cite:22]

- Taxpayer classification and residency handling.[cite:2][cite:11]
- New vs old regime decision logic.[cite:17][cite:35]
- Slab tax calculation for FY 2025-26 / AY 2026-27.[cite:1][cite:6][cite:12]
- Rebate under Section 87A.[cite:31][cite:38]
- Health and education cess and surcharge sequencing.[cite:8][cite:32][cite:44]
- Income heads: salary, house property, business/profession, capital gains, and other sources.[cite:2][cite:10][cite:11]
- Deductions and exemptions relevant to individuals.[cite:16]
- Capital gains special-rate and exemption handling.[cite:10][cite:21][cite:24][cite:30]
- TDS, TCS, AIS, TIS, advance tax, and tax-credit reconciliation.[cite:22][cite:28][cite:39]
- ITR form recommendation logic.[cite:2][cite:11][cite:37]

This knowledge base does not replace legal review, Finance Act text, CBDT notifications, or professional advice for litigation-sensitive cases. It should be treated as an implementation specification layer built on top of current official guidance and current-year public tax references.[cite:16][cite:17][cite:37]

## Product architecture view

A tax calculator app should not be implemented as one large formula. It should be implemented as a sequence of rule engines, because normal slab tax, special-rate tax, deductions, credits, and compliance recommendations each behave differently.[cite:10][cite:16][cite:21]

A practical architecture is:

1. **Profile engine**: taxpayer type, age, residency, filing context, and regime eligibility.[cite:2][cite:11]
2. **Income engine**: compute income under each head separately.[cite:2][cite:10][cite:11]
3. **Deduction/exemption engine**: apply rule-based claims subject to regime and section conditions.[cite:16][cite:17]
4. **Capital gains engine**: separately compute special-rate and exemption-driven gains.[cite:10][cite:21][cite:24][cite:30]
5. **Tax engine**: slab tax, special-rate tax, rebate, surcharge, and cess.[cite:1][cite:6][cite:31][cite:44]
6. **Credit engine**: TDS, TCS, advance tax, self-assessment tax, and AIS/TIS reconciliation.[cite:22][cite:28][cite:39]
7. **Compliance engine**: ITR recommendation, warning flags, and document checklist.[cite:2][cite:11][cite:37]

## Taxpayer classes

The minimum taxpayer classes that should be supported in the application are listed below.[cite:2][cite:11][cite:37]

| Taxpayer class | Why it matters in product logic | Main return impact |
|---|---|---|
| Resident individual | Base case for most consumer users.[cite:2] | Often ITR-1 or ITR-2 depending on income mix.[cite:37] |
| Senior citizen / super senior citizen | Old-regime exemption thresholds and compliance treatment can differ by age.[cite:11] | Affects old-regime computation and filing UX.[cite:11] |
| Non-resident / RNOR individual | Income scope and form applicability can differ.[cite:37] | Usually pushes to broader return logic.[cite:37] |
| Salaried individual | Salary exemptions, TDS, and Form 16 style flows dominate.[cite:2] | Common ITR-1 / ITR-2 flow.[cite:2][cite:37] |
| Freelancer / professional | Business or profession rules apply; presumptive logic may be relevant.[cite:11] | Usually ITR-3 or ITR-4.[cite:37] |
| Small business individual | Business income and audit/presumptive questions matter.[cite:11] | Usually ITR-3 or ITR-4.[cite:37] |
| Investor | Capital gains and dividend/interest classification become important.[cite:10][cite:22] | Often ITR-2 or ITR-3.[cite:37] |
| Landlord | House property loss, interest, and self-occupied/let-out branching are needed.[cite:2] | Often ITR-1 or ITR-2 depending on details.[cite:2][cite:37] |

## Regime model

The app should treat the tax regime as a first-class decision object. Current official FAQ material confirms that the new regime is the default regime, while the old regime remains available subject to the applicable option rules.[cite:17][cite:35]

### Regime design principles

- Do not assume all users want the new regime even if it is the default.[cite:17]
- Do not assume all deductions are available across both regimes.[cite:17][cite:16]
- Keep regime eligibility and regime comparison separate from basic income computation.[cite:17][cite:35]
- Version regime rules by assessment year because Finance Act changes can alter deductions, rebate, or slab structure.[cite:37][cite:38]

### Suggested regime fields

```json
{
  "assessment_year": "2026-27",
  "default_regime": "new",
  "selected_regime": "new|old|compare",
  "regime_change_allowed": true,
  "business_income_present": false,
  "option_filing_required": false,
  "regime_locked_for_year": false,
  "notes": []
}
```

## Slab rules for FY 2025-26 / AY 2026-27

### New regime slabs

Current FY 2025-26 / AY 2026-27 public sources consistently reflect the following new-regime slab structure.[cite:1][cite:6][cite:12]

| Total income band | Rate |
|---|---|
| Up to ₹4,00,000 | Nil [cite:1][cite:6] |
| ₹4,00,001 to ₹8,00,000 | 5% [cite:1][cite:6] |
| ₹8,00,001 to ₹12,00,000 | 10% [cite:1][cite:6] |
| ₹12,00,001 to ₹16,00,000 | 15% [cite:1][cite:6] |
| ₹16,00,001 to ₹20,00,000 | 20% [cite:1][cite:6] |
| ₹20,00,001 to ₹24,00,000 | 25% [cite:1][cite:6] |
| Above ₹24,00,000 | 30% [cite:1][cite:6] |

### Old regime

The old regime continues to remain relevant for users who validly choose it, and it should be preserved in the app as a separate branch with age-aware computation logic for applicable users.[cite:2][cite:11][cite:17] The safest implementation pattern is to keep old-regime slab thresholds in a versioned configuration file rather than burying them in application code.[cite:11][cite:37]

## Rebate under Section 87A

Rebate is often mishandled in retail calculators, so it should be implemented as a dedicated rule block rather than folded into slab logic.[cite:31][cite:38]

### Core rules

- Rebate under Section 87A applies only to resident individuals.[cite:31]
- Under the old regime, current references continue to reflect rebate availability where total income does not exceed ₹5 lakh, subject to the statutory rebate cap.[cite:31][cite:44]
- Under the new regime, current FY 2025-26 references reflect expanded relief aligned to the revised slab structure and Budget-era changes, so the app should store this as a year-specific configurable rule instead of hardcoded prose.[cite:8][cite:32][cite:38]
- Rebate should be computed before cess and after computing tax on relevant income.[cite:8][cite:32]

### Suggested rule object

```json
{
  "section": "87A",
  "resident_only": true,
  "regime": "new|old",
  "income_threshold": 0,
  "rebate_cap": 0,
  "marginal_relief_rule": true,
  "applies_before_cess": true,
  "assessment_year": "2026-27"
}
```

## Tax sequencing

A robust tax engine should apply the following sequence for most individual use cases.[cite:8][cite:31][cite:44]

1. Compute taxable income under normal rates and special rates separately.[cite:10][cite:24][cite:30]
2. Compute normal slab tax.[cite:1][cite:6]
3. Add special-rate tax blocks for eligible capital gains or other special incomes.[cite:24][cite:30]
4. Apply rebate under Section 87A if eligible.[cite:31][cite:38]
5. Apply surcharge and marginal relief where relevant.[cite:44]
6. Apply health and education cess.[cite:8][cite:32]
7. Reduce prepaid taxes and tax credits.[cite:22][cite:28][cite:39]
8. Arrive at net payable or refundable amount.[cite:22][cite:28]

## Income heads

The rule engine should separate income into statutory heads because exemptions, losses, rates, and ITR eligibility depend on the head under which income is classified.[cite:2][cite:10][cite:11]

### Salary and pension

Salary computation should support at least these input components: basic salary, HRA, special allowance, bonus, employer PF, professional tax, perquisites, exempt allowances, and pension fields where relevant.[cite:2][cite:17] The old regime and new regime must branch on exemption availability, especially for HRA and other salary-linked exemptions.[cite:17]

### House property

The house property module should support self-occupied, let-out, and deemed-let-out flows, together with municipal taxes, interest on borrowed capital, and co-ownership scenarios where applicable.[cite:2] Even if an MVP does not support every loss-setoff nuance, the data model should keep those fields because they affect tax outcome and ITR selection.[cite:2][cite:37]

### Business or profession

The app should distinguish between non-presumptive business/profession cases and presumptive cases. Official help content explicitly separates individual business/profession taxpayers from salaried individuals, which is a strong signal that the UX and rule engine should also treat them separately.[cite:11][cite:2]

### Capital gains

Capital gains require a standalone engine because tax rates, exemptions, and thresholds vary by asset type, holding period, and section.[cite:10][cite:21][cite:24][cite:30] A calculator that mixes capital gains into slab income without classification will produce incorrect results.[cite:24][cite:30]

### Other sources

The app should support interest income, dividend income, family pension where applicable, and miscellaneous taxable receipts. AIS/TIS integration is especially useful for this head because many users forget to declare bank interest, dividends, or other auto-reported transactions.[cite:22][cite:28]

## Deductions and exemptions

The official Income Tax Department deductions page is the most useful single source for app-level implementation of common Chapter VI-A deductions.[cite:16] It also explicitly states that deductions under Sections 80C to 80U are allowed from gross total income and cannot exceed the gross total income, which is an important validation rule.[cite:16]

### Master design rule

Every deduction or exemption should be stored as a rule object with these fields:

```json
{
  "section": "80C",
  "title": "Specified investments/payments",
  "allowed_regimes": ["old"],
  "assessment_year_from": "2026-27",
  "assessment_year_to": null,
  "taxpayer_types": ["individual", "huf"],
  "input_fields": [],
  "cap_amount": 150000,
  "formula": "min(eligible_amount, cap_amount)",
  "documents": [],
  "conflicts_with": [],
  "notes": []
}
```

### Section 80C

The deductions page confirms that Section 80C covers specified investments and payments such as life insurance premium, provident fund, PPF, ELSS, NSC, housing-loan principal repayment, tuition fees, Sukanya Samriddhi contribution, and tax-saving deposits, subject to the statutory cap.[cite:16] It also confirms that the aggregate cap across Sections 80C, 80CCC, and 80CCD(1) is ₹1.5 lakh, which should be enforced as a shared bucket and not as separate full limits.[cite:16]

### Section 80CCD

The deductions page confirms three separate logical buckets that the product should not confuse.[cite:16]

- **80CCD(1)**: employee/self contribution to notified pension scheme, within the overall combined cap structure.[cite:16]
- **80CCD(1B)**: additional deduction up to ₹50,000 for NPS contributions, over and above the common ₹1.5 lakh basket.[cite:16]
- **80CCD(2)**: employer contribution, separately deductible subject to salary-based percentage rules and regime-linked availability.[cite:16]

### Section 80D

The app should support age-aware 80D logic for self, spouse, dependent children, and parents, because the deduction page lays out different ceilings and preventive-health-checkup treatment.[cite:16] The same page states that preventive health check-up is capped at ₹5,000 within the overall deduction and that the combined benefit can go as high as ₹1 lakh in qualifying family-plus-parent scenarios.[cite:16]

### Section 80DD and Section 80DDB

These sections should be modeled as evidence-driven claims with fixed or capped amounts rather than free-text deductions.[cite:16] The official deductions page indicates disability severity, medical certification, age, reimbursement reduction, and actual expenditure as important factors in these claims.[cite:16]

### Section 80E

Section 80E should be treated as an interest-only education loan deduction. The deductions page notes that no deduction is available for principal repayment under this section and that the benefit is available for up to eight assessment years beginning from the first year of repayment.[cite:16]

### Section 80EE, 80EEA, and 80EEB

The deductions page contains key date-window and sanction-condition logic for these special deductions, which makes them ideal candidates for rule-based implementation rather than static help text.[cite:16]

- **80EE**: additional home-loan interest deduction up to ₹50,000 under specified sanction/property conditions.[cite:16]
- **80EEA**: additional deduction up to ₹1.5 lakh for eligible affordable housing loan interest subject to period and property conditions.[cite:16]
- **80EEB**: deduction up to ₹1.5 lakh for interest on eligible electric-vehicle loans subject to sanction window and lender conditions.[cite:16]

### Section 80G

Section 80G should be implemented as a donation classification engine, not a simple amount field, because the rate can be 50% or 100% and may be with or without a qualifying limit depending on the donee category.[cite:16] The same official page states that cash donations above ₹2,000 are not eligible, and that deduction also depends on institutional compliance and reporting requirements.[cite:16]

### Section 80GG

Section 80GG supports rent-paid deduction for users not claiming HRA exemption, and the official formula is the least of three values: rent paid minus 10% of total income, 25% of total income, or ₹5,000 per month.[cite:16] This section also requires Form 10BA and contains ownership-related restrictions that should be enforced in the eligibility questionnaire.[cite:16]

## Regime compatibility matrix

The old and new regimes do not allow the same deductions and exemptions. Official FAQ guidance explicitly confirms that some exemptions such as HRA under Section 10(13A) are not available in the new regime.[cite:17]

The app should therefore maintain a regime matrix similar to the following:

| Rule item | Old regime | New regime | Implementation note |
|---|---|---|---|
| HRA exemption u/s 10(13A) | Allowed [cite:17] | Not allowed [cite:17] | Must branch salary computation. |
| 80C | Commonly used in old-regime planning [cite:16] | Restrict through AY-specific rule table [cite:17] | Keep year-versioned. |
| 80D | Commonly used in old-regime planning [cite:16] | Restrict through AY-specific rule table [cite:17] | Keep year-versioned. |
| 80CCD(2) employer NPS | Allowed [cite:16] | Allowed subject to rule conditions [cite:16] | Must not be mixed with own NPS. |
| 80GG | Allowed where conditions met [cite:16] | Regime-specific handling required [cite:17] | Keep explicit validation. |

## Capital gains engine

Capital gains should be modeled separately because multiple sections, asset classes, and special rates can apply.[cite:10][cite:21][cite:24][cite:30]

### Required fields per capital gain event

```json
{
  "asset_class": "equity|equity_mf|debt|property|gold|other",
  "listed": true,
  "date_of_acquisition": "YYYY-MM-DD",
  "date_of_transfer": "YYYY-MM-DD",
  "sale_value": 0,
  "transfer_expenses": 0,
  "cost_of_acquisition": 0,
  "cost_of_improvement": 0,
  "special_rate_section": null,
  "exemption_sections_claimed": [],
  "holding_period_classification": "short|long"
}
```

### Engine requirements

- Determine the holding-period classification by asset type and period.[cite:24][cite:30]
- Compute capital gain net of permitted cost components and transfer expenses.[cite:24]
- Route gain to the applicable special-rate section such as 111A, 112, or 112A where relevant.[cite:24][cite:30]
- Evaluate exemption claims separately from tax-rate computation.[cite:10][cite:21]

### Reinvestment exemptions

Official Income Tax Department capital-gain guidance explains that exemptions can arise where gains are reinvested into prescribed assets or where the law specifically excludes them from total income under Section 10.[cite:10] This means your app should treat exemption claims as a second-stage rule evaluation after gain computation and before final tax aggregation.[cite:10][cite:21]

### Section 54EC

The official Section 54EC page states that eligible long-term capital gains from transfer of land or building or both may qualify for exemption if invested in specified long-term assets within six months.[cite:21] The exemption should be modeled as proportional when the amount invested is lower than the eligible gain, and the app should store the investment date, amount, and bond type as evidence fields.[cite:21]

## AIS and TIS integration

AIS and TIS can materially improve the reliability of a consumer tax app because they help reconcile what the user enters against what the tax department already knows.[cite:22][cite:28]

### What AIS contains

The official AIS page states that it can include TDS, TCS, specified financial transactions, tax payments, demand and refund information, GST return information, foreign remittances, mutual fund transactions, dividends, and off-market transactions, among other categories.[cite:22] This makes AIS useful both as a prefill layer and as a compliance-warning layer.[cite:22][cite:28]

### What TIS does

The official AIS material explains that the Taxpayer Information Summary shows processed values after feedback and is used for prefilling the return.[cite:22] In product terms, this means the app should distinguish between **raw imported transaction data** and **normalized tax-summary values**.[cite:22][cite:28]

### Suggested AIS/TIS ingestion model

```json
{
  "source": "AIS|TIS|manual",
  "category": "tds|tcs|sft|tax_payment|refund|other",
  "subtype": "interest|dividend|salary|mutual_fund|property|foreign_remittance",
  "financial_year": "2025-26",
  "reported_value": 0,
  "revised_value": 0,
  "feedback_status": "none|accepted|modified|disputed",
  "source_identifier": "",
  "notes": ""
}
```

## TDS, TCS, and tax credits

The app should distinguish between **tax liability computation** and **tax credit reconciliation**. Many users overestimate tax due because they do not subtract salary TDS, bank TDS, advance tax, or self-assessment tax already paid.[cite:22][cite:28][cite:39]

At minimum, the credit engine should support these buckets:[cite:22][cite:28]

- Salary TDS.[cite:22]
- Non-salary TDS.[cite:22]
- TCS.[cite:22]
- Advance tax.[cite:22][cite:39]
- Self-assessment tax.[cite:39]
- Refund/demand carry information where available.[cite:22]

## Advance tax

Advance tax should be treated as a separate compliance module rather than only a payment reminder, because the due-date pattern can also be used to estimate interest exposure when a user underpays during the year.[cite:39][cite:45]

### General installment pattern

Widely used references reflect the normal cumulative schedule as:[cite:39][cite:45]

| Due date | Cumulative tax payable |
|---|---|
| 15 June | 15% [cite:39][cite:45] |
| 15 September | 45% [cite:39][cite:45] |
| 15 December | 75% [cite:39][cite:45] |
| 15 March | 100% [cite:39][cite:45] |

Presumptive-taxation users may fall under a different pattern, with current public references describing a year-end single-installment approach in relevant presumptive cases.[cite:36][cite:45]

## ITR recommendation logic

The app should recommend ITR forms early and also re-check them after the full income profile is known, because the user’s form can change once business income, foreign assets, or capital gains are detected.[cite:37]

### Working form map

| Form | Typical use case | Product signal |
|---|---|---|
| ITR-1 | Simple resident individual with salary/pension, limited house property/other-source income, and limited eligible capital-gains profile.[cite:2][cite:37] | Basic salaried flow. |
| ITR-2 | Individual/HUF without business income but with broader income complexity such as capital gains.[cite:37] | Investor/landlord/non-business complex flow. |
| ITR-3 | Individual/HUF with income from business or profession.[cite:37] | Freelancer/business full books flow. |
| ITR-4 | Presumptive business/profession cases within scheme conditions.[cite:37] | Presumptive quick flow. |

## Core end-to-end computation flow

A production-friendly calculation sequence is shown below.[cite:2][cite:10][cite:16][cite:22]

1. Collect taxpayer profile, age, residency, and filing context.[cite:2][cite:11]
2. Detect income heads present.[cite:2][cite:10][cite:11]
3. Determine regime options available for this user.[cite:17][cite:35]
4. Compute income under each head separately.[cite:2][cite:10][cite:11]
5. Aggregate into gross total income.[cite:16]
6. Apply eligible deductions and exemptions as per regime matrix.[cite:16][cite:17]
7. Compute total income / taxable income.[cite:16]
8. Compute normal slab tax.[cite:1][cite:6]
9. Compute special-rate taxes separately.[cite:24][cite:30]
10. Apply rebate.[cite:31][cite:38]
11. Apply surcharge and marginal relief if relevant.[cite:44]
12. Apply cess.[cite:8][cite:32]
13. Subtract TDS, TCS, advance tax, and self-assessment tax.[cite:22][cite:28][cite:39]
14. Determine payable/refundable position.[cite:22][cite:28]
15. Recommend ITR form and generate warnings/checklist.[cite:37]

## Validation rules for the AI model

The AI implementation layer should explicitly validate these situations because they commonly produce wrong outputs in consumer calculators.[cite:16][cite:17][cite:24][cite:30]

- Prevent deductions from exceeding gross total income.[cite:16]
- Prevent the combined 80C + 80CCC + 80CCD(1) basket from exceeding ₹1.5 lakh.[cite:16]
- Keep 80CCD(1B) outside that combined basket but within its own statutory cap.[cite:16]
- Do not allow HRA exemption in the new regime standard flow.[cite:17]
- Do not merge special-rate capital gains into slab-income computation without classification.[cite:24][cite:30]
- Do not apply rebate indiscriminately without regime and income-threshold checks.[cite:31][cite:38]
- Apply cess after rebate and surcharge sequencing, not before.[cite:8][cite:32][cite:44]
- Re-check ITR form after the full income profile is known.[cite:37]
- Keep all thresholds and form rules assessment-year versioned.[cite:37][cite:38]

## Suggested internal schemas

### Taxpayer profile

```json
{
  "taxpayer_type": "individual",
  "residential_status": "resident|rnor|nri",
  "age_category": "non_senior|senior|super_senior",
  "has_business_income": false,
  "has_capital_gains": false,
  "has_house_property_income": false,
  "has_foreign_assets": false,
  "assessment_year": "2026-27"
}
```

### Income head object

```json
{
  "head": "salary|house_property|business_profession|capital_gains|other_sources",
  "gross_amount": 0,
  "allowable_adjustments": 0,
  "net_amount": 0,
  "special_rate_section": null,
  "metadata": {}
}
```

### Deduction claim object

```json
{
  "section": "80C",
  "claimed_amount": 0,
  "eligible_amount": 0,
  "allowed_amount": 0,
  "regime_checked": true,
  "documents_verified": false,
  "reason_if_rejected": ""
}
```

### Credit object

```json
{
  "credit_type": "tds|tcs|advance_tax|self_assessment_tax",
  "amount": 0,
  "source": "manual|ais|form16|challan",
  "matched": true,
  "reference_id": ""
}
```

## UX guidance for the product

A strong income tax app should ask tax questions progressively rather than showing the entire law to the user. Official guidance is split between salaried and business/profession help flows, which supports a dynamic interview-based UX that changes questions based on taxpayer profile.[cite:2][cite:11]

A practical flow is:

- Start with taxpayer type, salary/business status, and regime choice.[cite:2][cite:11][cite:17]
- Ask only the income-head questions relevant to the selected profile.[cite:2][cite:10][cite:11]
- Show deduction suggestions only when legally compatible with the regime.[cite:16][cite:17]
- Import AIS/TIS or let the user manually reconcile missing items.[cite:22][cite:28]
- End with tax payable/refund, ITR form recommendation, and a document checklist.[cite:22][cite:37]

## Source governance

For production use, the app should adopt a source-priority policy.[cite:16][cite:17][cite:37]

1. **Income Tax Department / e-filing portal / official help content** for legal interpretation and user-facing compliance behavior.[cite:2][cite:11][cite:16][cite:17][cite:22]
2. **Finance Act and CBDT notifications/circulars** for threshold or rule changes when building the final audited rule layer.[cite:17]
3. **Reputed secondary sources** only for implementation convenience and cross-checking, especially for current-year slab presentation or form summaries where official content is fragmented.[cite:1][cite:6][cite:12][cite:31][cite:37]

## Implementation caution

This knowledge base is appropriate for building an AI-assisted calculator, comparison tool, and guided tax-prep experience. It is not enough by itself for a legally hardened filing engine that must withstand every edge case under the Income-tax Act, Rules, forms, schemas, and CBDT amendments.[cite:16][cite:17][cite:37]

For a production-grade system, the next layer should be a **machine-readable rules repository** with year-wise JSON configurations for slabs, rebate, surcharge, deduction eligibility, form applicability, and capital-gains tax treatment, each mapped to a source URL and effective date.[cite:17][cite:21][cite:37]

## Recommended next deliverable

The most useful next step is to convert this document into two artifacts:[cite:16][cite:17][cite:37]

- A **developer rulebook JSON schema** for direct calculator implementation.[cite:17][cite:37]
- A **questionnaire-to-rule mapping document** that tells the AI IDE which user questions are needed to trigger each rule and computation branch.[cite:2][cite:11][cite:16]
