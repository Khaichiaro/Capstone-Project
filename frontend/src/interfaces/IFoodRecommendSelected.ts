import type { IFood } from './IFood';
import type { IFoodRecommend } from './IFoodRecommend';

export interface IFoodRecommendSelected extends IFoodRecommend {
  uniqueId: number;
  food?: IFood; // ✅ FK: อ้างอิงข้อมูล Food
}