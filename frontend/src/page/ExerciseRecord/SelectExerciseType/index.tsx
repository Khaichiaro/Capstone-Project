// // SelectExerciseType.tsx
// import { useEffect, useState } from 'react';

// import { ListExerciseTypes } from '../../../services/https'; // เชื่อมกับ API
// import type { IExerciseType } from '../../../interfaces/IExerciseType';
// import { useNavigate } from 'react-router-dom'; // สมมุติว่าใช้ React Router
// import NavBar from '../../../component/navbar/NavBar';

// const SelectExerciseType = () => {
//   const [exerciseTypes, setExerciseTypes] = useState<IExerciseType[]>([]);
//   const navigate = useNavigate();

//   // โหลดข้อมูลประเภทการออกกำลังกายจาก backend
//   useEffect(() => {
//     const fetchTypes = async () => {
//       const res = await ListExerciseTypes();
//       if (res?.data) {
//         setExerciseTypes(res.data);
//       }
//     };
//     fetchTypes();
//   }, []);


//   // เมื่อเลือกประเภท ให้ส่ง ID ไปหน้า form (สมมุติใช้ URL param หรือ state)
//   const handleActivityTypeSelect = (typeId: number) => {
//     navigate(`/exercise-form?typeId=${typeId}`);
//   };

//  // ฟังก์ชันสำหรับเลือกรูปภาพตามประเภท
//   // Image mapping based on exercise type ID
//   const imageMap: { [key: number]: string } = {
//     1: "/Cardio.jpg",      // Cardio
//     2: "/Strength.jpg",    // Strength Training
//     3: "/Flexibility.jpg"  // Flexibility/Mobility
//   };


//   return (
//     <div className="min-h-screen bg-gray-50"> 
//       {/* Header */}
//         <NavBar />

//       {/* Content */}
//       <div className="max-w-6xl mx-auto px-6 py-8">
//         <h1 className="text-lg font-semibold text-gray-900 mb-6">เลือกประเภทกิจกรรม</h1>
        
//         {/* Grid Layout สำหรับ card แนวนอน */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {exerciseTypes.map((type) => (
//             <button
//               key={type.ID}
//               onClick={() => handleActivityTypeSelect(type.ID)}
//               className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
//             >
//               {/* รูปภาพ */}
//               <div className="relative h-48 w-full">
//                 <img
//                     src={imageMap[type.ID]}
//                     alt={type.Name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     console.error('Image load error for ID:', type.ID, 'Name:', type.Name);
//                     e.currentTarget.src = "/Cardio.jpg"; // fallback to default
//                   }}
//                   onLoad={() => {
//                     console.log('Image loaded successfully for ID:', type.ID, 'Name:', type.Name);
//                   }}
//                 />
//                 {/* Overlay เพื่อให้ข้อความอ่านง่าย */}
//                 <div className="absolute inset-0 bg-black bg-opacity-30"></div>
//               </div>
              
//               {/* ข้อมูล */}
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="text-left">
//                     <h3 className="text-lg font-semibold text-gray-900">{type.Name}</h3>
//                     {/* <p className="text-sm text-gray-500 mt-1">{type.Description || 'ไม่มีคำอธิบาย'}</p> */}
//                   </div>
//                   <div className="text-gray-400">
//                     <ArrowLeft className="w-5 h-5 rotate-180" />
//                   </div>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* ปุ่มย้อนกลับ */}
//         <div className="fixed bottom-6 right-6 z-50">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors "
//           >
//             <ArrowLeft className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//     </div>
    
//   );
// };

// export default SelectExerciseType;


import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../component/navbar/NavBar';
import { ListExerciseTypes } from '../../../services/https';
import type { IExerciseType } from '../../../interfaces/IExerciseType';

const SelectExerciseType = () => {
  const [exerciseTypes, setExerciseTypes] = useState<IExerciseType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await ListExerciseTypes();
      if (res?.data) {
        setExerciseTypes(res.data);
      }
    };
    fetchTypes();
  }, []);

  const handleActivityTypeSelect = (typeId: number) => {
    navigate(`/exercise-form?typeId=${typeId}`);
  };

  const imageMap: { [key: number]: string } = {
    1: "/Cardio.jpg",
    2: "/Strength.jpg",
    3: "/Flexibility.jpg"
  };

  const subtitleMap: { [key: number]: string } = {
    1: '(คาร์ดิโอ)',
    2: '(เวทเทรนนิ่ง / เพิ่มกล้ามเนื้อ)',
    3: '(ยืดหยุ่น / เพิ่มความยืดหยุ่น)'
  };

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

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-xl font-semibold text-gray-800 mb-8">เลือกประเภทกิจกรรม</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {exerciseTypes.map((type) => (
            <button
              key={type.ID}
              onClick={() => handleActivityTypeSelect(type.ID)}
              className="bg-[#FCF2DD] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105 text-left flex flex-col"
            >
              {/* รูปเต็มติดขอบบน */}
              <div className="w-full h-60 overflow-hidden">
                <img
                  src={imageMap[type.ID]}
                  alt={type.Name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/Cardio.jpg";
                  }}
                />
              </div>
                
              {/* เนื้อหาใน Card */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  {type.Name}
                </h3>
                <p className="text-center text-gray-600 mb-4">
                  {subtitleMap[type.ID]}
                </p>
                
                <div className="text-center mb-2">
                  <p className="text-gray-700 text-sm mb-1 leading-relaxed">
                    {descriptionMap[type.ID]?.description}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {descriptionMap[type.ID]?.subdesc}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-800 flex items-center justify-center hover:bg-gray-200 transition-colors "
        >
          <ArrowLeft className="w-8 h-8 text-white" />
        </button>
      </div>  
    </div>
  );
};

export default SelectExerciseType;

