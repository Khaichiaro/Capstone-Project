
import { useState, useEffect, useRef, type SetStateAction } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';
import NavBar from '../../component/navbar/NavBar';
import { DatePicker, message, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ImageUploadPopup from '../../component/AI/ImageUpload';

dayjs.extend(customParseFormat);

import img1 from '../../assets/food/food1.jpg'
import img2 from '../../assets/food/food2.jpg'
import img3 from '../../assets/food/food3.jpg'
import { useNavigate } from 'react-router-dom';
import type { IUser } from '../../interfaces/IUser';
import { GetUserByID } from '../../services/https';
import type { IMeals } from '../../interfaces/IMeals';
import "./eatingrecordform.css"


export default function FoodDiaryPage() {
  const navigate = useNavigate();
  const [, setUser] = useState<IUser | null>(null);
  const [uid, setUid] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [, setPreview] = useState<string | null>(null);
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [sodium, setSodium] = useState('');
  const [fat, setFat] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [autoPlayInterval] = useState(3000);
  const [isHover, setIsHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dateFormat = 'YYYY/MM/DD';
  const [messageApi] = message.useMessage();
  const [ispopupOpen, setIsPopupOpen] = useState(false);
  const [, setUploadFile] = useState<File | null>(null);

  const [details, setDetails] = useState('');

  const fetchUserByID = async () => {
    try {
      const res = await GetUserByID(1);
      if (res.status === 200) {
        setUser(res.data);
      } else {
        messageApi.open({
          type: 'error',
          content: res.data.error,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Error occurred while fetching user data',
      });
    }
  };

  useEffect(() => {
    const storedId = 1 // localStorage.getItem('id'); // Assuming you store user ID in localStorage
    if (storedId) {
      const userId = Number(storedId);
      setUid(userId);
    }
  }, []);

  useEffect(() => {
    if (uid !== null) {
      fetchUserByID();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const handleFileUpload = (image: File) => {
    if (image) {
      setImage(image);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target) return;
        const result = e.target.result;
        setPreview(typeof result === "string" ? result : null);
        setUploadedImage(typeof result === "string" ? result : null);
        setImageUploaded(true);
      };
      reader.readAsDataURL(image);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };





  const foodImages = [
    { id: 1, img: img1, alt: 'อาหารไทย 1' },
    { id: 2, img: img2, alt: 'อาหารไทย 2' },
    { id: 3, img: img3, alt: 'อาหารไทย 3' },
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

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

  const handleManualSlideChange = (index: SetStateAction<number>) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const handleDragOver = (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleBackhome = () => {
    navigate('/foodhistory');
  };

  // ฟังก์ชันสำหรับบันทึกข้อมูลลงฐานข้อมูล
  const handleSaveMeal = async (data: IMeals) => {
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!foodName.trim()) {
      messageApi.open({
        type: 'warning',
        content: 'กรุณากรอกชื่ออาหาร',
      });
      return;
    }

    if (!quantity.trim()) {
      messageApi.open({
        type: 'warning',
        content: 'กรุณากรอกปริมาณที่รับประทาน',
      });
      return;
    }

    const formattedDetails =
      details === "radio1" ? "1" :
        details === "radio2" ? "2" :
          details === "radio3" ? "3" :
            details === "radio4" ? "4" :
              details;

    if (!formattedDetails) {
      message.error("กรุณาเลือกประเภทมื้ออาหาร เช่น มื้อเช้า, มื้อกลางวัน, มื้อเย็น หรือมื้อว่าง");
      return;
    }

    setIsLoading(true);

    try {
      // สร้าง FormData สำหรับส่งข้อมูล
      const formData = new FormData();

      // เพิ่มข้อมูลพื้นฐาน
      formData.append('UserID', String(uid));
      formData.append('food_name', foodName);
      formData.append('quantity', quantity);
      formData.append('notes', notes);

      const localDate = dayjs(data.meals_date).format('YYYY-MM-DD');
      formData.append('meals_date', localDate);

      formData.append(
        'meals_time',
        dayjs(data.meals_time, "HH:mm:ss").format("HH:mm:ss")
      );

      // เพิ่มข้อมูลโภชนาการ (ถ้ามี)
      if (calories) formData.append('calories', calories);
      if (protein) formData.append('protein', protein);
      if (carbs) formData.append('carbs', carbs);
      if (fat) formData.append('fat', fat);
      if (sodium) formData.append('sodium', sodium);

      // เพิ่มรูปภาพ (ถ้ามี)
      if (image) {
        formData.append('food_picture', image);
      }
      // เพิ่มประเภทมื้ออาหาร
      formData.append('MealTypeID', String(formattedDetails));



      // ส่งข้อมูลไปยัง API
      console.log('Sending meal data:', formData);


      const response = await fetch('http://localhost:8000/meals', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        messageApi.open({
          type: 'success',
          content: 'บันทึกข้อมูลสำเร็จ!',
        });

        // รีเซ็ตฟอร์ม
        resetForm();

        // กลับไปหน้า food history หลังจากบันทึกสำเร็จ
        setTimeout(() => {
          navigate('/foodhistory');
        }, 1500);
      } else {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    } catch (error) {
      console.error('Error saving meal:', error);
      messageApi.open({
        type: 'error',
        content: (error instanceof Error && error.message) ? error.message : 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชันรีเซ็ตฟอร์ม
  const resetForm = () => {
    setFoodName('');
    setQuantity('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setSodium('');
    setFat('');
    setNotes('');
    setImage(null);
    setPreview(null);
    setImageUploaded(false);
    setUploadedImage(null);
    setSelectedDate(dayjs());
    setSelectedTime(dayjs());
    setDetails('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-lime-100 bg-white">
      <NavBar />
      <div style={{ marginTop: "40px", justifyContent: "center", display: "flex", gap: "180px" }}>

      </div>

      {/* Main Content */}
      <main className="flex-grow p-4 bg-white">
        <div className="max-w-6xl mx-auto bg-gray-90 rounded-lg shadow-sm p-0 ">
          <div className="flex flex-row flex-wrap justify-center  gap-40 mb-5 border-b border-gray-300 pb-4"></div>
          <div className="flex flex-row flex-wrap justify-center mt-2 gap-40 mb-10 border-b border-gray-300 pb-4">
            
            {/* Checkbox 1 มื้อเช้า */}
            <div className="radio-input">
              <div className="radio-b">
                <input
                  value="radio1"
                  onChange={(e) => 
                      setDetails(e.target.value)
                    }
                  required
                  type="radio"
                  className="radio-b__input"
                  id="radio1"
                  name="radio-group"
                />
                <label className="radio-b__label" htmlFor="radio1">
                  <div className="radio-b__custom">
                    <span className="radio-b__custom-fill"></span>
                  </div>
                  <span className="radio-b__text">มื้อเช้า</span>
                </label>
              </div>
            </div>

            {/* Checkbox 2 มื้อกลางวัน */}
            <div className="radio-input">
              <div className="radio-b">
                <input
                  value="radio2"
                  onChange={(e) => 
                      setDetails(e.target.value)
                    }
                  required
                  type="radio"
                  className="radio-b__input"
                  id="radio2"
                  name="radio-group"
                />
                <label className="radio-b__label" htmlFor="radio2">
                  <div className="radio-b__custom">
                    <span className="radio-b__custom-fill"></span>
                  </div>
                  <span className="radio-b__text">มื้อกลางวัน</span>
                </label>
              </div>
            </div>

            {/* Checkbox 3 มื้อเย็น */}
            <div className="radio-input">
              <div className="radio-b">
                <input
                  type="radio"
                    onChange={(e) => 
                      setDetails(e.target.value)
                    }
                  className="radio-b__input"
                  id="radio3"
                  name="radio-group"
                  value="radio3"
                  required
                />
                <label className="radio-b__label" htmlFor="radio3">
                  <div className="radio-b__custom">
                    <span className="radio-b__custom-fill"></span>
                  </div>
                  <span className="radio-b__text">มื้อเย็น</span>
                </label>
              </div>
            </div>

            {/* Checkbox 4 มื้อว่าง */}
            <div className="radio-input">
              <div className="radio-b">
                <input
                  type="radio"
                  onChange={(e) => 
                      setDetails(e.target.value)
                    }
                  className="radio-b__input"
                  id="radio4"
                  name="radio-group"
                  value="radio4"
                  required
                />
                <label className="radio-b__label" htmlFor="radio4">
                  <div className="radio-b__custom">
                    <span className="radio-b__custom-fill"></span>
                  </div>
                  <span className="radio-b__text">มื้อว่าง</span>
                </label>
              </div>
            </div>
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">

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

                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                      ref={fileInputRef}
                      // accept="image/*"
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
                        setImage(null);
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
                  <div className="overflow-hidden relative rounded-lg">
                    <div className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
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
                  onClick={() => setIsPopupOpen(true)}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  className="w-full mt-4 py-3 text-center text-gray-600 rounded-md"
                  style={{
                    backgroundColor: isHover ? '#ff8a71' : '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderRadius: '50px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    color: isHover ? '#FFFFFF' : '#00000080',
                    fontSize: '20px',
                  }}>
                  คลิกเพื่อตรวจสอบค่าโภชนาการอาหาร
                </button>
                <ImageUploadPopup
                  isOpen={ispopupOpen}
                  onClose={() => setIsPopupOpen(false)}
                  onFileSelect={(file: File) => setUploadFile(file)}
                />
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
                        value={selectedDate}

                        format={dateFormat}
                        // onChange={(date) => setSelectedDate(date || dayjs())}
                        style={{ width: '250px', height: '42px' }}
                        disabled
                      />
                    </Space>
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-gray-700 mb-2">เวลา</label>
                  <div className="relative">
                    <TimePicker
                      value={selectedTime}
                      format="HH:mm:ss"
                      style={{ width: '250px', height: '42px' }}
                      disabled
                    />
                  </div>
                </div>

                {/* Food Name */}
                <div className="col-span-2">
                  <label className="block text-gray-700 mb-2">ชื่ออาหาร <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded py-2 px-3"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    required
                  />
                </div>

                {/* Amount */}
                <div className="col-span-2">
                  <label className="block text-gray-700 mb-2">ปริมาณที่รับประทาน <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded py-2 px-3 placeholder:text-sm placeholder:text-gray-300 placeholder:italic"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder='เช่น "จาน 1 จาน", "100 กรัม", "1 ชิ้น", "1 แก้ว"'
                    required
                  />
                </div>

                {/* Nutrition Info */}
                <div className="col-span-2">
                  <div className="mb-2 text-gray-700">**ข้อมูลโภชนาการ (ในกรณีที่เมนูอาหารเองและต้องการกรอกข้อมูลด้วยตนเอง)</div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">แคลอรี่</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="block w-full border border-gray-300 rounded py-2 px-3"
                        placeholder="กิโลแคลอรี่"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">โปรตีน</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="block w-full border border-gray-300 rounded py-2 px-3"
                        placeholder="กรัม"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">คาร์โบไฮเดรต</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="block w-full border border-gray-300 rounded py-2 px-3"
                        placeholder="กรัม"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">ไขมัน</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="block w-full border border-gray-300 rounded py-2 px-3"
                        placeholder="กรัม"
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">โซเดียม</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="block w-full border border-gray-300 rounded py-2 px-3"
                        placeholder="กรัม"
                        value={sodium}
                        onChange={(e) => setSodium(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">ความคิดเห็นหรือบันทึกเพิ่มเติม</label>
                    <textarea
                      className="block w-full border border-gray-300 rounded py-2 px-3 placeholder:text-sm placeholder:text-gray-300 placeholder:italic"
                      rows={2}
                      placeholder='เช่น "รสแซบอยู่มากๆ", "อาหารจานนี้อร่อย", "สูตรโฮมเมด"'
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 hover:text-gray-900 transition"
                      onClick={handleBackhome}
                      disabled={isLoading}
                    >
                      ยกเลิก
                    </button>

                    <button
                      className="px-6 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition disabled:opacity-50 disabled:cursor-not-allowed"

                      onClick={() => handleSaveMeal({})}
                      disabled={isLoading}
                    >
                      {isLoading ? 'กำลังบันทึก...' : 'บันทึก'}

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
};