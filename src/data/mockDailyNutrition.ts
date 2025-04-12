
import { DailyNutritionType } from '../types/NutritionTypes';
import { mockMeals } from './mockMeals';

export const mockDailyNutrition: DailyNutritionType = {
  date: '2024-04-12',
  targetCalories: 2200,
  consumedCalories: 1850,
  burnedCalories: 450,
  waterIntake: 2100,
  meals: {
    breakfast: [mockMeals[0]],
    lunch: [mockMeals[1]],
    dinner: [mockMeals[3]],
    snacks: [mockMeals[2]]
  }
};
