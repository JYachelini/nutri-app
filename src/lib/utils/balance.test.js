import { describe, it, expect } from 'vitest';
import { getDayTotals, getDayStatus, getDaySuggestions, getWeeklyAverage } from './balance.js';
import { TARGETS } from '$lib/data/constants.js';

const mockRecipes = [
  { id: 1, kcal: 310, protein: 18, carbs: 42, fat: 6 },
  { id: 2, kcal: 400, protein: 32, carbs: 44, fat: 8 },
];

describe('getDayTotals', () => {
  it('returns zeros for empty day', () => {
    const day = { breakfast: null, lunch: null, snack: null, dinner: null };
    expect(getDayTotals(day, [])).toEqual({ kcal: 0, protein: 0, carbs: 0, fat: 0 });
  });

  it('sums macros from assigned recipes', () => {
    const day = { breakfast: 1, lunch: 2, snack: null, dinner: null };
    expect(getDayTotals(day, mockRecipes)).toEqual({ kcal: 710, protein: 50, carbs: 86, fat: 14 });
  });

  it('ignores unknown recipe ids', () => {
    const day = { breakfast: 99, lunch: null, snack: null, dinner: null };
    expect(getDayTotals(day, mockRecipes)).toEqual({ kcal: 0, protein: 0, carbs: 0, fat: 0 });
  });
});

describe('getDayStatus', () => {
  it('returns "empty" when kcal is 0', () => {
    expect(getDayStatus({ kcal: 0, protein: 0, carbs: 0, fat: 0 })).toBe('empty');
  });

  it('returns "high" when kcal exceeds 115% of target', () => {
    expect(getDayStatus({ kcal: Math.round(TARGETS.kcal * 1.16), protein: TARGETS.protein, carbs: 0, fat: 0 })).toBe('high');
  });

  it('returns "high" when protein is below 75% of target', () => {
    expect(getDayStatus({ kcal: TARGETS.kcal, protein: Math.floor(TARGETS.protein * 0.74), carbs: 0, fat: 0 })).toBe('high');
  });

  it('returns "low" when kcal is below 75% of target', () => {
    expect(getDayStatus({ kcal: Math.floor(TARGETS.kcal * 0.74), protein: TARGETS.protein, carbs: 0, fat: 0 })).toBe('low');
  });

  it('returns "low" when protein is below 60% of target', () => {
    expect(getDayStatus({ kcal: TARGETS.kcal, protein: Math.floor(TARGETS.protein * 0.59), carbs: 0, fat: 0 })).toBe('low');
  });

  it('returns "balanced" when values are within range', () => {
    expect(getDayStatus({ kcal: TARGETS.kcal, protein: TARGETS.protein, carbs: TARGETS.carbs, fat: TARGETS.fat })).toBe('balanced');
  });
});

describe('getDaySuggestions', () => {
  it('returns empty array when balanced', () => {
    const balanced = { kcal: TARGETS.kcal, protein: TARGETS.protein, carbs: TARGETS.carbs, fat: TARGETS.fat };
    expect(getDaySuggestions(balanced)).toHaveLength(0);
  });

  it('suggests protein when protein is low', () => {
    const low = { kcal: TARGETS.kcal, protein: Math.floor(TARGETS.protein * 0.70), carbs: TARGETS.carbs, fat: TARGETS.fat };
    const suggestions = getDaySuggestions(low);
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0]).toMatch(/proteína/i);
  });
});

describe('getWeeklyAverage', () => {
  it('returns zeros when no days have meals', () => {
    expect(getWeeklyAverage([{ kcal: 0, protein: 0, carbs: 0, fat: 0 }])).toEqual({ kcal: 0, protein: 0, carbs: 0, fat: 0 });
  });

  it('averages only days with meals', () => {
    const totals = [
      { kcal: 2000, protein: 100, carbs: 150, fat: 60 },
      { kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ];
    expect(getWeeklyAverage(totals)).toEqual({ kcal: 2000, protein: 100, carbs: 150, fat: 60 });
  });
});
