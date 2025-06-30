// เขียนโดย Game วันที่ 2025-07-8

import { Cloud, X } from "lucide-react";
import { useRef, useState } from "react";

type ImageUploadPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    onFileSelect: (file: File) => void;
  };


const ImageUploadPopup: React.FC<ImageUploadPopupProps> = ({ isOpen, onClose, onFileSelect }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploaded, setIsUploaded] = useState(false);

  
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
        onClose();
    };
    
    const handleContinue = () => { //เรียกเมื่อผู้ใช้คลิกปุ่ม Continue
        if (selectedFile) {
        onFileSelect(selectedFile);
        setIsUploaded(true);
        }
        
    };


    if (!isOpen) return null; // ถ้า popup ไม่เปิด ให้ไม่แสดงอะไรเลย


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
            {isUploaded ? (
                <div className="meal-nutrients">
                    
                </div>
            ) : (
                <div className="p-8">
                <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
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
                {selectedFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                    <span className="font-medium">ไฟล์ที่เลือก:</span> {selectedFile.name}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                    ขนาด: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                </div>
                )}

                {/* Action Buttons */}
            <div className="flex justify-end gap-4 p-6 pt-0">
                <button
                onClick={handleClose}
                className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors max-w-fit"
                >
                Cancel
                </button>
                <button
                onClick={handleContinue}
                disabled={!selectedFile}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    selectedFile
                    ? 'bg-green-500 text-white hover:bg-green-600 max-w-fit'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed max-w-fit'
                }`}
                >
            Continue
            </button>
            </div>
    
            
            </div>
        </div>
    </>
    );
};

export default ImageUploadPopup;
