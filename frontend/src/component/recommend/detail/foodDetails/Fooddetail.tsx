import { Heart } from "lucide-react";
import type { IFoodRecommend } from "../../../../interfaces/IFoodRecommend";

// Food Details Component
const FoodDetails = ({ food }: { food: IFoodRecommend }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mx-4 mb-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">ชื่ออาหาร</h3>
            <p className="text-gray-700 mb-4">{food.name}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">คำอธิบายเมนู:</h4>
            <p className="text-gray-700 mb-4">{food.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">วิธีแนะนำ:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {food.benefits?.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">ประโยชน์:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {food.disadvantages?.map((disadvantage, index) => (
                <li key={index}>{disadvantage}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="text-right mb-4">
            <span className="text-sm text-gray-600">โดย {food.author}</span>
            <div className="flex items-center justify-end mt-1">
              <span className="text-lg font-bold mr-2">{food.rating}</span>
              <Heart className={`w-6 h-6 ${food.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
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
                  style={{ width: `${Math.min(food.calories ?? 0 * 10, 100)}%` }}
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
                  style={{ width: `${Math.min(food.protein ?? 0 * 10, 100)}%` }}
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
                  style={{ width: `${Math.min(food.carb ?? 0 * 10, 100)}%` }}
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
                  style={{ width: `${Math.min(food.sodium ?? 0 * 10, 100)}%` }}
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