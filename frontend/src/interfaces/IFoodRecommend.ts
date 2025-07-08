import type { IFood } from "./IFood";
import type { IRanking } from "./IRanking";
import type { IUser } from "./IUser";

// Interfaces
// export interface IFoodRecommend {
//   id: number;
//   name: string;
//   description?: string;
//   image?: string;
//   calories?: number;
//   category?: string;
//   benefits?: string[];
//   disadvantages?: string[];
//   author?: string;
//   rating?: number;
//   isLiked?: boolean;
//   likes?: number;

//   protein?: number;
//   carb?: number;
//   sodium?: number;
//   Food?: IFood;

// }


export interface IFoodRecommend {
  ID: number;
  Name: string;
  DesCription: string;
  Instruction: string;
  Benefits: string;
  Disadvantages: string;
  LikeCount: number;

  FoodID: number;
  Food: IFood;

  RankingID: number;
  Ranking: IRanking;

  UserID: number;
  User: IUser;
}