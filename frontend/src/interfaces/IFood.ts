import type { IFoodType } from "./IFoodType";

export interface IFood {
  ImageUrl: string;
  ID: number;
  FoodName: string;
  Calories: number;
  Protein: number;
  Carbs: number;
  Sodium: number;
  Fat: number;
  Sugar: number;

  FoodTypeID: number;
  FoodType?: IFoodType;
}