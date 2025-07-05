import type { IFoodRecommendSelected } from "../../../../interfaces/IFoodRecommendSelected";
import SelectedFoodItem from "../selectedFoodItem/SelectFoodItem";

interface SummaryPanelProps {
  selectedFoods: IFoodRecommendSelected[];
  onRemoveFood: (id: number) => void;
  onCreateMenu: () => void;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  selectedFoods,
  onRemoveFood,
  onCreateMenu,
}) => {
  const totalCalories = selectedFoods.reduce(
    (sum, food) => sum + Number(food.food?.calories || 0), 
    0
  );
  const totalProtein = selectedFoods.reduce(
    (sum, food) => sum + Number(food.food?.protein || 0),
    0
  );
  const totalCarb = selectedFoods.reduce(
    (sum, food) => sum + Number(food.food?.carb || 0),
    0
  );
  const totalSodium = selectedFoods.reduce(
    (sum, food) => sum + Number(food.food?.sodium || 0),
    0
  );

  return (
    <div className="bg-[#FFFBF3] rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">รายการที่เลือก</h2>

      {/* รายการอาหาร */}
      <div className="mb-6 max-h-80 overflow-y-auto">
        {selectedFoods.length === 0 ? (
          <p className="text-gray-500 text-center py-8">ยังไม่ได้เลือกอาหาร</p>
        ) : (
          <div className="space-y-0">
            {selectedFoods.map((food) => (
              <SelectedFoodItem
                key={food.uniqueId}
                food={food}
                onRemove={onRemoveFood}
              />
            ))}
          </div>
        )}
      </div>

      {/* สรุปข้อมูล */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center text-xl font-bold mb-4">
          <span>รวม</span>
          <span>{totalCalories} กิโลแคลลอรี่</span>
        </div>

        <div className="space-y-2 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">โปรตีน</span>
            <span className="font-medium">{totalProtein}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">คาร์บ</span>
            <span className="font-medium">{totalCarb}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">โซเดียม</span>
            <span className="font-medium">{totalSodium}%</span> {/* หรือ mg */}
          </div>
        </div>

        <button
          onClick={onCreateMenu}
          disabled={selectedFoods.length === 0}
          className="w-full bg-[#84AC46] hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-full transition-colors"
        >
          สร้างรายการนี้
        </button>
      </div>
    </div>
  );
};

export default SummaryPanel;
