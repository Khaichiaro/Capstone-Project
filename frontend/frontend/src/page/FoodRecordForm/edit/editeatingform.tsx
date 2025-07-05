
// import React from 'react';

// import NavBar from '../../../component/navbar/NavBar';
// import { useNavigate } from 'react-router-dom';


// interface FoodItem {
//   name: string;
//   image: string;
//   calories: number;
//   carbs: number;
//   protein: number;
//   fat: number;
// }

// interface FoodDetailData {
//   date: string;
//   breakfast: FoodItem;
//   lunch: FoodItem[];
//   dinner: FoodItem;
//   snacks: FoodItem[];
// }

// const FoodDetailView: React.FC = () => {
//   const navigate = useNavigate();
//   const foodData: FoodDetailData = {
//     date: "10 ก.พ 2025",
//     breakfast: {
//       name: "ข้าวไข่เจียว",
//       image: "/public/kaokaijiaw.jpg",
//       calories: 153,
//       carbs: 12,
//       protein: 11,
//       fat: 6.6
//     },
//     lunch: [
//       {
//         name: "ก๋วยเตี้ยว",
//         image: "public/noodle.jpg",
//         calories: 178,
//         carbs: 21,
//         protein: 25,
//         fat: 4.5
//       },
//       {
//         name: "โค้ก",
//         image: "/public/coke.jpg",
//         calories: 139,
//         carbs: 21,
//         protein: 25,
//         fat: 4.4
//       }
//     ],
//     dinner: {
//       name: "ข้าวผัด",
//       image: "/public/kaopad.jpg",
//       calories: 178,
//       carbs: 24.4,
//       protein: 34.5,
//       fat: 43.4
//     },
//     snacks: [
//       {
//         name: "แอปเปิ้ล",
//         image: "/public/apple.jpg",
//         calories: 138,
//         carbs: 21,
//         protein: 4.5,
//         fat: 25
//       }
//     ]
//   };

//   const FoodItemDisplay: React.FC<{ item: FoodItem; showNutrients?: boolean }> = ({
//     item,
//     showNutrients = true
//   }) => (
//     <div className="flex items-start gap-4 mb-4">
//       <img
//         src={item.image}
//         alt={item.name}
//         className="w-16 h-16 rounded-full object-cover flex-shrink-0"
//       />
//       <div className="flex-1">
//         <h4 className="font-medium text-gray-800 mb-1">{item.name}</h4>
//         {showNutrients && (
//           <div className="text-sm text-gray-600 space-y-1">
//             <div>แคลอรี่ (kcal) {item.calories}</div>
//             <div>คาร์โบไฮเดรต {item.carbs} g</div>
//             <div>โปรตีน {item.protein} g</div>
//             <div>ไขมัน {item.fat} g</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const MealSection: React.FC<{
//     title: string;
//     items: FoodItem | FoodItem[];
//     totalCalories: number;
//     showDivider?: boolean;
//   }> = ({ title, items, totalCalories, showDivider = true }) => {
//     const itemArray = Array.isArray(items) ? items : [items];

//     return (
//       <>
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-bold text-gray-800">{title}</h3>
//             <span className="text-gray-600">{totalCalories} แคลอรี่ (kcal)</span>
//           </div>
//           {itemArray.map((item, index) => (
//             <FoodItemDisplay key={index} item={item} />
//           ))}
//         </div>
//         {showDivider && <div className="border-t border-gray-300 mb-8"></div>}
//       </>
//     );
//   };

//     const handleToeatingdetail = () => {
//     navigate('/eatingdetail', );
//   };

//   return (
//     <div>
//       <NavBar />
//       <div className="max-w-8xl mx-auto p-6 lg:p-10">
//         {/* Header with Add Button */}


//         {/* Main Content Card */}
//         <div className="bg-green-200 rounded-3xl p-6">
//           <div className="bg-white rounded-2xl p-8">
//             {/* Title and Date */}
//             <div className="mb-8">
//               <h2 className="font-bold text-2xl text-green-900 mb-2">บันทึกการกินอาหาร</h2>
//               <p className="text-gray-600">วันศุกร์ที่ {foodData.date}</p>
//             </div>

//             {/* Three Column Layout for Main Meals */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//               {/* Breakfast */}
//               <div className="md:pr-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-bold text-green-900">มื้อเช้า</h3>
//                   <span className="text-gray-600">{foodData.breakfast.calories} แคลอรี่ (kcal)</span>
//                 </div>
//                 <FoodItemDisplay item={foodData.breakfast} showNutrients={false} />
//                 <div className="text-sm text-gray-600 mt-2">
//                   <div>แคลอรี่ (kcal) {foodData.breakfast.calories}</div>
//                   <div>คาร์โบไฮเดรต {foodData.breakfast.carbs} g</div>
//                   <div>โปรตีน {foodData.breakfast.protein} g</div>
//                 </div>
//               </div>



//               {/* Lunch */}
//               <div className="md:px-4 md:border-l md:border-r md:border-gray-300">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-bold text-green-900">มื้อเที่ยง</h3>
//                   <span className="text-gray-600">{foodData.lunch.reduce((sum, item) => sum + item.calories, 0)} แคลอรี่ (kcal)</span>
//                 </div>
//                 {foodData.lunch.map((item, index) => (
//                   <div key={index} className="mb-4">
//                     <FoodItemDisplay item={item} showNutrients={false} />
//                     <div className="text-sm text-gray-600 mt-2">
//                       <div>แคลอรี่ (kcal) {item.calories}</div>
//                       <div>คาร์โบไฮเดรต {item.carbs} g</div>
//                       <div>โปรตีน {item.protein} g</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Dinner */}
//               <div className="md:pl-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-bold text-green-900">มื้อเย็น</h3>
//                   <span className="text-gray-600">{foodData.dinner.calories} แคลอรี่ (kcal)</span>
//                 </div>
//                 <FoodItemDisplay item={foodData.dinner} showNutrients={false} />
//                 <div className="text-sm text-gray-600 mt-2">
//                   <div>แคลอรี่ (kcal) {foodData.dinner.calories}</div>
//                   <div>คาร์โบไฮเดรต {foodData.dinner.carbs} g</div>
//                   <div>โปรตีน {foodData.dinner.protein} g</div>
//                 </div>
//               </div>
//             </div>

//             {/* Thin Divider Line */}
//             <div className="border-t border-gray-300 mb-8"></div>

//             {/* Snacks Section */}
//             <MealSection
//               title="ของว่าง"
//               items={foodData.snacks}
//               totalCalories={foodData.snacks.reduce((sum, item) => sum + item.calories, 0)}
//               showDivider={false}
//             />

//           <div className="flex gap-4 justify-end mb-6 pt-6">
//             <button className="bg-green-100 text-black px-15 py-2 rounded-full text-sm font-medium hover:bg-red-700 hover:text-white transition-colors"
//               onClick={handleToeatingdetail}>
//               ยกเลิก
//             </button>
                
//             <button className="bg-green-400 text-black px-15 py-2 rounded-full text-sm font-medium hover:bg-green-700 hover:text-white transition-colors"
//               onClick={handleToeatingdetail}>
//               บันทึก
//             </button>
//           </div>

//           </div>
//         </div>


//       </div>
//     </div>
//   );
// };

// export default FoodDetailView;




import React, { useState } from 'react';

import NavBar from '../../../component/navbar/NavBar';
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [tempFood, setTempFood] = useState<FoodItem | null>(null);
  
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

const handleEditFood = (item: FoodItem) => {
    setEditingFood(item);
    setTempFood({ ...item });
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditingFood(null);
    setTempFood(null);
  };

  const handleSaveFood = () => {
    // Here you would typically update the food data
    console.log('Saving food:', tempFood);
    handleClosePopup();
  };

  const handleInputChange = (field: keyof FoodItem, value: string | number) => {
    if (tempFood) {
      setTempFood({
        ...tempFood,
        [field]: field === 'name' ? value : Number(value)
      });
    }
  };

 const EditPopup = () => {
    if (!isPopupOpen || !tempFood) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">แก้ไขอาหาร</h2>
              <button
                onClick={handleClosePopup}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Food Image */}
              <div>
                <img
                  src={tempFood.image}
                  alt={tempFood.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Food Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่ออาหาร
                  </label>
                  <input
                    type="text"
                    value={tempFood.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="ก๋วยเตี้ยว"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Calories and Carbs Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      แคลอรี่
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={tempFood.calories}
                        onChange={(e) => handleInputChange('calories', e.target.value)}
                        placeholder="138"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 text-sm">กิโล</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ไขมัน
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={tempFood.fat}
                        onChange={(e) => handleInputChange('fat', e.target.value)}
                        placeholder="2.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 text-sm">กรัม</span>
                    </div>
                  </div>
                </div>

                {/* Carbs and Protein Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      คาร์โบไฮเดรต
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={tempFood.carbs}
                        onChange={(e) => handleInputChange('carbs', e.target.value)}
                        placeholder="25"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 text-sm">กรัม</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      โปรตีน
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={tempFood.protein}
                        onChange={(e) => handleInputChange('protein', e.target.value)}
                        placeholder="4.5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 text-sm">กรัม</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end mt-8 pt-6 border-t">
              <button
                onClick={handleClosePopup}
                className="bg-gray-100 text-gray-700 px-8 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSaveFood}
                className="bg-green-500 text-white px-8 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const FoodItemDisplay: React.FC<{ item: FoodItem; showNutrients?: boolean; showEdit?: boolean }> = ({
    item,
    showNutrients = true,
    showEdit = true
  }) => (
    <div className="flex items-start gap-4 mb-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => handleEditFood(item)}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-gray-800">{item.name}</h4>
          {showEdit && (
            <button
              onClick={() => handleEditFood(item)}
              className="text-green-600 hover:text-green-800 text-sm underline ml-2"
            >
              edit
            </button>
          )}
        </div>

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

  const handleToeatingdetail = () => {
    navigate('/eatingdetail', );
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-8xl mx-auto p-6 lg:p-10">
        {/* Header with Add Button */}


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

          <div className="flex gap-4 justify-end mb-6 pt-6">
            <button className="bg-green-100 text-black px-15 py-2 rounded-full text-sm font-medium hover:bg-red-700 hover:text-white transition-colors"
              onClick={handleToeatingdetail}>
              ยกเลิก
            </button>
                
            <button className="bg-green-400 text-black px-15 py-2 rounded-full text-sm font-medium hover:bg-green-700 hover:text-white transition-colors"
              onClick={handleToeatingdetail}>
              บันทึก
            </button>      
          </div>

          </div>
        </div>


      </div>
      <EditPopup />
    </div>
  );
};

export default FoodDetailView;



