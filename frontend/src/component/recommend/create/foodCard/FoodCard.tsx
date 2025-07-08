import { useState } from "react";
import type { IFood } from "../../../../interfaces/IFood";
import food1 from "../../../../assets/food/saladKai1.svg"
import type { IFoodRecommendSelected } from "../../../../interfaces/IFoodRecommendSelected";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

interface FoodCardProps {
  food: IFood;
  onAdd: (food: IFoodRecommendSelected) => void;
  isSelected?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onAdd, isSelected = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const navigate = useNavigate();

  const handleAdd = () => {
    const wrapped: IFoodRecommendSelected = {
      id: food.ID,
      name: food.FoodName,
      image: food.ImageUrl || food1, // ใช้ fallback image
      calories: food.Calories || 0,
      category: food.FoodTypeID?.toString() || 'unknown',
      uniqueId: Date.now() + Math.random(),
      food, // ✅ เพิ่ม food แบบ FK
    };
    onAdd(wrapped);
  };

  return (
    <div className={`bg-[#FFFBF3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full ${
      isSelected ? 'ring-2 ring-[#84AC46] shadow-lg' : ''
    }`}>
      <div
        className="relative"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setTooltipPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <img
          src={food.ImageUrl || food1}
          alt={food.FoodName || 'Food'}
          className="w-full h-32 sm:h-40 object-cover cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate(`/recipe/${encodeURIComponent(food.FoodName || '')}`)}
          onError={(e) => {
            e.currentTarget.src = food1; // ใช้ fallback image แทน placeholder
          }}
        />
        {showTooltip && tooltipPos && (
          <div
            className="absolute bg-white text-gray-700 text-sm font-medium px-3 py-1 rounded shadow z-20"
            style={{
              top: tooltipPos.y,
              left: tooltipPos.x,
              transform: "translate(-50%, -150%)",
              pointerEvents: "none",
            }}
          >
            ดูรายละเอียดเพิ่มเติม
          </div>
        )}

        {isSelected && (
          <div className="absolute top-2 right-2 bg-[#84AC46] text-white p-1 rounded-full">
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 mb-2">{food.FoodName || 'ไม่มีชื่อ'}</h3>
        <p className="text-gray-600 text-sm mb-4">{food.Calories || 0} แคลลอรี่</p>
        <div className="mt-auto">
          <button
            onClick={handleAdd}
            className={`w-full font-medium py-2 px-4 rounded-full transition-colors ${
              isSelected 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-[#84AC46] hover:bg-green-600 text-white'
            }`}
            disabled={isSelected}
          >
            {isSelected ? 'เลือกแล้ว' : 'เลือก'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;