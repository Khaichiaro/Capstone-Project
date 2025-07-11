import { Clock, Heart, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { IFoodRecommend } from "../../../../interfaces/IFoodRecommend";
import { apiUrl, checkLikeStatus, toggleLike } from "../../../../services/https";
 
const FoodCard: React.FC<{ 
  food: IFoodRecommend; 
  likes: number;
}> = ({ food, likes}) => {
  // const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes)
  const userId = localStorage.getItem("user_id");


  // Check if current user has liked this food
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
    try {
      if (!userId) return;
      const response = await toggleLike({
        user_id: parseInt(userId),
        food_recommend_id: food.ID,
      });
      console.log("ToggleLike: ", liked)
      setLiked(response.liked);
      setLikeCount((prev) => prev + (response.liked ? 1 : -1));
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  };

  // Get difficulty from calories (example logic)
  const getDifficultyFromCalories = (calories?: number) => {
    if (!calories) return { color: 'bg-gray-100 text-gray-800', text: 'ไมได้รับพลังงาน' };
    if (calories < 300) return { color: 'bg-green-100 text-green-800', text: 'พลังงานน้อย' };
    if (calories < 500) return { color: 'bg-yellow-100 text-yellow-800', text: 'พลังงานปานกลาง' };
    return { color: 'bg-red-100 text-red-800', text: 'พลังงานเยอะ' };
  };

  const difficultyConfig = getDifficultyFromCalories(food.Food?.Calories);

  const formatLikes = (likes: number) => {
    if (likes >= 1000000) return `${(likes / 1000000).toFixed(1)}M`;
    if (likes >= 1000) return `${(likes / 1000).toFixed(1)}k`;
    return likes.toString();
  };

  // Check if food is new (created within last 7 days)
  // const isNew = new Date(food.CreatedAt || '').getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;
  // Check if food is new (created within last 10 minutes)
  const isNew = new Date(food.CreatedAt || '').getTime() > Date.now() - 10 * 60 * 1000;

  // Get category from food type
  const category = food.Food?.FoodType?.FoodType || 'อาหารทั่วไป';

  // Calculate rating from ranking
  // const rating = food.Ranking?.Rank ? (6 - parseInt(food.Ranking.Rank)).toFixed(1) : '4.5';


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
      // className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 hover:rotate-1 
      //   ${
      //     isHovered ? 'scale-105' : ''
      //   }`
      // }
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-200 overflow-hidden 1"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      // style={{ 
      //   animationDelay: `${index * 100}ms`,
      //   animation: 'slideInUp 0.6s ease-out forwards'
      // }}
    >
      <div className="relative">
        {/* Food Image Area */}
        <div className="w-full h-48 bg-gradient-to-br from-orange-200 via-yellow-200 to-red-200 flex items-center justify-center relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div> */}
            {/* <div className="w-28 h-28 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow duration-300 relative z-10 overflow-hidden"> */}
              {food.Food?.ImageUrl ? (
                <img 
                  src={`${apiUrl}/${food.Food.ImageUrl}`} 
                  alt={food.Name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-5xl filter drop-shadow-lg">🍜</span>
              )}
            {/* </div> */}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {isNew && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                NEW!
              </div>
            )}
            {food.LikeCount > 10 && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                HOT
              </div>
            )}
          </div>
          
          {/* Rating */}
          {/* <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-bold text-gray-700">{rating}</span>
          </div> */}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight hover:text-green-600 transition-colors duration-200">
                {food.Name}
              </h3>
              <p className="text-gray-600 text-sm mb-1 line-clamp-2">
                {food.DesCription}
              </p>
              <p className="text-gray-400 text-xs italic mb-3">{timeAgo(food.CreatedAt || '')}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyConfig.color}`}>
                  {difficultyConfig.text}
                </span>
                {food.Food?.Calories && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {food.Food.Calories} แคลอรี่
                  </span>
                )}
              </div>
              {food.Ranking && (
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>อันดับ {food.Ranking.Rank} - {food.Ranking.Detail}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
            <button
                onClick={handleToggleLike}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  liked 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-700">{formatLikes(likeCount)}</span>
                <span className="text-xs text-gray-500">การถูกใจ</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-yellow-500 hover:to-orange-500 transition-all duration-200 shadow-md hover:shadow-lg">
                แก้ไข
              </button>
              <button className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-pink-500 hover:to-red-500 transition-all duration-200 shadow-md hover:shadow-lg">
                ลบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;