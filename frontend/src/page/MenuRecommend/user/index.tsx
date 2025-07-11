import { useEffect, useState } from "react";
import type { IFoodRecommend } from "../../../interfaces/IFoodRecommend";
import NavBar from "../../../component/navbar/NavBar";
import SearchBar from "../../../component/recommend/user/searchBar/SearchBar";
import LoadingCard from "../../../component/recommend/user/loadingCard/LoadingCard";
import FoodCard from "../../../component/recommend/user/foodCard/FoodCard";
import { GetFoodRecommendByUserID } from "../../../services/https";

const UserFoodRecommendation: React.FC = () => {
    const [foods, setFoods] = useState<IFoodRecommend[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFoods, setFilteredFoods] = useState<IFoodRecommend[]>([]);
  
    useEffect(() => {
      const loadFoodRecommendations = async () => {
        try {
          setLoading(true);
          // Get user_id from localStorage
          const userId = localStorage.getItem('user_id');
          
          const recommendations = await GetFoodRecommendByUserID(parseInt(userId?? '0'));
          // เรียงลำดับ โดย Ranking มากกว่าอยู่ก่อน แล้ว CreatedAt ใหม่กว่ารองลงมา
          const sortedFoods = recommendations.data.sort((a, b) => {
          const rankA = a.Ranking ?? 0;
          const rankB = b.Ranking ?? 0;
  
          if (rankB !== rankA) {
          return rankB - rankA; // Ranking มากกว่าอยู่ก่อน
        }
  
      return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime(); // ถ้า Ranking เท่ากัน ให้ดู CreatedAt ใหม่กว่า
    });
  
  setFoods(sortedFoods);
  setFilteredFoods(sortedFoods);
        } catch (error) {
          console.error('Error loading food recommendations:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadFoodRecommendations();
    }, []);
    console.log("FoodRecommend", foods)
  
    useEffect(() => {
      const filtered = foods.filter(food => 
        food.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // food.Food.FoodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.DesCription?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFoods(filtered);
    }, [searchQuery, foods]);
  
    // const handleLike = (id: string) => {
    //   setFoods(prevFoods =>
    //     prevFoods.map(food =>
    //       food.id === id
    //         ? { 
    //             ...food, 
    //             isLiked: !food.isLiked, 
    //             likes: food.isLiked ? food.likes - 1 : food.likes + 1 
    //           }
    //         : food
    //     )
    //   );
    // };
  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };
  
    const totalLikes = filteredFoods.reduce((sum, food) => sum + food.LikeCount, 0);
    const averageRating = filteredFoods.length > 0 
      ? Math.round(filteredFoods.reduce((sum, food) => sum + (food.LikeCount || 0), 0) / filteredFoods.length * 10) / 10
      : 0;
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50">
        <NavBar/>
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-green-600 via-lime-600 to-yellow-600 bg-clip-text text-transparent leading-tight">
              อาหารทั้งหมดที่คุณแนะนำ
            </h1>
            <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
              ค้นพบเมนูอาหารที่เหมาะกับคุณ พร้อมคำแนะนำและแบ่งปัญสู่คนอื่น
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>{foods.length} เมนู</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span>{foods.filter(f => f.LikeCount).length} เมนูที่ชอบ</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span>เรทติ้ง {averageRating}/5</span>
              </div>
            </div>
          </div>
  
          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar onSearch={handleSearch} />
          </div>
  
          {/* Results Header */}
          {!loading && (
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                {searchQuery ? `ผลการค้นหา "${searchQuery}"` : 'เมนูแนะนำทั้งหมด'}
                <span className="text-green-600 ml-2">({filteredFoods.length})</span>
              </h2>
              
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  ล้างการค้นหา
                </button>
              )}
            </div>
          )}
  
          {/* Food Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <LoadingCard key={index} />
              ))
            ) : filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <FoodCard 
                  key={food.ID} 
                  food={food} 
                  likes={food.LikeCount}
                //   onLike={handleLike}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-8xl mb-6 opacity-50">🔍</div>
                <h3 className="text-3xl font-bold text-gray-600 mb-4">ไม่พบรายการอาหาร</h3>
                <p className="text-gray-500 text-lg mb-6">
                  ลองค้นหาด้วยคำอื่น หรือเพิ่มเมนูใหม่
                </p>
                <button className="bg-gradient-to-r from-green-500 to-lime-500 text-white px-8 py-3 rounded-full font-medium hover:from-green-600 hover:to-lime-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                  เพิ่มเมนูใหม่
                </button>
              </div>
            )}
          </div>
  
          {/* Statistics Section */}
          {!loading && filteredFoods.length > 0 && (
            <div className="mt-16 bg-white rounded-3xl shadow-2xl p-8 bg-gradient-to-r from-white to-green-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">สถิติเมนูอาหาร</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-100 to-lime-100 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl font-bold text-green-600 mb-2">{filteredFoods.length}</div>
                  <div className="text-gray-600 font-medium">เมนูทั้งหมด</div>
                </div>
                <div className="bg-gradient-to-br from-red-100 to-pink-100 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {filteredFoods.filter(food => food.LikeCount).length}
                  </div>
                  <div className="text-gray-600 font-medium">เมนูที่ชอบ</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">{averageRating}</div>
                  <div className="text-gray-600 font-medium">คะแนนเฉลี่ย</div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow duration-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {totalLikes > 1000 ? `${Math.round(totalLikes/1000)}k` : totalLikes}
                  </div>
                  <div className="text-gray-600 font-medium">ยอดไลค์รวม</div>
                </div>
              </div>
            </div>
          )}
        </main>
  
        {/* Custom Styles */}
        <style>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default UserFoodRecommendation;