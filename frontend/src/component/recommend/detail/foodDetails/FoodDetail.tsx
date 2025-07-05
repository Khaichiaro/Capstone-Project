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

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">แคลอรี่</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full"
                  style={{
                    width: `${Math.min(food.Food.Calories ?? 0 * 10, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">โปรตีน</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${Math.min(food.Food.Protein ?? 0 * 10, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">คาร์บ</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${Math.min(food.Food.Carbs ?? 0 * 10, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">โซเดียม</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-pink-500 h-3 rounded-full"
                  style={{
                    width: `${Math.min(food.Food.Sodium ?? 0 * 10, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
