import type { IFood } from "./IFood";

export interface IFoodRecommendSelected {
  id: number;
  name: string;
  image: string;
  calories: number;
  category: string;
  uniqueId: number;
  food: IFood; // Reference to actual food data

  oldRecommend?: {
    ID: number;
    Name: string;
    Instruction: string;
    DesCription: string;
    Benefits: string;
    Disadvantages: string;
    RankingID: number;
  };
}
