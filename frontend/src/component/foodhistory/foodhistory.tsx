

import React, { useEffect, useState } from 'react';
import FoodEntry from './foodentry';
import { message } from 'antd';
import { GetMeal } from '../../services/https';
import type { IMeals } from '../../interfaces/IMeals';

interface FoodHistoryProps {
  onFoodEntryClick: (id: string) => void;
}

const FoodHistory: React.FC<FoodHistoryProps> = ({ onFoodEntryClick }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [foodEntries, setFoodEntries] = useState<IMeals[]>([]);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await GetMeal();
        // console.log("API response:", res.data); 

        if (res.data && Array.isArray(res.data)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const entries: IMeals[] = res.data.map((meal: any, index: number) => {
            // console.log("Mapping meal:", meal); 
            return {
              ...meal,
              id: `${meal.ID || index}-${index}`,
            };
          });

          setFoodEntries(entries);
        } else {
          messageApi.error("ไม่พบข้อมูลรายการอาหาร");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        messageApi.error("เกิดข้อผิดพลาดในการโหลดข้อมูลอาหาร");
      }
    };

    fetchMeal();
  }, []);
  

  return (
    <>
      {contextHolder}
      <div className="food-history-grid">
        {foodEntries.map((entry) => (
          <FoodEntry
            key={entry.ID}
            entry={entry}
            onClick={() => onFoodEntryClick(entry.ID?.toString() || '')} // ใช้ ID เป็น string
          />
          
        ))}

      </div>
    </>
  );
};

export default FoodHistory;
