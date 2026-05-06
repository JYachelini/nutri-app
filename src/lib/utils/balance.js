import { TARGETS } from '$lib/data/constants.js';

export function getDayTotals(day, recipes) {
  return Object.values(day)
    .filter(Boolean)
    .reduce(
      (acc, id) => {
        const r = recipes.find(r => r.id === id);
        if (!r) return acc;
        return {
          kcal:    acc.kcal    + r.kcal,
          protein: acc.protein + r.protein,
          carbs:   acc.carbs   + r.carbs,
          fat:     acc.fat     + r.fat,
        };
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    );
}

export function getDayStatus({ kcal, protein }) {
  if (kcal === 0) return 'empty';
  if (kcal < TARGETS.kcal * 0.75 || protein < TARGETS.protein * 0.60) return 'low';
  if (kcal > TARGETS.kcal * 1.15 || protein < TARGETS.protein * 0.75) return 'high';
  return 'balanced';
}

export function getDaySuggestions({ kcal, protein, carbs }) {
  const suggestions = [];
  if (protein < TARGETS.protein * 0.75) {
    suggestions.push('Proteína baja — probá agregar atún, salmón o huevo');
  }
  if (kcal > TARGETS.kcal * 1.15) {
    suggestions.push('Calorías elevadas — considerá una porción más chica');
  }
  if (kcal < TARGETS.kcal * 0.75 && kcal > 0) {
    suggestions.push('Calorías bajas — el plan está incompleto');
  }
  if (carbs > TARGETS.carbs * 1.15) {
    suggestions.push('Hidratos elevados — reducí porciones de arroz o papa');
  }
  return suggestions;
}

export function getWeeklyAverage(allDayTotals) {
  const filled = allDayTotals.filter(d => d.kcal > 0);
  if (!filled.length) return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  return {
    kcal:    Math.round(filled.reduce((s, d) => s + d.kcal,    0) / filled.length),
    protein: Math.round(filled.reduce((s, d) => s + d.protein, 0) / filled.length),
    carbs:   Math.round(filled.reduce((s, d) => s + d.carbs,   0) / filled.length),
    fat:     Math.round(filled.reduce((s, d) => s + d.fat,     0) / filled.length),
  };
}
