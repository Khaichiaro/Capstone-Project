import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// interface ModalCreateMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (
//     title: string,
//     instruction: string,
//     description: string,
//     benefits: string,
//     disadvantages: string
//   ) => void;
//   isLoading?: boolean;
// }

interface ModalCreateMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    instruction: string,
    description: string,
    benefits: string,
    disadvantages: string
  ) => void;
  isLoading?: boolean;
  initialValues?: {
    title: string;
    instruction: string;
    description: string;
    benefits: string;
    disadvantages: string;
  };
  onFormChange?: (values: {
    title: string;
    instruction: string;
    description: string;
    benefits: string;
    disadvantages: string;
  }) => void;
}

const ModalCreateMenu: React.FC<ModalCreateMenuProps> = ({
  isOpen,
  onClose,
  onSave,
  isLoading = false,
  initialValues,
  onFormChange,
}) => {
  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [disadvantages, setDisadvantages] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (initialValues && isOpen && !hasInitialized) {
      setTitle(initialValues.title);
      setInstruction(initialValues.instruction);
      setDescription(initialValues.description);
      setBenefits(initialValues.benefits);
      setDisadvantages(initialValues.disadvantages);
      setHasInitialized(true);
    }
  }, [initialValues, isOpen, hasInitialized]);

  useEffect(() => {
    if (onFormChange) {
      onFormChange({
        title,
        instruction,
        description,
        benefits,
        disadvantages,
      });
    }
  }, [title, instruction, description, benefits, disadvantages]);

  const handleSave = () => {
    if (!title.trim()) {
      alert("กรุณากรอกชื่อการแนะนำอาหาร");
      return;
    }
    if (!description.trim()) {
      alert("กรุณากรอกคำอธิบาย");
      return;
    }

    onSave(title, instruction, description, benefits, disadvantages);
    // Reset form
    setTitle("");
    setInstruction("");
    setDescription("");
    setBenefits("");
    setDisadvantages("");
  };

  const handleClose = () => {
    if (!isLoading) {
      setTitle("");
      setInstruction("");
      setDescription("");
      setBenefits("");
      setDisadvantages("");
      setHasInitialized(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">สร้างการแนะนำอาหาร</h2>
          <p className="text-gray-600 mb-6">
            กรุณากรอกข้อมูลสำหรับการแนะนำอาหารของคุณ
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อการแนะนำอาหาร *
              </label>
              <input
                type="text"
                placeholder="เช่น สลัดผักโบราณ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84AC46]"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คำแนะนำการบริโภค
              </label>
              <input
                type="text"
                placeholder="เช่น กินพร้อมไข่ต้ม"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84AC46]"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คำอธิบาย *
              </label>
              <textarea
                placeholder="อธิบายเกี่ยวกับการแนะนำอาหารนี้"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84AC46]"
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ประโยชน์
              </label>
              <textarea
                placeholder="ประโยชน์ของอาหารนี้ (แยกแต่ละข้อด้วย Enter)"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84AC46]"
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ข้อควรระวัง
              </label>
              <textarea
                placeholder="ข้อควรระวังในการบริโภค"
                value={disadvantages}
                onChange={(e) => setDisadvantages(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84AC46]"
                rows={2}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleClose}
              className="bg-white border px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
              disabled={isLoading}
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-[#84AC46] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "กำลังบันทึก..." : "บันทึก"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateMenu;
