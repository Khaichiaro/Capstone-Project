// components/FoodHistory.tsx
import React from 'react';
import FoodEntry from './foodentry';
import { type FoodEntryData } from '../../component/foodhistory/types';

interface FoodHistoryProps {
  onFoodEntryClick: (id: string) => void;
}

const FoodHistory: React.FC<FoodHistoryProps> = ({ onFoodEntryClick }) => {
  // ข้อมูลจำลองสำหรับประวัติการกินอาหาร
  const foodEntries: FoodEntryData[] = [
    {
      id: '1',
      date: '10 ก.พ. 2565',
      breakfast: {
        name: 'ข้าวไข่เจียว',
        calories: 153,
        image: '/public/kaokaijiew.jpg'
      },
      lunch: {
        name: 'ก๋วยเตี๋ยว',
        calories: 178,
        image: '/public/noodle.jpg'
      },
      dinner: {
        name: 'โค๊ก',
        calories: 150,
        image: '/public/coke.jpg'
      },
      nutritionData: {
        calories: 481,
        fat: 15,
        carbs: 65,
        protein: 20
      }
    },
    {
      id: '2',
      date: '9 ก.พ. 2565',
      breakfast: {
        name: 'ข้าวต้ม',
        calories: 153,
        image: '/public/kaotom.jpg'
      },
      lunch: {
        name: 'ส้มตำ',
        calories: 178,
        image: '/public/papayasalad.jpg'
      },
      dinner: {
        name: 'น้ำส้ม',
        calories: 150,
        image: '/public/namsom.jpg'
      },
      nutritionData: {
        calories: 481,
        fat: 12,
        carbs: 70,
        protein: 18
      }
    },
    {
      id: '3',
      date: '8 ก.พ. 2565',
      breakfast: {
        name: 'ข้าวไข่เจียว',
        calories: 153,
        image: '/public/kaokaijiew.jpg'
      },
      lunch: {
        name: 'ก๋วยเตี๋ยว',
        calories: 178,
        image: '/public/noodle.jpg'
      },
      dinner: {
        name: 'โค๊ก',
        calories: 150,
        image: '/public/coke.jpg'
      },
      nutritionData: {
        calories: 481,
        fat: 18,
        carbs: 60,
        protein: 21
      }
    },
    {
      id: '4',
      date: '7 ก.พ. 2565',
       breakfast: {
        name: 'ข้าวต้ม',
        calories: 153,
        image: '/public/kaotom.jpg'
      },
      lunch: {
        name: 'ส้มตำ',
        calories: 178,
        image: '/public/papayasalad.jpg'
      },
      dinner: {
        name: 'น้ำส้ม',
        calories: 150,
        image: '/public/namsom.jpg'
      },
      nutritionData: {
        calories: 481,
        fat: 14,
        carbs: 68,
        protein: 19
      }
    },
    {
      id: '5',
      date: '6 ก.พ. 2565',
      breakfast: {
        name: 'ข้าวต้ม',
        calories: 153,
        image: '/public/kaotom.jpg'
      },
      lunch: {
        name: 'ส้มตำ',
        calories: 178,
        image: '/public/papayasalad.jpg'
      },
      dinner: {
        name: 'น้ำส้ม',
        calories: 150,
        image: '/public/namsom.jpg'
      },
      nutritionData: {
        calories: 481,
        fat: 16,
        carbs: 62,
        protein: 22
      }
    },
    {
      id: '6',
      date: '5 ก.พ. 2565',
      breakfast: {
        name: 'ข้าวต้ม',
        calories: 153,
        image: '/public/kaotom.jpg'
      },
      lunch: {
        name: 'ส้มตำ',
        calories: 178,
        image: '/public/papayasalad.jpg'
      },
      dinner: {
        name: 'น้ำส้ม',
        calories: 150,
        image: '/public/namsom.jpg'
      },
      nutritionData: {
        calories: 481,
        fat: 13,
        carbs: 67,
        protein: 17
      }
    }
  ];

  return (
    <div className="food-history-grid">
      {foodEntries.map(entry => (
        <FoodEntry
          key={entry.id}
          entry={entry}
          onClick={() => onFoodEntryClick(entry.id)}
        />
      ))}
    </div>
  );
};

export default FoodHistory;