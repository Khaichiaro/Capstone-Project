import { useEffect, useState } from "react";
import { Heart, TrendingUp } from "lucide-react";
import { checkLikeStatus, toggleLike, apiUrl } from "../../../../services/https";
import type { IFoodRecommend } from "../../../../interfaces/IFoodRecommend";

interface RecipeCardProps {
  food: IFoodRecommend;
  onClick?: () => void;
}

const formatLikes = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
};

const RecipeCard: React.FC<RecipeCardProps> = ({ food, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(food.LikeCount || 0);
  const userId = localStorage.getItem("user_id");

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

  const handleToggleLike = async () => {
    if (!userId) return;
    try {
      const result = await toggleLike({
        user_id: parseInt(userId),
        food_recommend_id: food.ID,
      });
      setLiked(result.liked);
      setLikeCount(prev => prev + (result.liked ? 1 : -1));
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  };

  const isNew = new Date(food.CreatedAt || '').getTime() > Date.now() - 10 * 60 * 1000;

  const category = food.Food?.FoodType?.FoodType || "อาหารทั่วไป";

  // Get difficulty from calories (example logic)
  const getDifficultyFromCalories = (calories?: number) => {
    if (!calories) return { color: 'bg-gray-100 text-gray-800', text: 'ไมได้รับพลังงาน' };
    if (calories < 300) return { color: 'bg-green-100 text-green-800', text: 'พลังงานน้อย' };
    if (calories < 500) return { color: 'bg-yellow-100 text-yellow-800', text: 'พลังงานปานกลาง' };
    return { color: 'bg-red-100 text-red-800', text: 'พลังงานเยอะ' };
  };

  const difficultyConfig = getDifficultyFromCalories(food.Food?.Calories);

  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const created = new Date(dateStr);
    const diff = Math.floor((now.getTime() - created.getTime()) / 1000);
    if (diff < 60) return `${diff} วินาทีที่แล้ว`;
    if (diff < 3600) return `${Math.floor(diff / 60)} นาทีที่แล้ว`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ชั่วโมงที่แล้ว`;
    return `${Math.floor(diff / 86400)} วันที่แล้ว`;
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={`${apiUrl}/${food.Food?.ImageUrl}`}
          alt={food.Name}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-2 left-2 space-y-1">
          {isNew && (
            <div className="bg-red-500 text-white px-2 py-1 text-xs rounded-full shadow">
              NEW!
            </div>
          )}
          {likeCount > 10 && (
            <div className="bg-green-500 text-white px-2 py-1 text-xs rounded-full shadow flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              HOT
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{food.Name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{food.DesCription}</p>
        <p className="text-xs text-gray-400 mt-1">{timeAgo(food.CreatedAt || "")}</p>

        {/* Badges Section */}
        <div className="flex flex-wrap items-center justify-start gap-2 mt-3 mb-2">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          {category}
        </span>

        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyConfig.color}`}>
          {difficultyConfig.text}
        </span>
      </div>
      <div className="flex justify-between items-center mt-3">
        {food.Food?.Calories && (
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
            {food.Food.Calories} แคลอรี่
          </span>
        )}
          {/* <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleLike();
            }}
          >
            <span className="text-sm text-gray-600">{formatLikes(likeCount)}</span>
            <Heart
              size={20}
              className={`transition-colors duration-200 ${
                liked ? "fill-red-500 text-red-500" : "text-red-500"
              }`}
            />
          </div> */}
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-700 ml-8">{formatLikes(likeCount)}</span>
                <span className="text-xs text-gray-500 ">การถูกใจ</span>
            </div>
            <button
                onClick={(e) => {
                  e.stopPropagation(); // ✅ หยุด event bubble
                  handleToggleLike();
                }}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  liked 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>
            </div>
        </div>

        <button
          className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick();
          }}
        >
          ดูรายละเอียด
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
