import type { IFood } from "./IFood";

export interface IFoodRecommendSelected {
  id: number;
  name: string;
  image: string;
  calories: number;
  category: string;
  uniqueId: number;
  food: IFood; // Reference to actual food data
}