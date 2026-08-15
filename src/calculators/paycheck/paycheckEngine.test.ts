import { describe, expect, it } from 'vitest';
import { calculateFederalTax, calculateFICA, SOCIAL_SECURITY_WAGE_BASE_2025 } from './federalTax';
import { calculateStateTax, STATE_TAX_CONFIGS } from './stateTax';
import { calculatePaycheck } from './paycheckEngine';

describe('calculateFederalTax', () => {
  it('applies only the brackets the income actually reaches (single, $60k)', () => {
    // taxable = 60000 - 15000 standard deduction = 45000
    // 10% * 11925 + 12% * (45000-11925) = 1192.5 + 3969 = 5161.5
    expect(calculateFederalTax(60_000, 'single')).toBeCloseTo(5161.5, 2);
  });

  it('returns 0 when income is below the standard deduction', () => {
    expect(calculateFederalTax(10_000, 'single')).toBe(0);
  });

  it('is monotonically increasing with income', () => {
    const low = calculateFederalTax(50_000, 'single');
    const high = calculateFederalTax(500_000, 'single');
    expect(high).toBeGreaterThan(low);
  });
});

describe('calculateFICA', () => {
  it('caps Social Security at the wage base', () => {
    const fica = calculateFICA(300_000, 'single');
    expect(fica.socialSecurity).toBeCloseTo(SOCIAL_SECURITY_WAGE_BASE_2025 * 0.062, 2);
  });

  it('applies additional Medicare tax above the single threshold', () => {
    const fica = calculateFICA(250_000, 'single');
    // 1.45% on all 250k + 0.9% on the 50k above the 200k threshold
    const expected = 250_000 * 0.0145 + 50_000 * 0.009;
    expect(fica.medicare).toBeCloseTo(expected, 2);
  });

  it('does not apply additional Medicare tax below the threshold', () => {
    const fica = calculateFICA(100_000, 'single');
    expect(fica.medicare).toBeCloseTo(100_000 * 0.0145, 2);
  });
});

describe('calculateStateTax', () => {
  it('is zero for no-income-tax states', () => {
    expect(calculateStateTax(200_000, 'single', STATE_TAX_CONFIGS.texas)).toBe(0);
    expect(calculateStateTax(200_000, 'single', STATE_TAX_CONFIGS.florida)).toBe(0);
    expect(calculateStateTax(200_000, 'single', STATE_TAX_CONFIGS.washington)).toBe(0);
  });

  it('matches hand-calculated California tax at $60k single', () => {
    // taxable = 60000 - 5540 = 54460
    // 1%*10756 + 2%*14743 + 4%*14746 + 6%*14215 = 107.56+294.86+589.84+852.9 = 1845.16
    expect(calculateStateTax(60_000, 'single', STATE_TAX_CONFIGS.california)).toBeCloseTo(1845.16, 1);
  });

  it('applies the California mental-health surcharge above $1M taxable', () => {
    const withoutSurcharge = calculateStateTax(999_000, 'single', STATE_TAX_CONFIGS.california);
    const overThreshold = calculateStateTax(1_100_000, 'single', STATE_TAX_CONFIGS.california);
    // taxable at 1.1M gross = 1.1M - 5540 = 1,094,460 -> 94,460 over the $1M surcharge threshold
    const taxableOver = (1_100_000 - 5_540) - 1_000_000;
    const surchargeAmount = taxableOver * 0.01;
    expect(overThreshold).toBeGreaterThan(withoutSurcharge);
    expect(overThreshold).toBeGreaterThanOrEqual(surchargeAmount);
  });

  it('New York tax is positive and less than gross income', () => {
    const tax = calculateStateTax(80_000, 'single', STATE_TAX_CONFIGS['new-york']);
    expect(tax).toBeGreaterThan(0);
    expect(tax).toBeLessThan(80_000);
  });

  it('is zero for the additional no-income-tax states', () => {
    for (const slug of ['nevada', 'tennessee', 'wyoming', 'south-dakota', 'alaska', 'new-hampshire']) {
      expect(calculateStateTax(150_000, 'single', STATE_TAX_CONFIGS[slug])).toBe(0);
    }
  });

  it('matches hand-calculated Pennsylvania flat tax (no deduction)', () => {
    // Flat 3.07% on all compensation, no standard deduction
    expect(calculateStateTax(75_000, 'single', STATE_TAX_CONFIGS.pennsylvania)).toBeCloseTo(75_000 * 0.0307, 2);
  });

  it('matches hand-calculated Illinois flat tax after personal exemption', () => {
    // (75000 - 2775) * 4.95%
    expect(calculateStateTax(75_000, 'single', STATE_TAX_CONFIGS.illinois)).toBeCloseTo((75_000 - 2_775) * 0.0495, 2);
  });

  it('flat-tax states scale linearly with income above the deduction', () => {
    for (const slug of ['colorado', 'arizona', 'north-carolina', 'michigan', 'utah', 'kentucky', 'indiana', 'georgia']) {
      const low = calculateStateTax(60_000, 'single', STATE_TAX_CONFIGS[slug]);
      const high = calculateStateTax(120_000, 'single', STATE_TAX_CONFIGS[slug]);
      expect(low).toBeGreaterThan(0);
      expect(high).toBeGreaterThan(low);
    }
  });

  it('applies the Massachusetts millionaires surtax above $1M taxable', () => {
    const withoutSurcharge = calculateStateTax(200_000, 'single', STATE_TAX_CONFIGS.massachusetts);
    const overThreshold = calculateStateTax(1_100_000, 'single', STATE_TAX_CONFIGS.massachusetts);
    const taxableOver = (1_100_000 - 4_400) - 1_000_000;
    expect(overThreshold).toBeGreaterThan(withoutSurcharge);
    expect(overThreshold).toBeGreaterThanOrEqual(taxableOver * 0.04);
  });

  it('Mississippi has no tax on the first $10,000 of taxable income', () => {
    expect(calculateStateTax(10_000, 'single', STATE_TAX_CONFIGS.mississippi)).toBe(0);
    expect(calculateStateTax(50_000, 'single', STATE_TAX_CONFIGS.mississippi)).toBeCloseTo((50_000 - 10_000) * 0.047, 2);
  });
});

describe('calculatePaycheck', () => {
  it('nets out to less than gross for a taxed state', () => {
    const result = calculatePaycheck(80_000, 'single', STATE_TAX_CONFIGS.california);
    expect(result.netAnnual).toBeLessThan(result.grossAnnual);
    expect(result.netAnnual).toBeCloseTo(
      result.grossAnnual - result.federalTax - result.socialSecurity - result.medicare - result.stateTax,
      6,
    );
  });

  it('has zero state tax and higher take-home in Texas vs California at the same salary', () => {
    const tx = calculatePaycheck(90_000, 'single', STATE_TAX_CONFIGS.texas);
    const ca = calculatePaycheck(90_000, 'single', STATE_TAX_CONFIGS.california);
    expect(tx.stateTax).toBe(0);
    expect(tx.netAnnual).toBeGreaterThan(ca.netAnnual);
  });

  it('effective tax rate is between 0 and 1 for realistic incomes', () => {
    const result = calculatePaycheck(120_000, 'marriedJoint', STATE_TAX_CONFIGS['new-york']);
    expect(result.effectiveTaxRate).toBeGreaterThan(0);
    expect(result.effectiveTaxRate).toBeLessThan(1);
  });

  it('handles zero income without throwing or going negative', () => {
    const result = calculatePaycheck(0, 'single', STATE_TAX_CONFIGS.california);
    expect(result.netAnnual).toBe(0);
    expect(result.totalTax).toBe(0);
  });
});
