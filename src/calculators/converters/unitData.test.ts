import { describe, expect, it } from 'vitest';
import { LENGTH, AREA, VOLUME, WEIGHT, TIME, convert, convertTemperature } from './unitData';

function unit(category: typeof LENGTH, id: string) {
  const u = category.units.find((u) => u.id === id);
  if (!u) throw new Error(`unit ${id} not found`);
  return u;
}

describe('convert (multiplicative units)', () => {
  it('1 mile = 1609.344 meters', () => {
    expect(convert(1, unit(LENGTH, 'mile'), unit(LENGTH, 'meter'))).toBeCloseTo(1609.344, 6);
  });

  it('1 foot = 12 inches (via meters)', () => {
    const inches = convert(1, unit(LENGTH, 'foot'), unit(LENGTH, 'inch'));
    expect(inches).toBeCloseTo(12, 6);
  });

  it('1 kilometer = 1000 meters', () => {
    expect(convert(1, unit(LENGTH, 'kilometer'), unit(LENGTH, 'meter'))).toBe(1000);
  });

  it('round-trips length conversions without drift', () => {
    const original = 42.5;
    const toInches = convert(original, unit(LENGTH, 'meter'), unit(LENGTH, 'inch'));
    const back = convert(toInches, unit(LENGTH, 'inch'), unit(LENGTH, 'meter'));
    expect(back).toBeCloseTo(original, 6);
  });

  it('1 acre = 4046.8564224 square meters', () => {
    expect(convert(1, unit(AREA, 'acre'), unit(AREA, 'sq-meter'))).toBeCloseTo(4_046.8564224, 4);
  });

  it('1 hectare = 10000 square meters = 2.47105 acres', () => {
    expect(convert(1, unit(AREA, 'hectare'), unit(AREA, 'sq-meter'))).toBe(10_000);
    expect(convert(1, unit(AREA, 'hectare'), unit(AREA, 'acre'))).toBeCloseTo(2.47105, 4);
  });

  it('1 US gallon = 3.785411784 liters = 4 US quarts', () => {
    expect(convert(1, unit(VOLUME, 'us-gallon'), unit(VOLUME, 'liter'))).toBeCloseTo(3.785411784, 6);
    expect(convert(1, unit(VOLUME, 'us-gallon'), unit(VOLUME, 'us-quart'))).toBeCloseTo(4, 6);
  });

  it('1 liter = 1000 cubic centimeters', () => {
    expect(convert(1, unit(VOLUME, 'liter'), unit(VOLUME, 'cubic-centimeter'))).toBeCloseTo(1000, 6);
  });

  it('1 kilogram ≈ 2.20462 pounds', () => {
    expect(convert(1, unit(WEIGHT, 'kilogram'), unit(WEIGHT, 'pound'))).toBeCloseTo(2.20462, 4);
  });

  it('1 metric ton = 1000 kilograms', () => {
    expect(convert(1, unit(WEIGHT, 'metric-ton'), unit(WEIGHT, 'kilogram'))).toBe(1000);
  });

  it('1 carat = 200 milligrams', () => {
    expect(convert(1, unit(WEIGHT, 'carat'), unit(WEIGHT, 'milligram'))).toBeCloseTo(200, 6);
  });

  it('1 hour = 60 minutes = 3600 seconds', () => {
    expect(convert(1, unit(TIME, 'hour'), unit(TIME, 'minute'))).toBe(60);
    expect(convert(1, unit(TIME, 'hour'), unit(TIME, 'second'))).toBe(3600);
  });

  it('1 day = 24 hours', () => {
    expect(convert(1, unit(TIME, 'day'), unit(TIME, 'hour'))).toBe(24);
  });

  it('1 week = 7 days', () => {
    expect(convert(1, unit(TIME, 'week'), unit(TIME, 'day'))).toBe(7);
  });
});

describe('convertTemperature', () => {
  it('0°C = 32°F = 273.15K', () => {
    expect(convertTemperature(0, 'celsius', 'fahrenheit')).toBeCloseTo(32, 6);
    expect(convertTemperature(0, 'celsius', 'kelvin')).toBeCloseTo(273.15, 6);
  });

  it('100°C = 212°F = 373.15K', () => {
    expect(convertTemperature(100, 'celsius', 'fahrenheit')).toBeCloseTo(212, 6);
    expect(convertTemperature(100, 'celsius', 'kelvin')).toBeCloseTo(373.15, 6);
  });

  it('-40°C = -40°F (the famous crossover point)', () => {
    expect(convertTemperature(-40, 'celsius', 'fahrenheit')).toBeCloseTo(-40, 6);
  });

  it('absolute zero: 0K = -273.15°C', () => {
    expect(convertTemperature(0, 'kelvin', 'celsius')).toBeCloseTo(-273.15, 6);
  });

  it('round-trips through fahrenheit and kelvin', () => {
    const original = 37; // body temp in C
    const f = convertTemperature(original, 'celsius', 'fahrenheit');
    const k = convertTemperature(f, 'fahrenheit', 'kelvin');
    const back = convertTemperature(k, 'kelvin', 'celsius');
    expect(back).toBeCloseTo(original, 6);
  });

  it('same-unit conversion is a no-op', () => {
    expect(convertTemperature(25, 'celsius', 'celsius')).toBe(25);
  });
});
