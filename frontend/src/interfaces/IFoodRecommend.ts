import type { IFood } from "./IFood";

// Interfaces
export interface IFoodRecommend {
  id: number;
  name: string;
  description?: string;
  image?: string;
  calories?: number;
  category?: string;
  benefits?: string[];
  disadvantages?: string[];
  author?: string;
  rating?: number;
  isLiked?: boolean;
  likes?: number;

  protein?: number;
  carb?: number;
  sodium?: number;
  Food?: IFood;

}
