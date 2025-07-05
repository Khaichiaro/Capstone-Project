import { useState } from 'react';
import { ChevronDown, } from 'lucide-react';
import NavBar from '../../component/navbar/NavBar';

const ExerciseRecord = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const workoutData = [
    {
      id: 1,
      title: 'Cardio',
      subtitle: '(คาร์ดิโอ)',
      description: 'การออกกำลังกายที่เพิ่มอัตราการเต้นของหัวใจ',
      subdesc: 'และช่วยเผาผลาญคาโลรี่ได้ดี',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Strength Training',
      subtitle: '(เวทเทรนนิ่ง / เพิ่มกล้ามเนื้อ)',
      description: 'การฝึกความแข็งแรงของกล้ามเนื้อ',
      subdesc: 'โดยใช้น้ำหนักหรือแรงต้าน',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Flexibility / Mobility',
      subtitle: '(ยืดหยุ่น / เพิ่มความยืดหยุ่น)',
      description: 'การออกกำลังกายเพื่อเพิ่มความยืดหยุ่น',
      subdesc: 'ของกล้ามเนื้อและข้อต่อ',
      image: 'https://hips.hearstapps.com/hmg-prod/images/yoga-stretches-668d37767172b.jpg?crop=0.613xw:0.920xh;0.131xw,0.0268xh&resize=1200:*'
    }
  ];

  return (
    <div className="min-h-screen bg-white ">
      <NavBar/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Workout Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {workoutData.map((workout) => (
            <div
              key={workout.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105"
            >
              {/* Image Section */}
              <div className="p-8 pb-4">
                <div className="w-32 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={workout.image}
                    alt={workout.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  {workout.title}
                </h3>
                <p className="text-center text-gray-600 mb-4">
                  {workout.subtitle}
                </p>

                {/* Description */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 text-sm mb-1 leading-relaxed">
                    {workout.description}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {workout.subdesc}
                  </p>
                </div>

                {/* Button */}
                <div className="flex justify-center">
                  <button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 shadow-sm hover:shadow-md"
                    onClick={() => setExpandedCard(expandedCard === workout.id ? null : workout.id as number | null)}
                  >
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        expandedCard === workout.id ? 'rotate-180' : ''
                      }`} 
                    />
                    <span className="font-medium">เลือกกิจกรรม</span>
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedCard === workout.id && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-600"></p>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-700"> วิ่ง</p>
                        <p className="text-sm text-gray-700"> เดินเร็ว</p>
                        <p className="text-sm text-gray-700"> กระโดดเชือก</p>
                        <p className="text-sm text-gray-700"> ว่ายน้ำ</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExerciseRecord;

