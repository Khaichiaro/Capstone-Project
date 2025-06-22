
import React from 'react';

import NavBar from '../../component/navbar/NavBar';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FoodItem {
  name: string;
  image: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

interface FoodDetailData {
  date: string;
  breakfast: FoodItem;
  lunch: FoodItem[];
  dinner: FoodItem;
  snacks: FoodItem[];
}

const FoodDetailView: React.FC = () => {
  const navigate = useNavigate();
  const foodData: FoodDetailData = {
    date: "10 ก.พ 2025",
    breakfast: {
      name: "ข้าวไข่เจียว",
      image: "/public/kaokaijiaw.jpg",
      calories: 153,
      carbs: 12,
      protein: 11,
      fat: 6.6
    },
    lunch: [
      {
        name: "ก๋วยเตี้ยว",
        image: "public/noodle.jpg",
        calories: 178,
        carbs: 21,
        protein: 25,
        fat: 4.5
      },
      {
        name: "โค้ก",
        image: "/public/coke.jpg",
        calories: 139,
        carbs: 21,
        protein: 25,
        fat: 4.4
      }
    ],
    dinner: {
      name: "ข้าวผัด",
      image: "/public/kaopad.jpg",
      calories: 178,
      carbs: 24.4,
      protein: 34.5,
      fat: 43.4
    },
    snacks: [
      {
        name: "แอปเปิ้ล",
        image: "/public/apple.jpg",
        calories: 138,
        carbs: 21,
        protein: 4.5,
        fat: 25
      }
    ]
  };

  const FoodItemDisplay: React.FC<{ item: FoodItem; showNutrients?: boolean }> = ({
    item,
    showNutrients = true
  }) => (
    <div className="flex items-start gap-4 mb-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-800 mb-1">{item.name}</h4>
        {showNutrients && (
          <div className="text-sm text-gray-600 space-y-1">
            <div>แคลอรี่ (kcal) {item.calories}</div>
            <div>คาร์โบไฮเดรต {item.carbs} g</div>
            <div>โปรตีน {item.protein} g</div>
            <div>ไขมัน {item.fat} g</div>
          </div>
        )}
      </div>
    </div>
  );

  const MealSection: React.FC<{
    title: string;
    items: FoodItem | FoodItem[];
    totalCalories: number;
    showDivider?: boolean;
  }> = ({ title, items, totalCalories, showDivider = true }) => {
    const itemArray = Array.isArray(items) ? items : [items];

    return (
      <>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <span className="text-gray-600">{totalCalories} แคลอรี่ (kcal)</span>
          </div>
          {itemArray.map((item, index) => (
            <FoodItemDisplay key={index} item={item} />
          ))}
        </div>
        {showDivider && <div className="border-t border-gray-300 mb-8"></div>}
      </>
    );
  };

  const handleToeditfood = () => {
    navigate('/editfoodform', );
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-8xl mx-auto p-6 lg:p-10">
        {/* Header with Add Button */}


        <div className="flex gap-4 justify-end mb-6">
          <button className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
            onClick={handleToeditfood}>
            แก้ไขข้อมูล +
          </button>

          <button
            className="flex items-center gap-2 bg-red-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
            onClick={() => window.location.href = '/foodhistory'}
          >
            <ArrowLeft size={16} />
            
          </button>
        </div>


        {/* Main Content Card */}
        <div className="bg-green-200 rounded-3xl p-6">
          <div className="bg-white rounded-2xl p-8">
            {/* Title and Date */}
            <div className="mb-8">
              <h2 className="font-bold text-2xl text-green-900 mb-2">บันทึกการกินอาหาร</h2>
              <p className="text-gray-600">วันศุกร์ที่ {foodData.date}</p>
            </div>

            {/* Three Column Layout for Main Meals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Breakfast */}
              <div className="md:pr-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-green-900">มื้อเช้า</h3>
                  <span className="text-gray-600">{foodData.breakfast.calories} แคลอรี่ (kcal)</span>
                </div>
                <FoodItemDisplay item={foodData.breakfast} showNutrients={false} />
                <div className="text-sm text-gray-600 mt-2">
                  <div>แคลอรี่ (kcal) {foodData.breakfast.calories}</div>
                  <div>คาร์โบไฮเดรต {foodData.breakfast.carbs} g</div>
                  <div>โปรตีน {foodData.breakfast.protein} g</div>
                </div>
              </div>



              {/* Lunch */}
              <div className="md:px-4 md:border-l md:border-r md:border-gray-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-green-900">มื้อเที่ยง</h3>
                  <span className="text-gray-600">{foodData.lunch.reduce((sum, item) => sum + item.calories, 0)} แคลอรี่ (kcal)</span>
                </div>
                {foodData.lunch.map((item, index) => (
                  <div key={index} className="mb-4">
                    <FoodItemDisplay item={item} showNutrients={false} />
                    <div className="text-sm text-gray-600 mt-2">
                      <div>แคลอรี่ (kcal) {item.calories}</div>
                      <div>คาร์โบไฮเดรต {item.carbs} g</div>
                      <div>โปรตีน {item.protein} g</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dinner */}
              <div className="md:pl-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-green-900">มื้อเย็น</h3>
                  <span className="text-gray-600">{foodData.dinner.calories} แคลอรี่ (kcal)</span>
                </div>
                <FoodItemDisplay item={foodData.dinner} showNutrients={false} />
                <div className="text-sm text-gray-600 mt-2">
                  <div>แคลอรี่ (kcal) {foodData.dinner.calories}</div>
                  <div>คาร์โบไฮเดรต {foodData.dinner.carbs} g</div>
                  <div>โปรตีน {foodData.dinner.protein} g</div>
                </div>
              </div>
            </div>

            {/* Thin Divider Line */}
            <div className="border-t border-gray-300 mb-8"></div>

            {/* Snacks Section */}
            <MealSection
              title="ของว่าง"
              items={foodData.snacks}
              totalCalories={foodData.snacks.reduce((sum, item) => sum + item.calories, 0)}
              showDivider={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailView;