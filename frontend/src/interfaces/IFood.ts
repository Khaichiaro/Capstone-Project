import type { IFoodRecommend } from "./IFoodRecommend";

export interface IFood {
  id: number;
  name: string;
  image: string;
  category: string;
  badge?: string;

  calories: number;
  protein?: number;   // g
  carb?: number;      // g
  sodium?: number;    // mg or %

  FoodRecommend?: IFoodRecommend;
}
