import React, { useState } from 'react';
import NavBar from '../../component/navbar/NavBar';

interface ScheduleItem {
  time: string;
  type: string;
  category: string;
  details: string;
  calories: string;
  notes: string;
}

const FitnessScheduleUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  const scheduleData: ScheduleItem[] = [
    {
      time: '06:30 - 07:00',
      type: 'ออกกำลังกาย',
      category: 'Strength',
      details: 'Weight Training (Chest & Arms)',
      calories: 'พลังงาน ~350 kcal',
      notes: ''
    },
    {
      time: '07:30 - 08:00',
      type: 'อาหาร',
      category: 'Meal',
      details: 'ข้าวผัด + ไข่ดาว + แตงกวา',
      calories: '500 kcal',
      notes: 'โปรตีน'
    },
    {
      time: '10:00 - 10:15',
      type: 'ของว่าง',
      category: 'Snack',
      details: 'กล้วยหอม + ถั่วลิสง',
      calories: '250 kcal',
      notes: 'พลังงานเพิ่มเติม'
    },
    {
      time: '12:00 - 12:30',
      type: 'อาหารกลางวัน',
      category: 'Meal',
      details: 'ข้าว + ผัดผัก + เต้าหู้',
      calories: '600 kcal',
      notes: 'โปรตีน + ไฟเบอร์'
    },
    {
      time: '15:00 - 15:15',
      type: 'ของว่าง',
      category: 'Snack',
      details: 'ไก่ต้ม + ซิปอร์ต',
      calories: '200 kcal',
      notes: 'คุณภาพ'
    },
    {
      time: '17:30 - 18:00',
      type: 'ออกกำลังกาย',
      category: 'Cardio',
      details: 'วิ่ง 30 นาที',
      calories: 'พลังงาน ~200 kcal',
      notes: ''
    },
    {
      time: '18:30 - 19:00',
      type: 'อาหาร',
      category: 'Meal',
      details: 'สลัดปลา + โยเกิร์ต',
      calories: '450 kcal',
      notes: 'ขา เบอร์'
    },
    {
      time: '21:00',
      type: 'ดื่มน้ำ / ยาสี',
      category: 'Mind & Body',
      details: 'ดื่มน้ำ 1.5 ลิตร / โยคะ',
      calories: '',
      notes: 'ปรับจิตอารมณ์'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strength':
        return 'bg-blue-100 text-blue-800';
      case 'Meal':
        return 'bg-green-100 text-green-800';
      case 'Snack':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cardio':
        return 'bg-red-100 text-red-800';
      case 'Mind & Body':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <NavBar/>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-2 inline-flex">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'daily'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              รายวัน
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'weekly'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              รายสัปดาห์
            </button>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-100 border-b">
            <div className="grid grid-cols-6 gap-4 p-4 font-medium text-gray-700">
              <div>เวลา</div>
              <div>กิจกรรม</div>
              <div>ประเภท</div>
              <div>รายละเอียด</div>
              <div>แคลอรี่ (กิโลแคลอรี่)</div>
              <div>หมายเหตุ</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {scheduleData.map((item, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div className="text-sm text-gray-600 font-mono">{item.time}</div>
                <div className="text-sm text-gray-800">{item.type}</div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <div className="text-sm text-gray-800">{item.details}</div>
                <div className="text-sm text-gray-600">{item.calories}</div>
                <div className="text-sm text-gray-600">{item.notes}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end mt-8">
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
            ปรับแผนสุขภาพ
          </button>
        </div>
      </main>
    </div>
  );
};

export default FitnessScheduleUI;