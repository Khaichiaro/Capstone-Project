// import React, { useState } from 'react';
// import NavBar from '../../../../component/navbar/NavBar';
// import { useNavigate } from 'react-router-dom';
// import type { UserProfileInterface } from '../../../../interfaces/IUserProfile';
// import type { NutritionGoalInterface } from '../../../../interfaces/INutritionGoal';
// import type { LevelInterface } from '../../../../interfaces/IUserLevel';

// // Interface สำหรับข้อมูลผู้ใช้
// // interface UserProfileInterface {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   phoneNumber: string;
// //   birthDate: string;
// //   gender: string;
// //   weight: number;
// //   height: number;
// //   allergies: string;
// //   medicalConditions: string;
// // }

// // Interface สำหรับเป้าหมายโภชนาการ
// // interface NutritionGoals {
// //   calories: number;
// //   protein: number;
// //   carbs: number;
// //   fat: number;
// // }

// // Interface สำหรับระดับผู้ใช้
// // interface UserLevel {
// //   level: number;
// //   progress: number;
// // }

// const DashboardProfile: React.FC = () => {
//   // State สำหรับข้อมูลผู้ใช้
//   const [userProfile] = useState<UserProfileInterface>({
//     FirstName: 'Test',
//     LastName: 'Project',
//     // email: 'test@gmail.com',
//     Phone: '0888888888',
//     DateOfBirth: '15/05/1987',
//     GenderID: 1,
//     WeightKg: 64,
//     HeightCm: 170,
//     FoodAllergies: 'กุ้ง',
//     MedicalConditions: '-'
//   });

//   // State สำหรับเป้าหมายโภชนาการ
//   const [nutritionGoals] = useState<NutritionGoalInterface>({
//     calories: 2000,
//     protein: 75,
//     carbs: 220,
//     fat: 65
//   });

//   // State สำหรับระดับผู้ใช้
//   const [userLevel] = useState<LevelInterface>({
//     Name: 'Level 1',
//     progress: 70,
//   });

//   const navigate = useNavigate();

// const handleEditProfile = () => {
//   navigate('/edit-profile'); // เปลี่ยนไปหน้า /edit-profile
// };

//   return (
//     <div className="min-h-screen bg-yellow-50">
//         <NavBar />

//       {/* Main Content */}
//       <main className="p-8 max-w-6xl mx-auto">
//         {/* User Level Section */}
//         <div className="flex items-center gap-8 bg-white bg-opacity-90 p-8 rounded-3xl mb-8 shadow-2xl backdrop-blur-md border border-white border-opacity-20">
//           <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-3xl font-bold text-gray-800 shadow-lg">
//             <span>T</span>
//           </div>
//           <div className="flex-1">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">{userProfile.FirstName} {userProfile.LastName}</h2>
//             <div className="flex items-center gap-4">
//               <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
//                 Level {userLevel.level}
//               </span>
//               <div className="flex-1 h-3 bg-black bg-opacity-10 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 shadow-md"
//                   style={{ width: `${userLevel.progress}%` }}
//                 ></div>
//               </div>
//               <span className="font-semibold text-green-600 text-lg">{userLevel.progress}%</span>
//             </div>
//           </div>
//         </div>

//         {/* Profile Information */}
//         <div className="bg-white bg-opacity-90 p-8 rounded-3xl mb-8 shadow-2xl backdrop-blur-md border border-white border-opacity-20">
//           <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-400 pb-2 inline-block">ข้อมูลส่วนตัว</h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                 <span className="font-semibold text-gray-600">อีเมล:</span>
//                 <span className="font-medium text-gray-800">{userProfile.email}</span>
//               </div>
              
//               <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                 <span className="font-semibold text-gray-600">เบอร์โทรศัพท์:</span>
//                 <span className="font-medium text-gray-800">{userProfile.Phone}</span>
//               </div>
              
//               <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                 <span className="font-semibold text-gray-600">วันเกิด:</span>
//                 <span className="font-medium text-gray-800">{userProfile.DateOfBirth}</span>
//               </div>
              
//               <div className="flex justify-between items-center py-3">
//                 <span className="font-semibold text-gray-600">เพศ:</span>
//                 <span className="font-medium text-gray-800">{userProfile.GenderID}</span>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                 <span className="font-semibold text-gray-600">น้ำหนัก:</span>
//                 <span className="font-medium text-gray-800">{userProfile.WeightKg} กิโลกรัม</span>
//               </div>
              
//               <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                 <span className="font-semibold text-gray-600">ส่วนสูง:</span>
//                 <span className="font-medium text-gray-800">{userProfile.HeightCm} เซนติเมตร</span>
//               </div>
              
//               <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                 <span className="font-semibold text-gray-600">ข้อมูลการแพ้อาหาร:</span>
//                 <span className="font-medium text-gray-800">{userProfile.FoodAllergies}</span>
//               </div>
              
//               <div className="flex justify-between items-center py-3">
//                 <span className="font-semibold text-gray-600">โรคประจำตัว:</span>
//                 <span className="font-medium text-gray-800">{userProfile.MedicalConditions}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Nutrition Goals */}
//         <div className="bg-white bg-opacity-90 p-8 rounded-3xl mb-8 shadow-2xl backdrop-blur-md border border-white border-opacity-20">
//           <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-400 pb-2 inline-block">เป้าหมายโภชนาการ</h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div className="flex items-center gap-4 p-6 bg-white bg-opacity-50 rounded-2xl border border-white border-opacity-30 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
//               <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center text-white">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-600 mb-2">แคลอรี่ต่อวัน:</p>
//                 <p className="text-2xl font-bold text-gray-800 mb-1">{nutritionGoals.calories.toLocaleString()}</p>
//                 <p className="text-sm text-gray-500">กิโลแคลอรี่</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4 p-6 bg-white bg-opacity-50 rounded-2xl border border-white border-opacity-30 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
//               <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center text-white">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-600 mb-2">โปรตีน:</p>
//                 <p className="text-2xl font-bold text-gray-800 mb-1">{nutritionGoals.protein}</p>
//                 <p className="text-sm text-gray-500">กรัม</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4 p-6 bg-white bg-opacity-50 rounded-2xl border border-white border-opacity-30 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="3" y="11" width="18" height="10" rx="2"></rect>
//                   <circle cx="12" cy="5" r="2"></circle>
//                   <path d="M12 7v4"></path>
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-600 mb-2">คาร์บ:</p>
//                 <p className="text-2xl font-bold text-gray-800 mb-1">{nutritionGoals.carbs}</p>
//                 <p className="text-sm text-gray-500">กรัม</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4 p-6 bg-white bg-opacity-50 rounded-2xl border border-white border-opacity-30 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
//               <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center text-white">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <circle cx="12" cy="12" r="3"></circle>
//                   <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-600 mb-2">ไขมัน:</p>
//                 <p className="text-2xl font-bold text-gray-800 mb-1">{nutritionGoals.fat}</p>
//                 <p className="text-sm text-gray-500">กรัม</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Button */}
//         <div className="flex justify-center">
//           <button 
//             className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-semibold px-8 py-4 rounded-full text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 hover:from-yellow-500 hover:to-yellow-400 shadow-lg"
//             onClick={handleEditProfile}
//           >
//             แก้ไขข้อมูลส่วนตัว
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardProfile;





import React, { useEffect, useState } from 'react';
import NavBar from '../../component/navbar/NavBar';
import { useNavigate } from 'react-router-dom';
import type { IUserProfile } from '../../interfaces/IUserProfile';
import type { NutritionGoalInterface } from '../../interfaces/INutritionGoal';
import type { IUser } from '../../interfaces/IUser';
import { GetLevelByUserProfileID, GetNutritionGoalByID, GetUserByID, GetUserProfileByID } from '../../services/https';
// import type { GenderInterface } from '../../../../interfaces/IGender';

// const formatDateThai = (isoDate?: string): string => {
//   if (!isoDate) return '-';
//   return new Date(isoDate).toLocaleDateString('th-TH', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   });
// };

// const formatDate = (isoDate: string): string => {
//   const date = new Date(isoDate);
//   return date.toLocaleDateString('th-TH'); // ได้เป็น 9/6/2568
// }

const formatDate = (isoDate?: string): string => {
  if (!isoDate) return "-";

  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear();

  return `${day}/${month}/${year}`
}

const DashboardProfile: React.FC = () => {

  const [user, setUser] = useState<IUser | null>(null);
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  // const [gender, setGender] = useState<GenderInterface | null>(null);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoalInterface | null>(null);
  const [level, setLevel] = useState<{level: string, progress: number} | null>(null);

  const getUserByID = async (id: string) => {
    const res = await GetUserByID(id);
    if(res.status){
      setUser(res.data)
    }
  }

  const getUserProfileByID = async (id: string) => {
    const res = await GetUserProfileByID(id)
    if(res.status){
      setUserProfile(res.data)
    }
  }

  // const getGender = async () => {
  //   const res = await ListGenders();
  //   if(res.status){
  //     setGender(res.data)
  //   }
  // }

  const getNutritionGoalByID = async (id: string) => {
    const res = await GetNutritionGoalByID(id);
    if(res.status){
      setNutritionGoals(res.data)
    }
  }

  const getLevelByUserProfileID = async (id: string) => {
    const res = await GetLevelByUserProfileID(id);
    if(res.status){
      setLevel({
        level: res.data.level,
        progress: res.data.progress,
      })
    }
  }

  useEffect(() => {
    localStorage.setItem("userID", "1");
    const UserID = localStorage.getItem("userID"); // ดึง id จาก localStorage ตั้งแต่แรก

    if (UserID) { // ตรวจสอบ id ที่ได้จาก localStorage
      getUserByID(UserID); // ดึงข้อมูล User หลัก
      getUserProfileByID(UserID); // ใช้ id นี้ดึง UserProfile เลย
      getNutritionGoalByID(UserID); // ใช้ id นี้ดึง NutritionGoal เลย
      getLevelByUserProfileID(UserID); // ใช้ id นี้ดึง Level เลย
    }

    // getGender(); // ดึงข้อมูลเพศ (ไม่ขึ้นกับ user ID)
  }, []); // Dependency array เป็น [] ทำให้ทำงานแค่ครั้งเดียวตอน mount
  
  // // State สำหรับข้อมูลผู้ใช้
  // const [userProfile] = useState<UserProfileInterface>({
  //   FirstName: 'Test',
  //   LastName: 'Project',
  //   // email: 'test@gmail.com',
  //   Phone: '0888888888',
  //   DateOfBirth: '15/05/1987',
  //   GenderID: 1,
  //   WeightKg: 64,
  //   HeightCm: 170,
  //   FoodAllergies: 'กุ้ง',
  //   MedicalConditions: '-'
  // });

  // // State สำหรับเป้าหมายโภชนาการ (ใช้ interface ใหม่)
  // const [nutritionGoals] = useState<NutritionGoalInterface>({
  //   ID: 1,
  //   GoalType: 'ลดน้ำหนัก',
  //   TargetWeight: 60,
  //   StartDate: '01/01/2025',
  //   EndDate: '31/12/2025',
  //   ProteinPercentage: 25,
  //   FatPercentage: 30,
  //   CarbPercentage: 45,
  //   CalculatedTDEE: 2200,
  //   TargetCalories: 1800,
  //   TargetProtein: 112,
  //   TargetCarbs: 202,
  //   TargetFat: 60,
  //   UserProfileID: 1
  // });

  // // State สำหรับระดับผู้ใช้
  // const [userLevel] = useState<LevelInterface>({
  //   Name: 'Level 1',
  //   progress: 70,
  // });

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  // ฟังก์ชันสำหรับแปลง GoalType เป็นสีและไอคอน
  const getGoalTypeStyle = (goalType: string) => {
    switch (goalType) {
      case 'ลดน้ำหนัก':
        return { color: 'from-red-400 to-red-500', icon: '↓' };
      case 'เพิ่มน้ำหนัก':
        return { color: 'from-green-400 to-green-500', icon: '↑' };
      case 'รักษาน้ำหนัก':
        return { color: 'from-blue-400 to-blue-500', icon: '=' };
      default:
        return { color: 'from-gray-400 to-gray-500', icon: '•' };
    }
  };

  const goalStyle = getGoalTypeStyle(nutritionGoals?.GoalType || '');

  return (
    <div className="min-h-screen bg-yellow-50">
      <NavBar />

      {/* Main Content */}
      <main className="p-8 max-w-6xl mx-auto">
        {/* User Level Section */}
        <div className="flex items-center gap-8 bg-white bg-opacity-90 p-8 rounded-3xl mb-8 shadow-2xl backdrop-blur-md border border-white border-opacity-20">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-3xl font-bold text-gray-800 shadow-lg">
            <span>T</span>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{userProfile?.FirstName} {userProfile?.LastName}</h2>
            <div className="flex items-center gap-4">
              <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                {level?.level}
              </span>
              <div className="flex-1 h-3 bg-black bg-opacity-10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 shadow-md"
                  style={{ width: `${level?.progress}%` }}
                ></div>
              </div>
              <span className="font-semibold text-green-600 text-lg">{level?.progress}%</span>
            </div>
          </div>
        </div>

        {/* Goal Overview Section */}
        <div className="bg-white bg-opacity-90 p-8 rounded-3xl mb-8 shadow-2xl backdrop-blur-md border border-white border-opacity-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-400 pb-2 inline-block">เป้าหมายหลัก</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`flex items-center gap-4 p-6 bg-gradient-to-r ${goalStyle.color} rounded-2xl text-white shadow-lg`}>
              <div className="text-3xl font-bold">{goalStyle.icon}</div>
              <div>
                <p className="text-lg font-semibold">{nutritionGoals?.GoalType}</p>
                <p className="text-sm opacity-90">เป้าหมาย: {nutritionGoals?.TargetWeight} กก.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl text-white shadow-lg">
              <div className="text-2xl">📅</div>
              <div>
                <p className="text-lg font-semibold">ระยะเวลา</p>
                <p className="text-sm opacity-90">{formatDate(nutritionGoals?.StartDate)} - {formatDate(nutritionGoals?.EndDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl text-white shadow-lg">
              <div className="text-2xl">🔥</div>
              <div>
                <p className="text-lg font-semibold">TDEE</p>
                <p className="text-sm opacity-90">{nutritionGoals?.CalculatedTDEE?.toLocaleString()} กิโลแคลอรี่</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white bg-opacity-90 p-8 rounded-3xl mb-8 shadow-2xl backdrop-blur-md border border-white border-opacity-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-400 pb-2 inline-block">ข้อมูลส่วนตัว</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">อีเมล:</span>
                <span className="font-medium text-gray-800">{user?.Email}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">เบอร์โทรศัพท์:</span>
                <span className="font-medium text-gray-800">{userProfile?.PhoneNumber}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">วันเกิด:</span>
                <span className="font-medium text-gray-800">{formatDate(userProfile?.DateOfBirth)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="font-semibold text-gray-600">เพศ:</span>
                <span className="font-medium text-gray-800">{user?.Gender.GenderName}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">ส่วนสูง:</span>
                <span className="font-medium text-gray-800">{userProfile?.Height} เซนติเมตร</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">น้ำหนัก:</span>
                <span className="font-medium text-gray-800">{userProfile?.Weight} กิโลกรัม</span>
              </div>
              
              {/* <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">ส่วนสูง:</span>
                <span className="font-medium text-gray-800">{userProfile?.HeightCm} เซนติเมตร</span>
              </div> */}
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">ข้อมูลการแพ้อาหาร:</span>
                <span className="font-medium text-gray-800">{userProfile?.FoodAllergy}</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="font-semibold text-gray-600">โรคประจำตัว:</span>
                <span className="font-medium text-gray-800">{userProfile?.MedicalCondition}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Goals - Target Calories */}
        <div className="bg-white bg-opacity-90 p-8 rounded-3xl mb-8 shadow-2xl backdrop-blur-md border border-white border-opacity-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-400 pb-2 inline-block">เป้าหมายโภชนาการ</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-6 bg-white bg-opacity-50 rounded-2xl border border-white border-opacity-30 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-600 mb-2">แคลอรี่เป้าหมาย:</p>
                <p className="text-2xl font-bold text-gray-800 mb-1">{nutritionGoals?.TargetCalories?.toLocaleString()}</p>
                <p className="text-sm text-gray-500">กิโลแคลอรี่</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-white bg-opacity-50 rounded-2xl border border-white border-opacity-30 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-600 mb-2">โปรตีน:</p>
                <p className="text-2xl font-bold text-gray-800 mb-1">{nutritionGoals?.TargetProtein}</p>
                <p className="text-sm text-gray-500">กรัม ({nutritionGoals?.ProteinPercentage}%)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-white bg-opacity-50 rounded-2xl border border-white border-opacity-30 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <circle cx="12" cy="5" r="2"></circle>
                  <path d="M12 7v4"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-600 mb-2">คาร์บ:</p>
                <p className="text-2xl font-bold text-gray-800 mb-1">{nutritionGoals?.TargetCarbs}</p>
                <p className="text-sm text-gray-500">กรัม ({nutritionGoals?.CarbPercentage}%)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-white bg-opacity-50 rounded-2xl border border-white border-opacity-30 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-600 mb-2">ไขมัน:</p>
                <p className="text-2xl font-bold text-gray-800 mb-1">{nutritionGoals?.TargetFat}</p>
                <p className="text-sm text-gray-500">กรัม ({nutritionGoals?.FatPercentage}%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Goal Information */}
        <div className="bg-white bg-opacity-90 p-8 rounded-3xl mb-8 shadow-2xl backdrop-blur-md border border-white border-opacity-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-400 pb-2 inline-block">รายละเอียดเป้าหมาย</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">ประเภทเป้าหมาย:</span>
                <span className="font-medium text-gray-800">{nutritionGoals?.GoalType}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">น้ำหนักเป้าหมาย:</span>
                <span className="font-medium text-gray-800">{nutritionGoals?.TargetWeight} กิโลกรัม</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">วันที่เริ่มต้น:</span>
                <span className="font-medium text-gray-800">{formatDate(nutritionGoals?.StartDate)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">วันที่สิ้นสุด:</span>
                <span className="font-medium text-gray-800">{formatDate(nutritionGoals?.EndDate)}</span>
              </div>
            </div>
            
            <div className="space-y-4">              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">TDEE ที่คำนวณได้:</span>
                <span className="font-medium text-gray-800">{nutritionGoals?.CalculatedTDEE?.toLocaleString()} กิโลแคลอรี่</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">สัดส่วนโภชนาการ:</span>
                <span className="font-medium text-gray-800">P:{nutritionGoals?.ProteinPercentage}% | C:{nutritionGoals?.CarbPercentage}% | F:{nutritionGoals?.FatPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button 
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-semibold px-8 py-4 rounded-full text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 hover:from-yellow-500 hover:to-yellow-400 shadow-lg"
            onClick={handleEditProfile}
          >
            แก้ไขข้อมูลส่วนตัว
          </button>
        </div>
      </main>
    </div>
  );
};

export default DashboardProfile;