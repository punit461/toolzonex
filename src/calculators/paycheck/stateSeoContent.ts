// Extra SEO-targeted copy for specific state paycheck calculator pages, layered
// on top of the generic content in PaycheckCalculator.tsx. Keyed by state slug
// (matches STATE_TAX_CONFIGS keys in stateTax.ts). Only states that need
// query-specific phrasing/FAQ coverage need an entry here -- the generic
// content covers every other state fine on its own.
//
// Facts referenced below must match stateTax.ts:
// - Florida, Texas: hasIncomeTax: false (no state income tax at all)
// - North Carolina: flat 4.5% state income tax
// - New York: state tax only -- NYC/Yonkers local income tax is NOT modeled
//   by this calculator (see stateTax.ts notes for 'new-york')
// - Kentucky: flat 4% state tax
// - Massachusetts: flat 5% state tax, plus 4% surtax above $1,000,000
// - Nevada, New Hampshire: hasIncomeTax: false (no state income tax at all)
// - Michigan: flat 4.25% state tax; does not model local city tax (e.g. Detroit)
// - Mississippi: 0% on first $10,000 of taxable income, 4.7% above that
// - Illinois: flat 4.95% state tax
// - California: progressive 1%-12.3% brackets, plus 1% surcharge above $1,000,000
// - Georgia: flat 5.39% state tax (moved from progressive brackets in 2024)

export interface StateFaq {
  q: string;
  a: string;
}

export interface StateSeoContent {
  /** Extra paragraph appended after the generic intro paragraph. */
  extraIntro?: string;
  /** Extra <li> bullets appended to the "Common Use Cases" list. */
  extraUseCases?: string[];
  /** Extra Q&A appended to the FAQ list, phrased close to real search queries. */
  faqs: StateFaq[];
}

export const STATE_SEO_CONTENT: Partial<Record<string, StateSeoContent>> = {
  florida: {
    extraIntro:
      "Because Florida has no state income tax, this page also works as a Florida salary calculator, Florida pay calculator, and Florida payroll calculator — the only things reduced from your gross pay are federal income tax, Social Security, and Medicare.",
    extraUseCases: [
      'Using it as a Florida pay stub calculator to double-check an employer’s withholding.',
      'Switching Pay Frequency to Weekly for a quick Florida weekly paycheck calculator estimate.',
    ],
    faqs: [
      {
        q: 'Does Florida have state income tax?',
        a: 'No. Florida is one of nine U.S. states with no state income tax on wages, so only federal income tax, Social Security, and Medicare are deducted from your paycheck — there is no state withholding line.',
      },
      {
        q: 'How much are my paycheck taxes in Florida?',
        a: 'Your Florida paycheck taxes are federal income tax (based on your income and filing status), Social Security at 6.2%, and Medicare at 1.45%. Because Florida doesn’t tax wages, your effective tax rate is typically lower than in states with a state income tax.',
      },
      {
        q: 'How do I use this as a Florida weekly paycheck calculator?',
        a: 'Enter your gross annual salary and filing status, then set Pay Frequency to Weekly — the calculator converts your annual federal tax, Social Security, and Medicare withholding into an estimated weekly take-home amount.',
      },
      {
        q: 'Can I use this as a Florida pay stub calculator?',
        a: 'Yes — it estimates the same federal, Social Security, and Medicare amounts that would appear on a Florida pay stub, broken down per pay period, so you can sanity-check an employer’s withholding.',
      },
    ],
  },

  texas: {
    extraIntro:
      'Texas is also one of the states with no state income tax, so this paycheck estimator for Texas focuses on federal tax and FICA (Social Security and Medicare) to calculate your take-home pay.',
    extraUseCases: [
      'Using this as a quick paycheck estimator for Texas when comparing a job offer against one in a state that does tax wages.',
    ],
    faqs: [
      {
        q: 'Does Texas have state income tax?',
        a: 'No. Texas does not levy a state income tax, so your paycheck is only reduced by federal income tax, Social Security (6.2%), and Medicare (1.45%).',
      },
      {
        q: 'How do I estimate my Texas paycheck?',
        a: 'Enter your gross annual salary and filing status above — this Texas paycheck estimator applies 2025 federal tax brackets plus Social Security and Medicare, then shows your net take-home pay by pay period.',
      },
      {
        q: 'How much are my paycheck taxes in Texas?',
        a: 'Because Texas has no state income tax, your paycheck taxes are federal income tax plus FICA (6.2% Social Security and 1.45% Medicare) — nothing is withheld for state income tax.',
      },
    ],
  },

  'new-york': {
    extraIntro:
      'Looking for take-home pay in New York City specifically? This calculator estimates federal and New York State income tax. NYC and Yonkers residents also owe an additional local income tax that isn’t included in this estimate, so budget for a somewhat lower number if you live or work in NYC.',
    extraUseCases: [
      'Estimating your New York State tax separately from NYC local income tax when budgeting a move to New York City.',
    ],
    faqs: [
      {
        q: 'Does this include New York City (NYC) local income tax?',
        a: 'No — this calculator estimates federal and New York State income tax only. NYC and Yonkers residents also owe a local income tax on top of state tax, which isn’t included here, so actual NYC take-home pay will be somewhat lower than the figure shown.',
      },
      {
        q: 'How do I calculate my take-home pay in NYC?',
        a: 'Enter your gross salary and filing status to see federal and New York State tax withholding, Social Security, and Medicare. If you live or work in NYC, remember to budget for NYC’s additional local income tax, which is separate from — and not included in — this estimate.',
      },
      {
        q: 'What is my salary after taxes in New York?',
        a: 'Your New York salary after taxes equals gross pay minus federal income tax, New York State income tax, Social Security, and Medicare. Enter your salary above to see the full breakdown for your filing status and pay frequency.',
      },
      {
        q: 'How is New York income tax calculated?',
        a: 'New York State income tax uses progressive brackets that increase with income, applied after New York’s standard deduction. This is separate from federal income tax and, for NYC or Yonkers residents, separate from local income tax as well.',
      },
    ],
  },

  'north-carolina': {
    extraIntro:
      'North Carolina uses a flat state income tax rate, so this North Carolina payroll calculator applies the same 4.5% rate to your North Carolina taxable income regardless of filing status.',
    extraUseCases: [
      'Getting a quick North Carolina payroll estimate before running payroll for a new hire.',
    ],
    faqs: [
      {
        q: "What is North Carolina's state income tax rate?",
        a: 'North Carolina has a flat state income tax rate of 4.5% (2025) that applies to all taxable income, regardless of filing status or income level.',
      },
      {
        q: 'Is there a bonus tax calculator for NC?',
        a: 'This calculator estimates regular salary withholding rather than the flat supplemental-wage method many employers use for bonuses (typically a 22% flat federal rate plus North Carolina’s 4.5% state rate). To approximate bonus withholding, add the bonus amount to your annual salary and compare the change in take-home pay shown here.',
      },
      {
        q: 'How do I use this as a North Carolina payroll calculator?',
        a: 'Enter your gross annual salary and filing status — the calculator applies 2025 federal tax brackets, Social Security, Medicare, and North Carolina’s flat 4.5% state tax to estimate net pay by pay period, similar to payroll tools like PaycheckCity.',
      },
    ],
  },

  kentucky: {
    extraIntro:
      "Also searched as a KY paycheck calculator or paycheck calculator KY — this tool applies Kentucky's flat 4% state income tax alongside federal tax, Social Security, and Medicare.",
    extraUseCases: [
      'Using this as a quick KY paycheck calculator when comparing take-home pay across pay frequencies.',
    ],
    faqs: [
      {
        q: 'Is this the same as a KY paycheck calculator?',
        a: "Yes — \"KY\" is the postal abbreviation for Kentucky. This Kentucky (KY) paycheck calculator applies Kentucky's flat 4% state income tax along with federal tax, Social Security, and Medicare to estimate take-home pay.",
      },
      {
        q: "What is Kentucky's state income tax rate?",
        a: 'Kentucky charges a flat 4% state income tax on wages after the state standard deduction, regardless of income level or filing status.',
      },
    ],
  },

  massachusetts: {
    extraIntro:
      'Often searched as a "Mass paycheck calculator" — "Mass" is the common short form for Massachusetts. This calculator applies Massachusetts’ flat 5% state income tax, plus the additional 4% "Millionaires Tax" surtax on taxable income above $1,000,000.',
    extraUseCases: [
      'Using this as a Mass paycheck calculator to check take-home pay before and after the 4% surtax kicks in above $1,000,000.',
    ],
    faqs: [
      {
        q: 'Is this the same as a "Mass" paycheck calculator?',
        a: '"Mass" is a common short form for Massachusetts. This calculator applies Massachusetts’ flat 5% state income tax — plus the additional 4% "Millionaires Tax" surtax on taxable income above $1,000,000 — along with federal tax, Social Security, and Medicare.',
      },
      {
        q: 'What is the Massachusetts state income tax rate?',
        a: 'Massachusetts charges a flat 5% state income tax on most income, with an additional 4% surtax (9% total) applied only to taxable income above $1,000,000.',
      },
    ],
  },

  nevada: {
    extraIntro:
      'Also searched as "paycheck calculator NV" or a Nevada payroll tax calculator — Nevada is one of the states with no state income tax, so only federal tax, Social Security, and Medicare are withheld here.',
    extraUseCases: [
      'Using this as a Nevada payroll tax calculator to compare take-home pay against a state that does levy income tax.',
    ],
    faqs: [
      {
        q: 'Does Nevada have state income tax?',
        a: 'No. Nevada (NV) is one of the states with no state income tax on wages, so this Nevada payroll tax calculator only withholds federal income tax, Social Security, and Medicare — no state tax line reduces your paycheck.',
      },
      {
        q: 'Is this the same as a Nevada payroll tax calculator?',
        a: 'Yes — "paycheck calculator" and "payroll tax calculator" are used interchangeably here. Enter a Nevada salary to see federal tax, Social Security, and Medicare broken out per pay period, with no state withholding since NV doesn’t tax wage income.',
      },
    ],
  },

  'new-hampshire': {
    extraIntro:
      'Also searched as a New Hampshire payroll calculator or "paycheck calculator NH" — New Hampshire does not tax wage income, so only federal tax, Social Security, and Medicare reduce your paycheck here.',
    extraUseCases: [
      'Using this as a New Hampshire payroll calculator to see how much of your gross pay goes to federal tax and FICA alone.',
    ],
    faqs: [
      {
        q: 'Does New Hampshire tax my paycheck?',
        a: 'No. New Hampshire (NH) does not tax wage income, so this New Hampshire payroll calculator only deducts federal income tax, Social Security, and Medicare — no state withholding applies to your salary.',
      },
      {
        q: 'Is this the same as a New Hampshire payroll calculator?',
        a: 'Yes — this tool works as both a New Hampshire paycheck calculator and payroll calculator. Since NH doesn’t tax wages, your take-home pay only reflects federal tax, Social Security, and Medicare.',
      },
    ],
  },

  michigan: {
    extraIntro:
      'Also searched as a Michigan payroll tax calculator or Michigan paycheck tax calculator — Michigan charges a flat 4.25% state income tax on wages after the personal exemption, on top of federal tax, Social Security, and Medicare.',
    extraUseCases: [
      'Using this as a Michigan payroll tax calculator before running payroll for a new hire.',
      'Checking how much Michigan paycheck tax comes out at different salary levels.',
    ],
    faqs: [
      {
        q: 'What is the Michigan payroll tax rate?',
        a: "Michigan charges a flat 4.25% state income tax on wages after the personal exemption. This Michigan payroll tax calculator applies that rate along with federal tax, Social Security, and Medicare — it doesn't include local city income tax, such as Detroit's additional withholding.",
      },
      {
        q: 'How much tax is taken out of a paycheck in Michigan?',
        a: "For most Michigan employees, paycheck withholding covers federal income tax (based on IRS brackets), 6.2% Social Security, 1.45% Medicare, and Michigan's flat 4.25% state tax — together typically 20-30% of gross pay depending on income and filing status.",
      },
    ],
  },

  mississippi: {
    extraIntro:
      "Also searched as a Mississippi payroll calculator — Mississippi doesn't tax the first $10,000 of taxable income, then applies a flat 4.7% rate above that.",
    extraUseCases: [
      "Using this as a Mississippi payroll calculator to estimate withholding for a new hire's offer letter.",
    ],
    faqs: [
      {
        q: 'What is the Mississippi state tax rate on a paycheck?',
        a: "Mississippi doesn't tax the first $10,000 of taxable income, then applies a flat 4.7% rate above that. This Mississippi payroll calculator factors in that bracket along with federal tax, Social Security, and Medicare.",
      },
    ],
  },

  illinois: {
    extraIntro:
      'Illinois charges a flat 4.95% state income tax after the personal exemption, so this Illinois paycheck calculator applies that single rate on top of federal tax, Social Security, and Medicare.',
    extraUseCases: [
      "Comparing an Illinois job offer's take-home pay against a flat-tax neighboring state.",
    ],
    faqs: [
      {
        q: 'How much is Illinois state tax on a paycheck?',
        a: 'Illinois charges a flat 4.95% state income tax after the personal exemption. This Illinois paycheck calculator applies that rate together with federal tax, Social Security, and Medicare to estimate your take-home pay.',
      },
    ],
  },

  california: {
    extraIntro:
      'Also searched as a California payroll calculator — California uses a progressive state income tax with marginal rates from 1% to 12.3%, plus an extra 1% Mental Health Services Tax on taxable income above $1,000,000.',
    extraUseCases: [
      'Using this as a California payroll calculator to see how your marginal state tax bracket changes your take-home pay.',
    ],
    faqs: [
      {
        q: 'How much California state tax comes out of my paycheck?',
        a: 'California uses a progressive state income tax with marginal rates from 1% to 12.3% (plus an extra 1% Mental Health Services Tax on taxable income above $1,000,000). This California payroll calculator applies your bracket based on income and filing status, along with federal tax, Social Security, and Medicare.',
      },
      {
        q: 'Is this the same as a California payroll calculator?',
        a: 'Yes — "paycheck calculator" and "payroll calculator" are used interchangeably here. This tool estimates net pay in California by combining federal tax, Social Security, Medicare, and California state income tax.',
      },
    ],
  },

  georgia: {
    extraIntro:
      "Georgia moved to a flat 5.39% state income tax rate in 2024, so this paycheck calculator for Georgia applies that single rate on top of federal tax, Social Security, and Medicare.",
    extraUseCases: [
      "Using this paycheck calculator for Georgia to compare take-home pay before and after Georgia's 2024 move to a flat tax rate.",
    ],
    faqs: [
      {
        q: "What is Georgia's paycheck tax rate?",
        a: 'Georgia moved to a flat state income tax rate of 5.39% in 2024. This paycheck calculator for Georgia applies that flat rate along with federal tax, Social Security, and Medicare to estimate your take-home pay.',
      },
    ],
  },
};
