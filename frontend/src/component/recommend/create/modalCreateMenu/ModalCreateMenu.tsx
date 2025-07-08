import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalCreateMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

const ModalCreateMenu: React.FC<ModalCreateMenuProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">ตั้งชื่อรายการอาหาร</h2>
        <p className="text-gray-600 mb-4">กรุณากรอกชื่อและคำอธิบายของคุณ</p>

        <input
          type="text"
          placeholder="ชื่อรายการอาหาร"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none"
        />

        <textarea
          placeholder="คำอธิบาย"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none"
          rows={3}
        />

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-white border px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer">
            ยกเลิก
          </button>
          <button
            onClick={() => {
              onSave(title, description);
              setTitle("");
              setDescription("");
              navigate("/");
            }}
            className="bg-[#84AC46] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateMenu;
