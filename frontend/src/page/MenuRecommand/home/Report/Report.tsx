// import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// import NavBar from '../../../../component/navbar/NavBar';

// interface NutritionData {
//   calories: { current: number; target: number };
//   protein: { current: number; target: number };
//   carbs: { current: number; target: number };
//   fat: { current: number; target: number };
// }

// interface ChartData {
//   date: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
// }

// const NutritionDashboard: React.FC = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState<'Day' | 'Week' | 'Month'>('Week');

//   const nutritionData: NutritionData = {
//     calories: { current: 1450, target: 2000 },
//     protein: { current: 65, target: 75 },
//     carbs: { current: 180, target: 220 },
//     fat: { current: 40, target: 65 }
//   };

//   const chartData: ChartData[] = [
//     { date: '10/5', calories: 1320, protein: 58, carbs: 165, fat: 35 },
//     { date: '11/5', calories: 1380, protein: 62, carbs: 170, fat: 38 },
//     { date: '12/5', calories: 1420, protein: 63, carbs: 175, fat: 39 },
//     { date: '13/5', calories: 1450, protein: 65, carbs: 180, fat: 40 },
//     { date: '14/5', calories: 1480, protein: 67, carbs: 185, fat: 42 },
//     { date: '15/5', calories: 1520, protein: 69, carbs: 190, fat: 44 },
//     { date: '16/5', calories: 1550, protein: 71, carbs: 195, fat: 45 }
//   ];

//   const calculatePercentage = (current: number, target: number): number => {
//     return Math.min((current / target) * 100, 100);
//   };

//   const StatCard: React.FC<{
//     title: string;
//     current: number;
//     target: number;
//     unit: string;
//     color: string;
//   }> = ({ title, current, target, unit, color }) => {
//     const percentage = calculatePercentage(current, target);
    
//     return (
//       <div className="bg-white rounded-lg p-4 shadow-sm">
//         <div className="text-gray-500 text-sm mb-1">{title}</div>
//         <div className="text-xl font-bold text-gray-800 mb-3">
//           {current} / {target} {unit}
//         </div>
//         <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
//           <div 
//             className={`h-2 rounded-full transition-all duration-300 ${color}`}
//             style={{ width: `${percentage}%` }}
//           />
//         </div>
//         <div className="text-xs text-gray-400">
//           {percentage.toFixed(0)}% ของเป้าหมาย
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-green-50">
//       <NavBar />

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-6 py-8">
//         {/* Title */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-gray-800">วิเคราะห์และรายงานผล</h1>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard
//             title="แคลอรี่"
//             current={nutritionData.calories.current}
//             target={nutritionData.calories.target}
//             unit=""
//             color="bg-green-400"
//           />
//           <StatCard
//             title="โปรตีน"
//             current={nutritionData.protein.current}
//             target={nutritionData.protein.target}
//             unit="g"
//             color="bg-green-400"
//           />
//           <StatCard
//             title="คาร์โบไฮเดรต"
//             current={nutritionData.carbs.current}
//             target={nutritionData.carbs.target}
//             unit="g"
//             color="bg-green-400"
//           />
//           <StatCard
//             title="ไขมัน"
//             current={nutritionData.fat.current}
//             target={nutritionData.fat.target}
//             unit="g"
//             color="bg-green-400"
//           />
//         </div>

//         {/* Chart Section */}
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           {/* Period Selector */}
//           <div className="flex justify-center mb-8">
//             <div className="flex bg-gray-50 rounded-lg p-1">
//               {(['Day', 'Week', 'Month'] as const).map((period) => (
//                 <button
//                   key={period}
//                   onClick={() => setSelectedPeriod(period)}
//                   className={`px-8 py-2 rounded-lg text-sm font-medium transition-all ${
//                     selectedPeriod === period
//                       ? 'bg-pink-200 text-pink-800'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {period}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Chart */}
//           <div className="h-64 w-full mb-4">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                 <XAxis 
//                   dataKey="date" 
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 12, fill: '#9ca3af' }}
//                 />
//                 <YAxis hide />
//                 <Line 
//                   type="monotone" 
//                   dataKey="calories" 
//                   stroke="#34d399" 
//                   strokeWidth={2}
//                   dot={false}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="protein" 
//                   stroke="#60a5fa" 
//                   strokeWidth={2}
//                   dot={false}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="carbs" 
//                   stroke="#fbbf24" 
//                   strokeWidth={2}
//                   dot={false}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="fat" 
//                   stroke="#a78bfa" 
//                   strokeWidth={2}
//                   dot={false}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Additional Statistics */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//           {/* Today's Summary */}
//           <div className="bg-white rounded-lg p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">สรุปวันนี้</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">มื้อเช้า</span>
//                 <span className="text-green-600 font-medium">420 kcal</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">มื้อกลางวัน</span>
//                 <span className="text-green-600 font-medium">650 kcal</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">มื้อเย็น</span>
//                 <span className="text-green-600 font-medium">380 kcal</span>
//               </div>
//               <div className="border-t pt-2">
//                 <div className="flex justify-between items-center font-semibold">
//                   <span className="text-gray-800">รวม</span>
//                   <span className="text-green-600">1,450 kcal</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Weekly Progress */}
//           <div className="bg-white rounded-lg p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">ความคืบหน้าสัปดาห์นี้</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">วันที่บรรลุเป้าหมาย</span>
//                 <span className="text-green-600 font-medium">5/7 วัน</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">เฉลี่ยแคลอรี่/วัน</span>
//                 <span className="text-gray-800 font-medium">1,468 kcal</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">เฉลี่ยโปรตีน/วัน</span>
//                 <span className="text-gray-800 font-medium">64.7 g</span>
//               </div>
//               <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
//                 <div className="w-4/5 h-2 bg-green-400 rounded-full"></div>
//               </div>
//               <div className="text-xs text-gray-500 text-center">80% ของเป้าหมายสัปดาห์</div>
//             </div>
//           </div>

//           {/* Recommendations */}
//           <div className="bg-white rounded-lg p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">คำแนะนำ</h3>
//             <div className="space-y-3">
//               <div className="flex items-start space-x-2">
//                 <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
//                 <p className="text-gray-600 text-sm">เพิ่มการบริโภคโปรตีนจากไข่ หรือเนื้อปลา</p>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
//                 <p className="text-gray-600 text-sm">ดื่มน้ำเพิ่มขึ้น 2-3 แก้วต่อวัน</p>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
//                 <p className="text-gray-600 text-sm">ลดการบริโภคขนมหวานในช่วงเย็น</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Food Log Preview */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-lg font-semibold text-gray-800">บันทึกอาหารล่าสุด</h3>
//             <button className="text-green-600 text-sm font-medium hover:text-green-700">
//               ดูทั้งหมด
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                   <span className="text-green-600 text-xs font-medium">เช้า</span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">ข้าวผัดไข่ + กาแฟ</p>
//                   <p className="text-sm text-gray-500">08:30 น.</p>
//                 </div>
//               </div>
//               <span className="text-green-600 font-medium">420 kcal</span>
//             </div>
            
//             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <span className="text-blue-600 text-xs font-medium">กลางวัน</span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">ข้าวกับผัดปลา + ผลไม้</p>
//                   <p className="text-sm text-gray-500">12:15 น.</p>
//                 </div>
//               </div>
//               <span className="text-green-600 font-medium">650 kcal</span>
//             </div>
            
//             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <span className="text-purple-600 text-xs font-medium">เย็น</span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">สลัดไก่ย่าง + น้ำใส</p>
//                   <p className="text-sm text-gray-500">19:00 น.</p>
//                 </div>
//               </div>
//               <span className="text-green-600 font-medium">380 kcal</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NutritionDashboard;










// import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// import NavBar from '../../../../component/navbar/NavBar';

// interface NutritionData {
//   calories: { current: number; target: number };
//   protein: { current: number; target: number };
//   carbs: { current: number; target: number };
//   fat: { current: number; target: number };
// }

// interface ChartData {
//   date: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
// }

// const NutritionDashboard: React.FC = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState<'Day' | 'Week' | 'Month'>('Week');

//   const nutritionData: NutritionData = {
//     calories: { current: 1450, target: 2000 },
//     protein: { current: 65, target: 75 },
//     carbs: { current: 180, target: 220 },
//     fat: { current: 40, target: 65 }
//   };

//   const chartData: ChartData[] = [
//     { date: '10/5', calories: 1320, protein: 58, carbs: 165, fat: 35 },
//     { date: '11/5', calories: 1380, protein: 62, carbs: 170, fat: 38 },
//     { date: '12/5', calories: 1420, protein: 63, carbs: 175, fat: 39 },
//     { date: '13/5', calories: 1450, protein: 65, carbs: 180, fat: 40 },
//     { date: '14/5', calories: 1480, protein: 67, carbs: 185, fat: 42 },
//     { date: '15/5', calories: 1520, protein: 69, carbs: 190, fat: 44 },
//     { date: '16/5', calories: 1550, protein: 71, carbs: 195, fat: 45 }
//   ];

//   const calculatePercentage = (current: number, target: number): number => {
//     return Math.min((current / target) * 100, 100);
//   };

//   const StatCard: React.FC<{
//     title: string;
//     current: number;
//     target: number;
//     unit: string;
//     color: string;
//   }> = ({ title, current, target, unit, color }) => {
//     const percentage = calculatePercentage(current, target);
    
//     return (
//       <div className="bg-white rounded-lg p-4 shadow-lg">
//         <div className="text-gray-500 text-sm mb-1">{title}</div>
//         <div className="text-xl font-bold text-gray-800 mb-3">
//           {current} / {target} {unit}
//         </div>
//         <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
//           <div 
//             className={`h-2 rounded-full transition-all duration-300 ${color}`}
//             style={{ width: `${percentage}%` }}
//           />
//         </div>
//         <div className="text-xs text-gray-400">
//           {percentage.toFixed(0)}% ของเป้าหมาย
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-yellow-50">
//       <NavBar />

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-6 py-8">
//         {/* Title */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-gray-800">วิเคราะห์และรายงานผล</h1>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard
//             title="แคลอรี่"
//             current={nutritionData.calories.current}
//             target={nutritionData.calories.target}
//             unit="kcal"
//             color="bg-green-400"
//           />
//           <StatCard
//             title="โปรตีน"
//             current={nutritionData.protein.current}
//             target={nutritionData.protein.target}
//             unit="g"
//             color="bg-green-400"
//           />
//           <StatCard
//             title="คาร์โบไฮเดรต"
//             current={nutritionData.carbs.current}
//             target={nutritionData.carbs.target}
//             unit="g"
//             color="bg-green-400"
//           />
//           <StatCard
//             title="ไขมัน"
//             current={nutritionData.fat.current}
//             target={nutritionData.fat.target}
//             unit="g"
//             color="bg-green-400"
//           />
//         </div>

//         {/* Chart Section */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           {/* Period Selector */}
//           <div className="flex justify-center mb-8">
//             <div className="flex bg-gray-50 rounded-lg p-1">
//               {(['Day', 'Week', 'Month'] as const).map((period) => (
//                 <button
//                   key={period}
//                   onClick={() => setSelectedPeriod(period)}
//                   className={`px-8 py-2 rounded-lg text-sm font-medium transition-all ${
//                     selectedPeriod === period
//                       ? 'bg-pink-200 text-pink-800'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {period}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Chart */}
//           <div className="h-64 w-full mb-4">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData} margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
//                 <XAxis 
//                   dataKey="date" 
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 12, fill: '#9ca3af' }}
//                 />
//                 <YAxis 
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 12, fill: '#9ca3af' }}
//                   domain={[1200, 1600]}
//                   tickCount={6}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="calories" 
//                   stroke="#34d399" 
//                   strokeWidth={2}
//                   dot={{ fill: '#34d399', strokeWidth: 2, r: 4 }}
//                   activeDot={{ r: 6, fill: '#34d399' }}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="protein" 
//                   stroke="#60a5fa" 
//                   strokeWidth={2}
//                   dot={{ fill: '#60a5fa', strokeWidth: 2, r: 3 }}
//                   activeDot={{ r: 5, fill: '#60a5fa' }}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="carbs" 
//                   stroke="#fbbf24" 
//                   strokeWidth={2}
//                   dot={{ fill: '#fbbf24', strokeWidth: 2, r: 3 }}
//                   activeDot={{ r: 5, fill: '#fbbf24' }}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="fat" 
//                   stroke="#a78bfa" 
//                   strokeWidth={2}
//                   dot={{ fill: '#a78bfa', strokeWidth: 2, r: 3 }}
//                   activeDot={{ r: 5, fill: '#a78bfa' }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Chart Legend */}
//           <div className="flex justify-center space-x-6 mt-4">
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
//               <span className="text-sm text-gray-600">แคลอรี่</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
//               <span className="text-sm text-gray-600">โปรตีน (g)</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
//               <span className="text-sm text-gray-600">คาร์โบไฮเดรต (g)</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
//               <span className="text-sm text-gray-600">ไขมัน (g)</span>
//             </div>
//           </div>
//         </div>

//         {/* Additional Statistics */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"> */}
//           {/* Today's Summary */}
//           {/* <div className="bg-white rounded-lg p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">สรุปวันนี้</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">มื้อเช้า</span>
//                 <span className="text-green-600 font-medium">420 kcal</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">มื้อกลางวัน</span>
//                 <span className="text-green-600 font-medium">650 kcal</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">มื้อเย็น</span>
//                 <span className="text-green-600 font-medium">380 kcal</span>
//               </div>
//               <div className="border-t pt-2">
//                 <div className="flex justify-between items-center font-semibold">
//                   <span className="text-gray-800">รวม</span>
//                   <span className="text-green-600">1,450 kcal</span>
//                 </div>
//               </div>
//             </div>
//           </div> */}

//           {/* Weekly Progress */}
//           {/* <div className="bg-white rounded-lg p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">ความคืบหน้าสัปดาห์นี้</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">วันที่บรรลุเป้าหมาย</span>
//                 <span className="text-green-600 font-medium">5/7 วัน</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">เฉลี่ยแคลอรี่/วัน</span>
//                 <span className="text-gray-800 font-medium">1,468 kcal</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">เฉลี่ยโปรตีน/วัน</span>
//                 <span className="text-gray-800 font-medium">64.7 g</span>
//               </div>
//               <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
//                 <div className="w-4/5 h-2 bg-green-400 rounded-full"></div>
//               </div>
//               <div className="text-xs text-gray-500 text-center">80% ของเป้าหมายสัปดาห์</div>
//             </div>
//           </div> */}

//           {/* Recommendations */}
//           {/* <div className="bg-white rounded-lg p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">คำแนะนำ</h3>
//             <div className="space-y-3">
//               <div className="flex items-start space-x-2">
//                 <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
//                 <p className="text-gray-600 text-sm">เพิ่มการบริโภคโปรตีนจากไข่ หรือเนื้อปลา</p>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
//                 <p className="text-gray-600 text-sm">ดื่มน้ำเพิ่มขึ้น 2-3 แก้วต่อวัน</p>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
//                 <p className="text-gray-600 text-sm">ลดการบริโภคขนมหวานในช่วงเย็น</p>
//               </div>
//             </div>
//           </div>
//         </div> */}

//         {/* Food Log Preview */}
//         {/* <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-lg font-semibold text-gray-800">บันทึกอาหารล่าสุด</h3>
//             <button className="text-green-600 text-sm font-medium hover:text-green-700">
//               ดูทั้งหมด
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                   <span className="text-green-600 text-xs font-medium">เช้า</span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">ข้าวผัดไข่ + กาแฟ</p>
//                   <p className="text-sm text-gray-500">08:30 น.</p>
//                 </div>
//               </div>
//               <span className="text-green-600 font-medium">420 kcal</span>
//             </div>
            
//             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <span className="text-blue-600 text-xs font-medium">กลางวัน</span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">ข้าวกับผัดปลา + ผลไม้</p>
//                   <p className="text-sm text-gray-500">12:15 น.</p>
//                 </div>
//               </div>
//               <span className="text-green-600 font-medium">650 kcal</span>
//             </div>
            
//             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <span className="text-purple-600 text-xs font-medium">เย็น</span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">สลัดไก่ย่าง + น้ำใส</p>
//                   <p className="text-sm text-gray-500">19:00 น.</p>
//                 </div>
//               </div>
//               <span className="text-green-600 font-medium">380 kcal</span>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default NutritionDashboard;











import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import NavBar from '../../../../component/navbar/NavBar';
import type { NutritionGoalInterface } from '../../../../interfaces/INutritionGoal';
import type { DailyNutrientSumInterface } from '../../../../interfaces/IDailyNutrientSum';
// import type { UserInterface } from '../../../../interfaces/IUser';
import { GetDailyNutrientSumByUserID, GetNutritionGoalByUserID, /*GetUserByID*/ } from '../../../../service/https';

const NutritionDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoalInterface | null>(null);
  const [dailyNutrientSum, setDailyNutrientSum] = useState<DailyNutrientSumInterface[]>([])
  // const [user, setUser] = useState<UserInterface | null>(null)

  
  // const getUserByID = async (id: string) => {
  //   const res = await GetUserByID(id)
  //   if(res.status){
  //     setUser(res.data)
  //   }
  // }

  const getNutritionGoalByUserID = async(id: string) => {
    try{
      const res = await GetNutritionGoalByUserID(id)
      if(res.status){
        setNutritionGoals(res.data)
      }else{
        console.error("Invalid response for nutrition goal", res)
      }
    } catch(error){
      console.error("Fetch error (nutrition goal):", error)
    }
  }

  const getDailyNutrientSumByUserID = async(id: string) => {
    const res = await GetDailyNutrientSumByUserID(id)
    if(res.status && Array.isArray(res.data)){
      console.log(res)
      const transformed = res.data.map((item: DailyNutrientSumInterface) => ({
        date: new Date(item.RecordDate!).toLocaleDateString("th-TH", {day: "2-digit", month: "2-digit"}),
        calories: item.Calories || 0,
        protein: item.Protein || 0,
        carbs: item.Carbs || 0,
        fat: item.Fat || 0
      }))
      setDailyNutrientSum(transformed)
      console.log("daily sum raw: ", res.data)
      console.log("transformed: ", transformed)
    }
  }

  useEffect(() => {
    localStorage.setItem("userID", "1")
    const UserID = localStorage.getItem("userID")

    if(UserID){
      // getUserByID(UserID)
      getNutritionGoalByUserID(UserID)
      getDailyNutrientSumByUserID(UserID)
    }
  }, [])

  // const nutritionData: NutritionGoalInterface = {
  //   TargetCalories: nutritionGoals?.TargetCalories,
  //   TargetCarbs: nutritionGoals?.TargetCarbs,
  //   TargetProtein: nutritionGoals?.TargetProtein,
  //   TargetFat: nutritionGoals?.TargetFat,
  // };

  // const nutritionData: NutritionData = {
  //   calories: { current: 1450, target: 2000 },
  //   protein: { current: 65, target: 75 },
  //   carbs: { current: 180, target: 220 },
  //   fat: { current: 40, target: 65 }
  // };

  // const chartData: DailyNutrientSumInterface = {
  //   RecordDate: dailyNutrientSum?.RecordDate,
  //   Calories: dailyNutrientSum?.Calories,
  //   Carbs: dailyNutrientSum?.Carbs,
  //   Protein: dailyNutrientSum?.Protein,
  //   Fat: dailyNutrientSum?.Fat
  // }

  // const chartData: ChartData[] = [
  //   { date: '10/5', calories: 1320, protein: 58, carbs: 165, fat: 35 },
  //   { date: '11/5', calories: 1380, protein: 62, carbs: 170, fat: 38 },
  //   { date: '12/5', calories: 1420, protein: 63, carbs: 175, fat: 39 },
  //   { date: '13/5', calories: 1450, protein: 65, carbs: 180, fat: 40 },
  //   { date: '14/5', calories: 1480, protein: 67, carbs: 185, fat: 42 },
  //   { date: '15/5', calories: 1520, protein: 69, carbs: 190, fat: 44 },
  //   { date: '16/5', calories: 1550, protein: 71, carbs: 195, fat: 45 }
  // ];

  const calculatePercentage = (current: number, target: number): number => {
    if(target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const latestSummaty = dailyNutrientSum.length > 0
  ? dailyNutrientSum[dailyNutrientSum.length - 1]
  : null

  const StatCard: React.FC<{
    title: string;
    current: number;
    target: number;
    unit: string;
    color: string;
  }> = ({ title, current, target, unit, color }) => {
    const percentage = calculatePercentage(current, target);
    
    return (
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <div className="text-gray-500 text-sm mb-1">{title}</div>
        <div className="text-xl font-bold text-gray-800 mb-3">
          {current} / {target} {unit}
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-400">
          {percentage.toFixed(0)}% ของเป้าหมาย
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <NavBar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">วิเคราะห์และรายงานผล</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="แคลอรี่"
            current={latestSummaty?.Calories || 0}
            target={nutritionGoals?.TargetCalories || 0}
            unit="kcal"
            color="bg-green-400"
          />
          <StatCard
            title="โปรตีน"
            current={latestSummaty?.Protein || 0}
            target={nutritionGoals?.TargetProtein || 0}
            unit="g"
            color="bg-green-400"
          />
          <StatCard
            title="คาร์โบไฮเดรต"
            current={latestSummaty?.Carbs || 0}
            target={nutritionGoals?.TargetCarbs || 0}
            unit="g"
            color="bg-green-400"
          />
          <StatCard
            title="ไขมัน"
            current={latestSummaty?.Fat || 0}
            target={nutritionGoals?.TargetFat || 0}
            unit="g"
            color="bg-green-400"
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Period Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-50 rounded-lg p-1">
              {(['Day', 'Week', 'Month'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-8 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-pink-200 text-pink-800'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-64 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyNutrientSum} margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  domain={['auto', 'auto']}
                  tickCount={6}
                />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#34d399" 
                  strokeWidth={2}
                  dot={{ fill: '#34d399', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#34d399' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="protein" 
                  stroke="#60a5fa" 
                  strokeWidth={2}
                  dot={{ fill: '#60a5fa', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: '#60a5fa' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="carbs" 
                  stroke="#fbbf24" 
                  strokeWidth={2}
                  dot={{ fill: '#fbbf24', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: '#fbbf24' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="fat" 
                  stroke="#a78bfa" 
                  strokeWidth={2}
                  dot={{ fill: '#a78bfa', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: '#a78bfa' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">แคลอรี่</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">โปรตีน (g)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">คาร์โบไฮเดรต (g)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">ไขมัน (g)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionDashboard;