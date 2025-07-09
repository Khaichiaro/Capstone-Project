import React from "react";
import type { IFoodRecommendSelected } from "../../../../interfaces/IFoodRecommendSelected";
import { Trash2, Plus } from "lucide-react";
import food1 from "../../../../assets/food/saladKai1.svg"; // เพิ่ม import

interface SummaryPanelProps {
  selectedFood: IFoodRecommendSelected | null;
  onRemoveFood: () => void;
  onCreateMenu: () => void;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  selectedFood,
  onRemoveFood,
  onCreateMenu,
}) => {
  const calculateTotalNutrition = () => {
    if (!selectedFood?.food) return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sodium: 0,
      sugar: 0
    };

    return {
      calories: selectedFood.food.Calories || 0,
      protein: selectedFood.food.Protein || 0,
      carbs: selectedFood.food.Carbs || 0,
      fat: selectedFood.food.Fat || 0,
      sodium: selectedFood.food.Sodium || 0,
      sugar: selectedFood.food.Sugar || 0
    };
  };

  const nutrition = calculateTotalNutrition();

  // Calculate percentages for the nutrition wheel
  const nutritionColors = {
    protein: '#FF6B6B',
    carbs: '#4ECDC4',
    fat: '#FFE66D',
    sodium: '#FF8A80',
    sugar: '#A78BFA'
  };

  // Calculate total for percentage calculation
  const totalNutrition = nutrition.protein + nutrition.carbs + nutrition.fat + nutrition.sodium + nutrition.sugar;
  
  const nutritionPercentages = totalNutrition > 0 ? {
    protein: (nutrition.protein / totalNutrition) * 100,
    carbs: (nutrition.carbs / totalNutrition) * 100,
    fat: (nutrition.fat / totalNutrition) * 100,
    sodium: (nutrition.sodium / totalNutrition) * 100,
    sugar: (nutrition.sugar / totalNutrition) * 100
  } : { protein: 0, carbs: 0, fat: 0, sodium: 0, sugar: 0 };

  // Create SVG path for donut chart
  const createArcPath = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
    const start = polarToCartesian(50, 50, outerRadius, endAngle);
    const end = polarToCartesian(50, 50, outerRadius, startAngle);
    const innerStart = polarToCartesian(50, 50, innerRadius, endAngle);
    const innerEnd = polarToCartesian(50, 50, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const NutritionWheel = () => {
    if (!selectedFood || totalNutrition === 0) {
      return (
        <div className="flex items-center justify-center h-40">
          <div className="w-24 h-24 rounded-full border-4 border-gray-200 bg-gray-50 flex items-center justify-center">
            <span className="text-gray-400 text-xs">ไม่มีข้อมูล</span>
          </div>
        </div>
      );
    }

    let currentAngle = 0;
    const segments = [
      { name: 'โปรตีน', percentage: nutritionPercentages.protein, color: nutritionColors.protein, value: nutrition.protein },
      { name: 'คาร์โบไฮเดรต', percentage: nutritionPercentages.carbs, color: nutritionColors.carbs, value: nutrition.carbs },
      { name: 'ไขมัน', percentage: nutritionPercentages.fat, color: nutritionColors.fat, value: nutrition.fat },
      { name: 'โซเดียม', percentage: nutritionPercentages.sodium, color: nutritionColors.sodium, value: nutrition.sodium },
      { name: 'น้ำตาล', percentage: nutritionPercentages.sugar, color: nutritionColors.sugar, value: nutrition.sugar }
    ].filter(segment => segment.percentage > 0);

    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 100 100" className="transform -rotate-90">
            {segments.map((segment, index) => {
              const startAngle = currentAngle;
              const endAngle = currentAngle + (segment.percentage / 100) * 360;
              const path = createArcPath(startAngle, endAngle, 25, 40);
              currentAngle = endAngle;

              return (
                <path
                  key={index}
                  d={path}
                  fill={segment.color}
                  className="transition-all duration-700 ease-in-out"
                  style={{
                    transformOrigin: '50% 50%',
                    animation: `fadeIn 0.8s ease-in-out ${index * 0.1}s both`
                  }}
                />
              );
            })}
          </svg>
          
          {/* Center circle with calories */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full w-12 h-12 flex flex-col items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-gray-800">{nutrition.calories}</span>
              <span className="text-xs text-gray-500">kcal</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-gray-600">{segment.name}</span>
              <span className="font-medium text-gray-800">{segment.value}g</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          อาหารที่เลือก
        </h2>
        <div className="bg-[#84AC46] text-white text-sm px-3 py-1 rounded-full">
          {selectedFood ? 1 : 0} รายการ
        </div>
      </div>

      {/* Selected Food */}
      <div className="mb-6">
        {selectedFood ? (
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                src={selectedFood.food.ImageUrl || food1} // ใช้ fallback image
                alt={selectedFood.food.FoodName || 'Food'}
                className="w-12 h-12 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = food1; // ใช้ fallback image
                }}
              />
              <div>
                <h4 className="font-medium text-gray-800 text-sm">
                  {selectedFood.food.FoodName || 'ไม่มีชื่อ'}
                </h4>
                <p className="text-xs text-gray-600">
                  {selectedFood.food.Calories || 0} แคลลอรี่
                </p>
              </div>
            </div>
            <button
              onClick={onRemoveFood}
              className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">
              กรุณาเลือกอาหารที่ต้องการแนะนำ
            </p>
          </div>
        )}
      </div>

      {/* Nutrition Wheel */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          สัดส่วนโภชนาการ
        </h3>
        <NutritionWheel />
      </div>

      {/* Nutrition Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          สรุปคุณค่าทางโภชนาการ
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">แคลลอรี่</span>
            <span className="font-medium">{nutrition.calories} kcal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">โปรตีน</span>
            <span className="font-medium">{nutrition.protein} g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">คาร์โบไฮเดรต</span>
            <span className="font-medium">{nutrition.carbs} g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ไขมัน</span>
            <span className="font-medium">{nutrition.fat} g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">โซเดียม</span>
            <span className="font-medium">{nutrition.sodium} mg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">น้ำตาล</span>
            <span className="font-medium">{nutrition.sugar} g</span>
          </div>
        </div>
      </div>

      {/* Create Button */}
      <button
        onClick={onCreateMenu}
        disabled={!selectedFood}
        className={`w-full py-3 px-4 rounded-full font-medium transition-colors ${
          selectedFood
            ? 'bg-[#84AC46] hover:bg-green-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        สร้างการแนะนำอาหาร
      </button>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default SummaryPanel;