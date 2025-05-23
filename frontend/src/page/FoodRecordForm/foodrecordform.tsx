// import { useState, useEffect } from 'react';
// import { Calendar, Upload, ArrowLeft } from 'lucide-react';
// import NavBar from '../../component/navbar/NavBar';

// import img1 from '../../assets/food/อาหารไทย 1.jpg'
// import img2 from '../../assets/food/อาหารไทย 2.jpg'
// import img3 from '../../assets/food/อาหารไทย 3.jpg'

// export default function FoodDiaryPage() {
//   const [selectedDate, setSelectedDate] = useState('2025-03-02');
//   const [selectedTime, setSelectedTime] = useState('ยังไม่');
//   const [foodName, setFoodName] = useState('');
//   const [imageUploaded, setImageUploaded] = useState(false);
//   const [nutritionValues, setNutritionValues] = useState({
//     calories: '',
//     protein: '',
//     carbs: '',
//     fat: ''
//   });
//   const [additionalNotes, setAdditionalNotes] = useState('');
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [autoPlay, setAutoPlay] = useState(true);
//   const [autoPlayInterval, setAutoPlayInterval] = useState(3000); // 3 seconds interval
//   const [isHover, setIsHover] = useState(false);
  
//   // Sample food images for carousel
//   const foodImages = [
//     { id: 1, img: img1, alt: 'อาหารไทย 1' },
//     { id: 2, img: img2, alt: 'อาหารไทย 2' },
//     { id: 3, img: img3, alt: 'อาหารไทย 3' },
//   ];

//   // Auto play functionality
//   useEffect(() => {
//     let interval;
    
//     if (autoPlay) {
//       interval = setInterval(() => {
//         setCurrentSlide((prev) => (prev === foodImages.length - 1 ? 0 : prev + 1));
//       }, autoPlayInterval);
//     }
    
//     // Clean up interval on component unmount or when autoPlay is turned off
//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [autoPlay, autoPlayInterval, foodImages.length]);

//   // Pause autoplay when user interacts with carousel
//   const handleManualSlideChange = (index) => {
//     setCurrentSlide(index);
//     // Optional: pause autoplay temporarily when user interacts
//     setAutoPlay(false);
//     setTimeout(() => setAutoPlay(true), 5000); // Resume after 5 seconds
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-lime-100">
//       {/* Header */}
//       <NavBar/>
//       {/* Main Content */}
//       <main className="flex-grow p-4">
//         <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Left Column - Image Upload */}
//             <div className="flex flex-col">
//               <div className="border-2 border-blue-500 rounded p-4 mb-4">
//                 <p className="text-center font-medium text-blue-600 border-b border-dotted border-blue-300 pb-2 mb-4">อัปโหลดรูปภาพ</p>
                
//                 {!imageUploaded ? (
//                   <div className="border-2 border-dashed border-blue-300 rounded-md p-8 flex flex-col items-center justify-center text-gray-400">
//                     <Upload size={28} />
//                     <p className="text-sm mt-4 text-center">คลิกหรือลากภาพไฟล์มาที่นี่เพื่ออัพโหลด</p>
//                     <p className="text-xs mt-6 text-center">รูปแบบที่รองรับคือ JPG และ PNG</p>
//                     <button 
//                       className="mt-4 flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded border"
//                       onClick={() => setImageUploaded(true)}
//                     >
//                       <Calendar size={16} />
//                       <span className="text-sm">Download Sample Template</span>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="border-2 border-dashed border-blue-300 rounded-md p-8 flex items-center justify-center">
//                     <img src="/api/placeholder/300/200" alt="Food" className="max-w-full h-auto" />
//                   </div>
//                 )}
//               </div>

//               <div className="text-center my-4">หรือ</div>

//               <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
//                 <div className="relative">
//                   {/* Carousel Container */}
//                   <div className="overflow-hidden relative rounded-lg">
//                     <div className="flex transition-transform duration-300 ease-in-out" 
//                          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//                       {/* Carousel Items */}
//                       {foodImages.map((image) => (
//                         <div key={image.id} className="min-w-full flex-shrink-0">
//                           <div className="flex justify-center">
//                             <img 
//                               src={image.img} 
//                               alt={image.alt} 
//                               className="rounded-lg" 
//                               style={{ width: '300px', height: '210px', objectFit: 'cover' }}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
                    
//                     {/* Carousel Navigation */}
//                     <button 
//                       className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 ml-1 text-gray-700"
//                       onClick={() => handleManualSlideChange(currentSlide === 0 ? foodImages.length - 1 : currentSlide - 1)}
//                     >
//                       <ArrowLeft size={16} />
//                     </button>
//                     <button 
//                       className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 mr-1 text-gray-700"
//                       onClick={() => handleManualSlideChange(currentSlide === foodImages.length - 1 ? 0 : currentSlide + 1)}
//                     >
//                       <ArrowLeft size={16} className="rotate-180" />
//                     </button>
                    
//                     {/* Dots Indicator */}
//                     <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-2">
//                       {foodImages.map((_, index) => (
//                         <button 
//                           key={index}
//                           className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
//                           onClick={() => handleManualSlideChange(index)}
//                         />
//                       ))}
//                     </div>
                    
//                     {/* Autoplay controls */}
//                     {/* <div className="absolute top-1 right-1">
//                       <button 
//                         className={`p-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 text-xs ${autoPlay ? 'text-red-500' : 'text-green-500'}`}
//                         onClick={() => setAutoPlay(!autoPlay)}
//                         title={autoPlay ? 'หยุดการเล่นอัตโนมัติ' : 'เล่นอัตโนมัติ'}
//                       >
//                         {autoPlay ? '❚❚' : '▶'}
//                       </button>
//                     </div> */}
//                   </div>
//                 </div>
//                 <button 
//                     onMouseEnter={() => setIsHover(true)}
//                     onMouseLeave={() => setIsHover(false)}
//                     className="w-full mt-4 py-3 text-center text-gray-600 rounded-md"
//                     style={{ 
//                         backgroundColor: isHover ? '#C7E77F' : '#FFFFFF', 
//                         border: '1px solid #E0E0E0',
//                         borderRadius: '50px',
//                         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                         color: isHover ? '#FFFFFF' : '#00000080',
//                         fontSize: '20px',}}>
//                   คลิกเพื่อตรวจสอบค่าโภชนาการอาหาร
//                 </button>
//               </div>
//             </div>

//             {/* Right Column - Food Info Form */}
//             <div>
//               <div className="grid grid-cols-2 gap-x-4 gap-y-6">
//                 {/* Date */}
//                 <div>
//                   <label className="block text-gray-700 mb-2">วันที่</label>
//                   <div className="relative">
//                     <select 
//                       className="block w-full border border-gray-300 rounded py-2 px-3 appearance-none"
//                       value={selectedDate}
//                       onChange={(e) => setSelectedDate(e.target.value)}
//                     >
//                       <option value="2025-03-02">2025-03-02</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                       <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
//                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Time */}
//                 <div>
//                   <label className="block text-gray-700 mb-2">เวลา</label>
//                   <div className="relative">
//                     <select 
//                       className="block w-full border border-gray-300 rounded py-2 px-3 appearance-none"
//                       value={selectedTime}
//                       onChange={(e) => setSelectedTime(e.target.value)}
//                     >
//                       <option value="ยังไม่">ยังไม่</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                       <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
//                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Food Name */}
//                 <div className="col-span-2">
//                   <label className="block text-gray-700 mb-2">ชื่ออาหาร</label>
//                   <input
//                     type="text"
//                     className="block w-full border border-gray-300 rounded py-2 px-3"
//                     value={foodName}
//                     onChange={(e) => setFoodName(e.target.value)}
//                   />
//                 </div>

//                 {/* Amount */}
//                 <div className="col-span-2">
//                   <label className="block text-gray-700 mb-2">ปริมาณที่รับประทาน</label>
//                   <div className="bg-gray-100 rounded-lg p-2 text-sm text-gray-600">
//                     จาน 1 จาน, 100 กรัม, 1 ชิ้น, 1 แก้ว
//                   </div>
//                 </div>

//                 {/* Nutrition Info */}
//                 <div className="col-span-2">
//                   <div className="mb-2 text-gray-700">**ข้อมูลโภชนาการ (ในกรณีที่เมนูอาหารเองและต้องการกรอกข้อมูลด้วยตนเอง)</div>
                  
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-gray-700 mb-2">แคลอรี่</label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           className="block w-full border border-gray-300 rounded py-2 px-3"
//                           placeholder="กิโลแคลอรี่"
//                           value={nutritionValues.calories}
//                           onChange={(e) => setNutritionValues({...nutritionValues, calories: e.target.value})}
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 mb-2">โปรตีน</label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           className="block w-full border border-gray-300 rounded py-2 px-3"
//                           placeholder="กรัม"
//                           value={nutritionValues.protein}
//                           onChange={(e) => setNutritionValues({...nutritionValues, protein: e.target.value})}
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 mb-2">คาร์โบไฮเดรต</label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           className="block w-full border border-gray-300 rounded py-2 px-3"
//                           placeholder="กรัม"
//                           value={nutritionValues.carbs}
//                           onChange={(e) => setNutritionValues({...nutritionValues, carbs: e.target.value})}
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 mb-2">ไขมัน</label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           className="block w-full border border-gray-300 rounded py-2 px-3"
//                           placeholder="กรัม"
//                           value={nutritionValues.fat}
//                           onChange={(e) => setNutritionValues({...nutritionValues, fat: e.target.value})}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Additional Notes */}
//                   <div className="mb-6">
//                     <label className="block text-gray-700 mb-2">ความคิดเห็นหรือบันทึกเพิ่มเติม</label>
//                     <textarea
//                       className="block w-full border border-gray-300 rounded py-2 px-3"
//                       rows={2}
//                       placeholder='เช่น "รสแซบอยู่มากๆ", "อาหารจานนี้อร่อย", "สูตรโฮมเมด"'
//                       value={additionalNotes}
//                       onChange={(e) => setAdditionalNotes(e.target.value)}
//                     />
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex justify-end space-x-4 mt-6">
//                     <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md">ยกเลิก</button>
//                     <button className="px-6 py-2 bg-lime-500 text-white rounded-md">บันทึก</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }




import { useState, useEffect, useRef } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';
import NavBar from '../../component/navbar/NavBar';
import { DatePicker, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

import img1 from '../../assets/food/food1.jpg'
import img2 from '../../assets/food/food2.jpg'
import img3 from '../../assets/food/food3.jpg'
import { useNavigate } from 'react-router-dom';

export default function FoodDiaryPage() {
  const navigate = useNavigate();
  const [foodName, setFoodName] = useState('');
  const [foodNetvolume, setFoodNetvolume] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [nutritionValues, setNutritionValues] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [autoPlayInterval] = useState(3000); // 3 seconds interval
  const [isHover, setIsHover] = useState(false);
  const fileInputRef = useRef(null);


  const dateFormat = 'YYYY/MM/DD';



  
  const foodImages = [
    { id: 1, img: img1, alt: 'อาหารไทย 1' },
    { id: 2, img: img2, alt: 'อาหารไทย 2' },
    { id: 3, img: img3, alt: 'อาหารไทย 3' },
  ];

  // Auto play functionality
  useEffect(() => {
    let interval;
    
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === foodImages.length - 1 ? 0 : prev + 1));
      }, autoPlayInterval);
    }
    
   
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlay, autoPlayInterval, foodImages.length]);

  // Pause autoplay when user interacts with carousel
  const handleManualSlideChange = (index) => {
    setCurrentSlide(index);
    // Optional: pause autoplay temporarily when user interacts
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000); // Resume after 5 seconds
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setImageUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setImageUploaded(true);
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Handle click on upload area
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };


  const handleBackhome = () => {
    navigate('/foodhistory');
  };


  return (
    <div className="flex flex-col min-h-screen bg-lime-100">
        <NavBar/>
      
      {/* Main Content */}
      <main className="flex-grow p-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Column - Image Upload */}
            <div className="flex flex-col">
              <div className="border-2 border-gray-200 rounded p-4 mb-4">
                <p className="text-center font-bold text-black-600 border-b border-dotted border-gray-300 pb-2 mb-4">อัปโหลดรูปภาพ</p>
                
                {!imageUploaded ? (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center text-gray-400 cursor-pointer"
                    onClick={handleUploadClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Upload size={28} />
                    <p className="text-sm mt-4 text-center">คลิกหรือลากภาพไฟล์มาที่นี่เพื่ออัพโหลด</p>
                    <p className="text-xs mt-6 text-center">รูปแบบที่รองรับคือ JPG และ PNG</p>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="border-2 border-dashed border-blue-300 rounded-md p-4 flex items-center justify-center">
                      <img 
                        src={uploadedImage || "/api/placeholder/300/200"} 
                        alt="Uploaded food" 
                        className="max-w-full h-auto max-h-64" 
                      />
                    </div>
                    <button 
                      onClick={() => {
                        setImageUploaded(false);
                        setUploadedImage(null);
                      }}
                      className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 text-gray-700 hover:bg-opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="text-center my-4">หรือ</div>

              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                <div className="relative">
                  {/* Carousel Container */}
                  <div className="overflow-hidden relative rounded-lg">
                    <div className="flex transition-transform duration-300 ease-in-out" 
                         style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                      {/* Carousel Items */}
                      {foodImages.map((image) => (
                        <div key={image.id} className="min-w-full flex-shrink-0">
                          <div className="flex justify-center">
                            <img 
                              src={image.img} 
                              alt={image.alt} 
                              className="rounded-lg" 
                              style={{ width: '300px', height: '210px', objectFit: 'cover' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Carousel Navigation */}
                    <button 
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 ml-1 text-gray-700"
                      onClick={() => handleManualSlideChange(currentSlide === 0 ? foodImages.length - 1 : currentSlide - 1)}
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button 
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 mr-1 text-gray-700"
                      onClick={() => handleManualSlideChange(currentSlide === foodImages.length - 1 ? 0 : currentSlide + 1)}
                    >
                      <ArrowLeft size={16} className="rotate-180" />
                    </button>
                    
                    {/* Dots Indicator */}
                    <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-2">
                      {foodImages.map((_, index) => (
                        <button 
                          key={index}
                          className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                          onClick={() => handleManualSlideChange(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="w-full mt-4 py-3 text-center text-gray-600 rounded-md"
                    style={{ 
                        backgroundColor: isHover ? '#ff8a71' : '#FFFFFF', 
                        border: '1px solid #E0E0E0',
                        borderRadius: '50px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        color: isHover ? '#FFFFFF' : '#00000080',
                        fontSize: '20px',}}>
                  คลิกเพื่อตรวจสอบค่าโภชนาการอาหาร
                </button>
              </div>
            </div>

            {/* Right Column - Food Info Form */}
            <div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {/* Date */}
                <div>
                  <label className="block text-gray-700 mb-2">วันที่</label>
                  <div className="relative">
                    <Space direction="vertical" size={12}>
                      <DatePicker 
                      defaultValue={dayjs('2015/01/01', dateFormat)} 
                      format={dateFormat} 
                      style={{ width: '250px', height: '42px' }}
                    />

                    </Space>
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-gray-700 mb-2">เวลา</label>
                  <div className="relative">
                    <TimePicker format="HH:mm" 
                      style={{ width: '250px', height: '42px' }}/>

                  </div>
                </div>

                {/* Food Name */}
                <div className="col-span-2">
                  <label className="block text-gray-700 mb-2">ชื่ออาหาร</label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded py-2 px-3"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                  />
                </div>

                {/* Amount */}
                <div className="col-span-2">
                  <label className="block text-gray-700 mb-2">ปริมาณที่รับประทาน</label>
                    <input
                        type="text"
                        className="block w-full border border-gray-300 rounded py-2 px-3 placeholder:text-sm placeholder:text-gray-300 placeholder:italic"
                        value={foodNetvolume}
                        onChange={(e) => setFoodNetvolume(e.target.value)}
                        placeholder='เช่น "จาน 1 จาน", "100 กรัม", "1 ชิ้น", "1 แก้ว"'
                        
             
                    />
                  {/* <div className="bg-gray-100 rounded-lg p-2 text-sm text-gray-600">
                    จาน 1 จาน, 100 กรัม, 1 ชิ้น, 1 แก้ว
                  </div> */}
                </div>

                {/* Nutrition Info */}
                <div className="col-span-2">
                  <div className="mb-2 text-gray-700">**ข้อมูลโภชนาการ (ในกรณีที่เมนูอาหารเองและต้องการกรอกข้อมูลด้วยตนเอง)</div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">แคลอรี่</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="block w-full border border-gray-300 rounded py-2 px-3"
                          placeholder="กิโลแคลอรี่"
                          value={nutritionValues.calories}
                          onChange={(e) => setNutritionValues({...nutritionValues, calories: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">โปรตีน</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="block w-full border border-gray-300 rounded py-2 px-3"
                          placeholder="กรัม"
                          value={nutritionValues.protein}
                          onChange={(e) => setNutritionValues({...nutritionValues, protein: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">คาร์โบไฮเดรต</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="block w-full border border-gray-300 rounded py-2 px-3"
                          placeholder="กรัม"
                          value={nutritionValues.carbs}
                          onChange={(e) => setNutritionValues({...nutritionValues, carbs: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">ไขมัน</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="block w-full border border-gray-300 rounded py-2 px-3"
                          placeholder="กรัม"
                          value={nutritionValues.fat}
                          onChange={(e) => setNutritionValues({...nutritionValues, fat: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">ความคิดเห็นหรือบันทึกเพิ่มเติม</label>
                    <textarea
                      className="block w-full border border-gray-300 rounded py-2 px-3 placeholder:text-sm placeholder:text-gray-300 placeholder:italic"
                      rows={2}
                      placeholder='เช่น "รสแซบอยู่มากๆ", "อาหารจานนี้อร่อย", "สูตรโฮมเมด"'
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button 
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 hover:text-gray-900 transition"
                      onClick={handleBackhome}>
                      ยกเลิก
                    </button>

                    <button className="px-6 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition"
                    onClick={handleBackhome}>
                      บันทึก
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}