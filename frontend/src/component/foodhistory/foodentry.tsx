
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type FoodEntryData } from '../../component/foodhistory/types';

interface FoodEntryProps {
  entry: FoodEntryData;
  onClick: () => void; // สำหรับแสดงกราฟแดชบอร์ด
}

const FoodEntry: React.FC<FoodEntryProps> = ({ entry, onClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    onClick(); // แสดงกราฟแดชบอร์ดค่าโภชนาการ
  };

  const handleDetailButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // ป้องกันไม่ให้ trigger การคลิกการ์ด
    navigate('/editfood'); // ไปที่หน้า editfood
  };

  return (
    <div 
      className="relative rounded-3xl overflow-hidden w-95 mx-auto p-6 cursor-pointer"
      style={{
        backgroundColor: '#A8E6CF',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
      onClick={handleCardClick}
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
            <span className="text-gray-500">{entry.dinner.calories} แคลอรี่ (kcal)</span>
          </div>
          <div className="flex items-center gap-4">
            <img src={entry.dinner.image} alt={entry.dinner.name} className="w-14 h-14 object-contain" />
            <span className="text-gray-700">{entry.dinner.name}</span>
          </div>
        </div>

        {/* Button */}
        <div className="text-right mt-4">
          <button 
            className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 transition-colors"
            onClick={handleDetailButtonClick}
          >
            ดูรายละเอียดเพิ่มเติม &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodEntry;