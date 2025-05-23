import { useState } from "react";
import type { IFood } from "../../../../interfaces/IFood";
import type { IFoodRecommendSelected } from "../../../../interfaces/IFoodRecommendSelected";
import { useNavigate } from "react-router-dom";

interface FoodCardProps {
  food: IFood;
  onAdd: (food: IFoodRecommendSelected) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onAdd }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const navigate = useNavigate();

  const handleAdd = () => {
    const wrapped: IFoodRecommendSelected = {
      id: food.id,
      name: food.name,
      image: food.image,
      calories: food.calories,
      category: food.category,
      uniqueId: Date.now() + Math.random(),
      food, // ✅ เพิ่ม food แบบ FK
    };
    onAdd(wrapped);
  };

  return (
    <div className="bg-[#FFFBF3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
          src={food.image}
          alt={food.name}
          className="w-full h-32 sm:h-40 object-cover cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate(`/recipe/${encodeURIComponent(food.name)}`)}
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

        {food.badge && (
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs">
            {food.badge}
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-gray-800 mb-2">{food.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{food.calories} แคลลอรี่</p>
        <button
          onClick={handleAdd}
          className="w-full bg-[#84AC46] hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
        >
          เพิ่ม
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
