
export interface MealType {
  id: string;
  name: string;
  type: 'Kahvaltı' | 'Öğle Yemeği' | 'Akşam Yemeği' | 'Ara Öğün';
  calories: number;
  protein: number; // gram
  carbs: number; // gram
  fat: number; // gram
  imageUrl?: string;
  ingredients?: string[];
  recipe?: string;
  time?: string;
}

export interface DailyNutritionType {
  date: string;
  targetCalories: number;
  consumedCalories: number;
  burnedCalories: number;
  waterIntake: number; // ml
  meals: {
    breakfast?: MealType[];
    lunch?: MealType[];
    dinner?: MealType[];
    snacks?: MealType[];
  };
}
