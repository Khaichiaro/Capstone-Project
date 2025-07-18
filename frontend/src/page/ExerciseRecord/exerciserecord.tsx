import { useEffect, useState } from 'react';
import NavBar from '../../component/navbar/NavBar';
import '../../interfaces/IExercise'
import '../../interfaces/IExerciseType'
import { GetExercisesByExerciseTypeID, ListExerciseTypes } from "../../services/https/index";
import type { IExerciseType } from "../../interfaces/IExerciseType";

const ExerciseRecord = () => {
  
  const [exerciseTypes, setExerciseTypes] = useState<IExerciseType[]>([]);
  const [expandedCard, ] = useState<number | null>(null);
  const [exerciseByType, setExerciseByType] = useState<{ [key: number]: string[] }>({});

  const fetchExercises = async (typeId: number) => {
    try {
      const res = await GetExercisesByExerciseTypeID(typeId);
      if (res.status === 200) {
        const exerciseNames = res.data.map((e: { Name: string }) => e.Name);
        setExerciseByType(prev => ({ ...prev, [typeId]: exerciseNames }));
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  // Image mapping based on exercise type ID
  const imageMap: { [key: number]: string } = {
    1: "/Cardio.jpg",      // Cardio
    2: "/Strength.jpg",    // Strength Training
    3: "/Flexibility.jpg"  // Flexibility/Mobility
  };

  // Thai subtitle mapping
  const subtitleMap: { [key: number]: string } = {
    1: '(คาร์ดิโอ)',
    2: '(เวทเทรนนิ่ง / เพิ่มกล้ามเนื้อ)',
    3: '(ยืดหยุ่น / เพิ่มความยืดหยุ่น)'
  };

  // Description mapping
  const descriptionMap: { [key: number]: { description: string, subdesc: string } } = {
    1: {
      description: 'การออกกำลังกายที่เพิ่มอัตราการเต้นของหัวใจ',
      subdesc: 'และช่วยเผาผลาญคาโลรี่ได้ดี'
    },
    2: {
      description: 'การฝึกความแข็งแรงของกล้ามเนื้อ',
      subdesc: 'โดยใช้น้ำหนักหรือแรงต้าน'
    },
    3: {
      description: 'การออกกำลังกายเพื่อเพิ่มความยืดหยุ่น',
      subdesc: 'ของกล้ามเนื้อและข้อต่อ'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await ListExerciseTypes();
      if (res.status === 200) {
        console.log(res.data)
        setExerciseTypes(res.data);
      } else {
        console.error("โหลดข้อมูล ExerciseType ไม่สำเร็จ:", res);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (expandedCard && !exerciseByType[expandedCard]) {
      fetchExercises(expandedCard);
    }
  }, [expandedCard]);


  return (
    <div className="min-h-screen bg-white ">
      <NavBar/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Workout Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {exerciseTypes.map((exerciseType) => (
            <div
              key={exerciseType.ID}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105"
            >
              {/* Image Section */}
              <div className="p-8 pb-4">
                <div className="w-32 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={imageMap[exerciseType.ID]}
                    alt={exerciseType.Name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  {exerciseType.Name}
                </h3>
                <p className="text-center text-gray-600 mb-4">
                  {subtitleMap[exerciseType.ID]}
                </p>

                {/* Description */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 text-sm mb-1 leading-relaxed">
                    {descriptionMap[exerciseType.ID]?.description}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {descriptionMap[exerciseType.ID]?.subdesc}
                  </p>
                </div>

                
              </div>  
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExerciseRecord;



