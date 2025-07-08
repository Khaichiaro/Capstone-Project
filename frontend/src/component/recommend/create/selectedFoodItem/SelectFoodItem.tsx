import { Trash2 } from "lucide-react";

import type { IFoodRecommendSelected } from '../../../../interfaces/IFoodRecommendSelected';
import food1 from '../../../../assets/food/saladKai1.svg'

interface SelectedFoodItemProps {
  food: IFoodRecommendSelected;
  onRemove: (id: number) => void;
}


const SelectedFoodItem: React.FC<SelectedFoodItemProps> = ({ food, onRemove }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <img
          src={food.food.ImageUrl || food1}
          alt={food.food?.FoodName}
          className="w-10 h-10 object-cover rounded-lg"
        />
        <div>
          <h4 className="font-medium text-gray-800 text-sm">{food.food?.FoodName}</h4>
          <p className="text-xs text-gray-600">{food.food?.Calories} แคลลอรี่</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(food.uniqueId)}
        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SelectedFoodItem;
