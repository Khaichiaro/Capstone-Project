import { Heart } from "lucide-react";
import type { IFoodRecommend } from "../../../../interfaces/IFoodRecommend";
import { checkLikeStatus, toggleLike } from "../../../../services/https";
import { useEffect, useState } from "react";

// Food Details Component
const FoodDetails = ({
  food,
  loading,
}: {
  food: IFoodRecommend;
  loading: boolean;
}) => {
  const userId = localStorage.getItem("user_id");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(food.LikeCount);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!userId) return;
      try {
        const result = await checkLikeStatus(parseInt(userId), food.ID);
        setLiked(result.liked);
      } catch (err) {
        console.error("Failed to fetch like status:", err);
      }
    };

    fetchLikeStatus();
  }, [userId, food.ID]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/3 mt-4"></div>
        </div>
      </div>
    );
  }

  // Helper function: 10900 → "10.9k"
  const formatLikes = (num: number): string => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  const handleToggleLike = async () => {
    try {
      if (!userId) return;
      const response = await toggleLike({
        user_id: parseInt(userId),
        food_recommend_id: food.ID,
      });

      setLiked(response.liked);
      setLikeCount((prev) => prev + (response.liked ? 1 : -1));
      console.log("Like Status:", response);
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  };

  // Nutrition data with consistent colors
  const nutritionData = [
    {
      label: "โปรตีน",
      value: food.Food.Protein ?? 0,
      unit: "g",
      color: "#FF6B6B", // Red for protein
    },
    {
      label: "คาร์โบไฮเดรต",
      value: food.Food.Carbs ?? 0,
      unit: "g",
      color: "#4ECDC4", // Teal for carbs
    },
    {
      label: "ไขมัน",
      value: food.Food.Fat ?? 0,
      unit: "g",
      color: "#FFE66D", // Yellow for fat
    },
    {
      label: "โซเดียม",
      value: food.Food.Sodium ?? 0,
      unit: "mg",
      color: "#FF8A80", // Light red for sodium
    },
    {
      label: "น้ำตาล",
      value: food.Food.Sugar ?? 0,
      unit: "g",
      color: "#A78BFA", // Purple for sugar
    },
  ];

  // คำนวณผลรวมของโภชนาการทั้งหมด
  const totalNutrition = nutritionData.reduce((sum, item) => sum + item.value, 0);

  // คำนวณเปอร์เซ็นต์ของแต่ละโภชนาการ
  const nutritionWithPercentage = nutritionData.map(item => ({
    ...item,
    percentage: totalNutrition > 0 ? (item.value / totalNutrition) * 100 : 0
  }));

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

  const NutritionWheel = ({ nutritionData }: { nutritionData: any[] }) => {
    const totalNutrition = nutritionData.reduce((sum, item) => sum + item.value, 0);
    
    if (totalNutrition === 0) {
      return (
        <div className="flex items-center justify-center h-32">
          <div className="w-24 h-24 rounded-full border-4 border-gray-200 bg-gray-50 flex items-center justify-center">
            <span className="text-gray-400 text-xs">ไม่มีข้อมูล</span>
          </div>
        </div>
      );
    }

    const nutritionPercentages = nutritionData.map(item => ({
      ...item,
      percentage: (item.value / totalNutrition) * 100
    })).filter(item => item.percentage > 0);

    let currentAngle = 0;

    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 100 100" className="transform -rotate-90">
            {nutritionPercentages.map((segment, index) => {
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
              <span className="text-xs font-bold text-gray-800">{food.Food.Calories ?? 0}</span>
              <span className="text-xs text-gray-500">kcal</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {nutritionPercentages.map((segment, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-gray-600">{segment.label}</span>
              <span className="font-medium text-gray-800">{segment.value}{segment.unit}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mx-4 mb-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">ชื่ออาหาร</h3>
            <p className="text-gray-700 mb-4">{food.Food.FoodName}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              คำอธิบายเมนู:
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li className="text-gray-700 mb-4">{food.Instruction}</li>
              <li className="text-gray-700 mb-4">{food.DesCription}</li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ประโยชน์:
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {food.Benefits?.split("\n").map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              ข้อควรระวัง:
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {food.Disadvantages?.split("\n").map((disadvantage, index) => (
                <li key={index}>{disadvantage}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="text-right mb-4">
            <span className="text-sm text-gray-600">
              โดย {food.User.UserProfile.FirstName}{" "}
              {food.User.UserProfile.LastName}
            </span>
            <div className="flex items-center justify-end mt-1">
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={handleToggleLike}
              >
                <span className="text-sm text-gray-600">
                  {formatLikes(likeCount)}
                </span>
                <Heart
                  size={20}
                  className={`transition-colors duration-200 ${
                    liked ? "fill-red-500 text-red-500" : "text-red-500"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              ข้อมูลโภชนาการ
            </h4>
            
            {/* Nutrition Wheel */}
            <div className="flex flex-col items-center mb-6">
              <NutritionWheel nutritionData={nutritionData} />
            </div>

            {/* Nutrition Bars - แสดงตามสัดส่วนเปอร์เซ็นต์ */}
            <div className="space-y-4">
              {nutritionWithPercentage.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-800">
                        {item.value} {item.unit}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({item.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  <div className="relative h-3 rounded-full bg-gray-200 overflow-hidden" style={{ width: "100%" }}>
                    <div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{
                        background: item.color,
                        width: `${item.percentage}%`,
                        transition: "width 0.6s ease-out",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }
        
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

export default FoodDetails;