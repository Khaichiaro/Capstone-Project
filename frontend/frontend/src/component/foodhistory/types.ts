// types.ts
export interface FoodItem {
  name: string;
  calories: number;
  image: string;
}

export interface NutritionData {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface FoodEntryData {
  id: string;
  date: string;
  breakfast: FoodItem;
  lunch: FoodItem;
  dinner: FoodItem;
  nutritionData: NutritionData;
}