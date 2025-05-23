// // components/FoodEntry.tsx
// import React from 'react';
// import { type FoodEntryData } from '../../component/foodhistory/types';

// interface FoodEntryProps {
//   entry: FoodEntryData;
//   onClick: () => void;
// }

// const FoodEntry: React.FC<FoodEntryProps> = ({ entry, onClick }) => {
//   return (
//     <div className="food-entry-card" onClick={onClick}
//          style={{
//            backgroundColor: '#A8E6CF',
//          }}>

//       <div className="food-entry-header">
//         <h3>บันทึกการกินอาหาร</h3>
//         <p>วันที่ {entry.date}</p>
//       </div>
      
//       <div className="food-item">
//         <div className="food-label">มื้อเช้า</div>
//         <div className="food-details">
//           <div className="food-calories">{entry.breakfast.calories} แคลอรี่ (kcal)</div>
//           <div className="food-image-container">
//             <img src={entry.breakfast.image} alt={entry.breakfast.name} className="food-image" />
//           </div>
//           <div className="food-name">{entry.breakfast.name}</div>
//         </div>
//       </div>
      
//       <div className="food-item">
//         <div className="food-label">มื้อเที่ยง</div>
//         <div className="food-details">
//           <div className="food-calories">{entry.lunch.calories} แคลอรี่ (kcal)</div>
//           <div className="food-image-container">
//             <img src={entry.lunch.image} alt={entry.lunch.name} className="food-image" />
//           </div>
//           <div className="food-name">{entry.lunch.name}</div>
//         </div>
//       </div>
      
//       <div className="food-item">
//         <div className="food-label">มื้อเย็น</div>
//         <div className="food-details">
//           <div className="food-calories">{entry.dinner.calories} แคลอรี่ (kcal)</div>
//           <div className="food-image-container">
//             <img src={entry.dinner.image} alt={entry.dinner.name} className="food-image" />
//           </div>
//           <div className="food-name">{entry.dinner.name}</div>
//         </div>
//       </div>
      
//       <button className="detail-button">ดูรายละเอียดเพิ่มเติม &gt;&gt;</button>
//     </div>
//   );
// };

// export default FoodEntry;



// components/FoodEntry.tsx
import React from 'react';
import { type FoodEntryData } from '../../component/foodhistory/types';

interface FoodEntryProps {
  entry: FoodEntryData;
  onClick: () => void;
}

const FoodEntry: React.FC<FoodEntryProps> = ({ entry, onClick }) => {
  return (
    <div 
      className="relative rounded-3xl overflow-hidden w-95 mx-auto p-6"
      style={{
        backgroundColor: '#A8E6CF',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
      onClick={onClick}
    >
      {/* White inner container */}
      <div className="bg-white rounded-2xl p-5 relative">
        {/* Header */}
        <div className="mb-6">
          <h3 className="font-bold text-xl text-green-800">บันทึกการกินอาหาร</h3>
          <p className="text-gray-600">วันที่ {entry.date}</p>
        </div>

        {/* มื้อเช้า */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg text-green-700">มื้อเช้า</span>
            <span className="text-gray-500">{entry.breakfast.calories} แคลอรี่ (kcal)</span>
          </div>
          <div className="flex items-center gap-4">
            <img src={entry.breakfast.image} alt={entry.breakfast.name} className="w-14 h-14 object-cover rounded-full border border-gray-200" />
            <span className="text-gray-700">{entry.breakfast.name}</span>
          </div>
        </div>

        {/* มื้อเที่ยง */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg text-green-700">มื้อเที่ยง</span>
            <span className="text-gray-500">{entry.lunch.calories} แคลอรี่ (kcal)</span>
          </div>
          <div className="flex items-center gap-4">
            <img src={entry.lunch.image} alt={entry.lunch.name} className="w-14 h-14 object-cover rounded-full border border-gray-200" />
            <span className="text-gray-700">{entry.lunch.name}</span>
          </div>
        </div>

        {/* มื้อเย็น */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg text-green-700">มื้อเย็น</span>
          </div>
          <div className="flex items-center gap-4">
            <img src={entry.dinner.image} alt={entry.dinner.name} className="w-14 h-14 object-contain" />
            <span className="text-gray-700">{entry.dinner.name}</span>
          </div>
        </div>
        
        {/* Button */}
        <div className="text-right mt-4">
          <button 
            className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium"
          >
            ดูรายละเอียดเพิ่มเติม &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodEntry;



