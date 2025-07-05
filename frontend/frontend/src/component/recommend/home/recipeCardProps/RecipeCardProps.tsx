import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { checkLikeStatus, toggleLike } from "../../../../services/https";

interface RecipeCardProps {
  image: string;
  title: string;
  calories: number;
  likes: number;
  foodRecommendId: number;
  onClick?: () => void;
}

// Helper function: 10900 → "10.9k"
const formatLikes = (num: number): string => {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  image,
  title,
  calories,
  likes,
  foodRecommendId,
  onClick,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!userId) return;
      try {
        const result = await checkLikeStatus(parseInt(userId), foodRecommendId);
        setLiked(result.liked);
      } catch (err) {
        console.error("Failed to fetch like status:", err);
      }
    };

    fetchLikeStatus();
  }, [userId, foodRecommendId]);

  const handleToggleLike = async () => {
    try {
      if (!userId) return;
      const response = await toggleLike({
        user_id: parseInt(userId),
        food_recommend_id: foodRecommendId,
      });

      setLiked(response.liked);
      setLikeCount((prev) => prev + (response.liked ? 1 : -1));
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">{calories} แคลลอรี่</span>

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

        <button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-full transition-colors cursor-pointer"
          onClick={onClick}
        >
          ดูรายละเอียด
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
