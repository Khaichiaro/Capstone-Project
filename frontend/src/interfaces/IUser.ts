import type {IUserGroup} from "./IUserGroup";
import type { IUserProfile } from "./IUserProfile";
import type { IExercise } from "./IExercise";
import type { ILevel } from "./ILevel.ts";
import type { INutritionGoals } from "./INutritionGoals.ts";
import type { IGender } from "./IGender.ts";
import type { IActivityFactors } from "./IActivityFactors.ts";

export interface IUser {
  ID: number;
  Username: string;
  Email: string;
  Password: string;
  LastLogin: string;

  UserGroupID: number;
  UserGroup: IUserGroup;

  UserProfileID: number;
  UserProfile: IUserProfile;

  ExerciseID: number;
  Exercise: IExercise;

  LevelID: number;
  Level: ILevel;

  NutritionGoalsID: number;
  NutritionGoals: INutritionGoals;

  GenderID: number;
  Gender: IGender;

  ActivityFactorsID: number;
  ActivityFactors: IActivityFactors;

//   Like?: Like[];
//   FoodRecommend?: FoodRecommend[];
//   EatingHistory?: EatingHistory[];
//   Meals?: Meals[];
//   ExerciseActivity?: ExerciseActivity[];
}
