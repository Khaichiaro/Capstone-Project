// เขียนโดย Game วันที่ 2025-07-8

import { Cloud, X } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";

type ImageUploadPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    onFileSelect: (file: File) => void;
};

type NutritionData = {
    food_name: string;
    code: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sodium: number;
};

const ImageUploadPopup: React.FC<ImageUploadPopupProps> = ({ isOpen, onClose, onFileSelect }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);


  
    const handleFileSelect = (file?: File) => {  //ฟังก์ชันรับไฟล์เข้ามา
      if (file) {
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file); //สร้าง URL สำหรับแสดงภาพ
        setImagePreview(imageUrl); //อัปเดต URL สำหรับแสดงภาพ
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { //เรียกเมื่อผู้ใช้เลือกไฟล์
        const file = event.target.files?.[0];
        handleFileSelect(file);
    };
    
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => { //เรียกเมื่อผู้ใช้วางไฟล์
        event.preventDefault();
        setIsDragOver(false);
        const file = event.dataTransfer.files[0];
        handleFileSelect(file);
    };
    

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => { //เรียกเมื่อผู้ใช้ลากไฟล์เหนือพื้นที่
        event.preventDefault();
        setIsDragOver(true);
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => { //เรียกเมื่อผู้ใช้เลิกลากไฟล์เหนือพื้นที่
        event.preventDefault();
        setIsDragOver(false);
    }

    const triggerFileInput = () => { //เรียกเมื่อผู้ใช้คลิกพื้นที่อัปโหลด
        fileInputRef.current?.click();
    };

    const handleClose = () => { //เรียกเมื่อผู้ใช้ปิด popup
        setSelectedFile(null);
        setIsDragOver(false);
        setImagePreview(null);
        setIsUploaded(false);
        setNutritionData(null);
        onClose();
    };
    

    const handleUpload = async () => {
        if (!selectedFile) return;
    
        setIsUploading(true);
    
        try {
        const formData = new FormData();
        formData.append("file", selectedFile);
    
        const response = await axios.post("http://localhost:8001/predict/", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });
    
        // สมมติว่า API คืนข้อมูล NutritionData แบบนี้
        console.log("Response data:", response.data);
        const nutritionData: NutritionData = response.data;
    
        setNutritionData(nutritionData);
        setIsUploaded(true);
        onFileSelect(selectedFile);
        } catch (error) {
        console.error("Upload failed:", error);
        } finally {
        setIsUploading(false);
        }
    };

    const NutritionBar = ({ label, value, max, unit, color }: {
        label: string;
        value: number;
        max: number;
        unit: string;
        color: string;
    }) => {
        const percentage = Math.min((value / max) * 100, 100);
        
        return (
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="text-sm text-gray-600">{value} {unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className={`h-3 rounded-full transition-all duration-500 ${color}`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        );
    };

    if (!isOpen) return null;






    return (
        <>
        {/* Input file ที่ซ่อนไว้ */}
        <input
            ref={fileInputRef}
            type="file"
            onChange={handleInputChange}
            className="hidden"
            accept=".jpg,.jpeg,.png"
        />
    
        {/* Popup Overlay */}
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full  max-w-2xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800">
                อัปโหลดรูปภาพ
                </h3>
                <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-red-400 text-black-500 hover:bg-red-500 transition-colors"
                >
                <X size={16} />
                </button>
            </div>
    
            {/* Upload Area */}
            {isUploaded && nutritionData ? (
                <div className="px-8 py-2">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                            {nutritionData.food_name}
                        </h2>
                    </div>

                    {/* Nutrition Information */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            ข้อมูลโภชนาการ
                        </h3>
                        
                        <NutritionBar
                            label="แคลอรี่"
                            value={nutritionData.calories}
                            max={700}
                            unit="kcal"
                            color="bg-gradient-to-r from-orange-300 to-orange-600"
                        />
                        
                        <NutritionBar
                            label="โปรตีน"
                            value={nutritionData.protein}
                            max={50}
                            unit="g"
                            color="bg-gradient-to-r from-blue-300 to-blue-600 "
                        />
                        
                        <NutritionBar
                            label="คาร์โบไฮเดรต"
                            value={nutritionData.carbs}
                            max={100}
                            unit="g"
                            color="bg-gradient-to-r from-green-300 to-green-600 "
                        />
                        
                        <NutritionBar
                            label="ไขมัน"
                            value={nutritionData.fat}
                            max={50}
                            unit="g"
                            color="bg-gradient-to-r from-red-300 to-red-600 "
                        />
                        
                        <NutritionBar
                            label="โซเดียม"
                            value={nutritionData.sodium}
                            max={2000}
                            unit="mg"
                            color="bg-gradient-to-r from-purple-300 to-purple-600 "
                        />
                    </div>
                </div>
            ) : (
                <div className="px-8 py-6">
                <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer ${
                    isDragOver
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={triggerFileInput}
                >
                
                {!imagePreview ? (  // ถ้ายังไม่มีภาพให้แสดงข้อความอย่างเดียวแต่ถ้ามีภาพให้แสดงภาพ
                    <>
                    <Cloud size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-2">
                        คลิกหรือลากไฟล์ไปยังพื้นที่เพื่ออัพโหลด
                    </p>
                    <p className="text-sm text-gray-400 mb-6">
                        รูปแบบที่ยอมรับคือ .JPG และ .PNG
                    </p>
                    </>
                ) : (
                    <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 max-h-48 mx-auto rounded-lg"
                    />
                    
                )}

                </div>

                </div>
                )}
            
    
                {/* Selected File Display */}
                {selectedFile && !isUploaded && (
                <div className="px-8 ">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                    <span className="font-medium">ไฟล์ที่เลือก:</span> {selectedFile.name}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                    ขนาด: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                </div>
                 {/* Loading State */}
                {isUploading && (
                                <div className="mt-6 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                                    <p className="text-blue-600">กำลังประมวลผล...</p>
                                </div>
                            )}
                </div>
                )}

                {/* Action Buttons */}
            <div className="flex justify-end gap-4 p-6 pt-5">
                <button
                onClick={handleClose}
                className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors max-w-fit"
                >
                Cancel
                </button>

                {!isUploaded && (
                    <button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                        selectedFile
                        ? 'bg-green-500 text-white hover:bg-green-600 max-w-fit'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed max-w-fit'
                    }`}
                    >
                Continue
                </button>
                )}
            </div>

            </div>
        </div>
    </>
    );
};

export default ImageUploadPopup;
