import React, { useEffect, useState } from "react";
import NavBar from "../../../component/navbar/NavBar";
import CategoryDropdown from "../../../component/Recommand/create/categoryDropdown/CategoryDropdown";
import SearchBar from "../../../component/Recommand/create/searchBar/SearchBar";
import FoodCard from "../../../component/Recommand/create/foodCard/FoodCard";
import SummaryPanel from "../../../component/Recommand/create/sumaryPanel/SummaryPanel";

import food1 from "../../../assets/food/saladPak1.svg";
import food2 from "../../../assets/food/sapageties.svg";
import food3 from "../../../assets/food/stakesalmon.svg";

import type { IFood } from "../../../interfaces/IFood";
import type { IFoodRecommendSelected } from "../../..//interfaces/IFoodRecommendSelected";
import ModalCreateMenu from "../../../component/Recommand/create/modalCreateMenu/ModalCreateMenu";
import { useNavigate } from "react-router-dom";
import type { IFoodRecommend } from "../../../interfaces/IFoodRecommend";

function CreateRecommend() {
  const [selectedCategory, setSelectedCategory] = useState<string>("healthy");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFoods, setSelectedFoods] = useState<IFoodRecommendSelected[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // ❌ ห้าม scroll
    } else {
      document.body.style.overflow = "auto"; // ✅ กลับมา scroll ได้
    }

    // ล้างค่าเมื่อ component หายไป
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleModalSave = (title: string, desc: string) => {
    console.log("ชื่อเมนู:", title);
    console.log("คำอธิบาย:", desc);
    alert("บันทึกเรียบร้อยแล้ว!");
    setSelectedFoods([]);
    setIsModalOpen(false);
  };

  const categories = [
    { value: "healthy", label: "เมนูสุขภาพ" },
    { value: "onedish", label: "อาหารจานเดียว" },
    { value: "desserts", label: "ขนมหวาน" },
    { value: "drink", label: "เครื่องดื่ม" },
  ];

  const foods: IFood[] = [
    {
      id: 1,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food1,
      category: "healthy",
      protein: 20,
      carb: 30,
      sodium: 100,
      badge: "ตราสินค้าที่น่าเชื่อถือ",
    },
    {
      id: 2,
      name: "สปาเก็ตตี้",
      calories: 300,
      image: food2,
      protein: 20,
      carb: 30,
      sodium: 100,
      badge: "ตราสินค้าที่น่าเชื่อถือ",
      category: "healthy",
    },
    {
      id: 3,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food3,
      protein: 20,
      carb: 30,
      sodium: 100,
      category: "healthy",
    },
    {
      id: 4,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food3,
      protein: 20,
      carb: 30,
      sodium: 100,
      category: "healthy",
    },
    {
      id: 5,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food3,
      protein: 20,
      carb: 30,
      sodium: 100,
      category: "healthy",
    },
    {
      id: 6,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food1,
      category: "healthy",
      protein: 20,
      carb: 30,
      sodium: 100,
      badge: "ตราสินค้าที่น่าเชื่อถือ",
    },
    {
      id: 7,
      name: "สปาเก็ตตี้",
      calories: 300,
      image: food2,
      protein: 20,
      carb: 30,
      sodium: 100,
      badge: "ตราสินค้าที่น่าเชื่อถือ",
      category: "healthy",
    },
    {
      id: 8,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food3,
      protein: 20,
      carb: 30,
      sodium: 100,
      category: "healthy",
    },
    {
      id: 9,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food3,
      protein: 20,
      carb: 30,
      sodium: 100,
      category: "healthy",
    },
    {
      id: 10,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food3,
      protein: 20,
      carb: 30,
      sodium: 100,
      category: "healthy",
    },
    {
      id: 11,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food1,
      category: "healthy",
      protein: 20,
      carb: 30,
      sodium: 100,
      badge: "ตราสินค้าที่น่าเชื่อถือ",
    },
    {
      id: 12,
      name: "สปาเก็ตตี้",
      calories: 300,
      image: food2,
      protein: 20,
      carb: 30,
      sodium: 100,
      badge: "ตราสินค้าที่น่าเชื่อถือ",
      category: "healthy",
    },
    {
      id: 13,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food3,
      protein: 20,
      carb: 30,
      sodium: 100,
      category: "healthy",
    },
    {
      id: 14,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food3,
      protein: 20,
      carb: 30,
      sodium: 100,
      category: "healthy",
    },
    {
      id: 15,
      name: "สเต็กปลาแซลมอน",
      calories: 300,
      image: food3,
      protein: 20,
      carb: 30,
      sodium: 100,
      category: "healthy",
    },
  ];

  const filteredFoods = foods.filter((food) => {
    const matchesCategory = food.category === selectedCategory;
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddFood = (food: IFoodRecommendSelected) => {
    setSelectedFoods((prev) => [...prev, food]);
  };

  const handleRemoveFood = (uniqueId: number) => {
    setSelectedFoods((prev) =>
      prev.filter((food) => food.uniqueId !== uniqueId)
    );
  };

  const handleCreateMenu = () => {
    // เงื่อนไขขึ้น popup
    if (selectedFoods.length > 1) {
      setIsModalOpen(true);
    } else {
      alert("สร้างรายการเรียบร้อยแล้ว!");
      setSelectedFoods([]);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF2DC]">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            เลือกเมนูอาหารของคุณ
          </h1>
          <p className="text-gray-600 text-lg">
            เลือกอาหารตามใจ และวิเคราะห์คุณค่าทางโภชนาการได้แบบเรียลไทม์
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                เลือกหมวดหมู่ของอาหาร
              </h2>
              <CategoryDropdown
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
              />
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                เลือกอาหาร
              </h2>
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredFoods.map((food) => (
                <FoodCard key={food.id} food={food} onAdd={handleAddFood} />
              ))}
            </div>
          </div>

          {/* Right Panel - Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <SummaryPanel
                selectedFoods={selectedFoods}
                onRemoveFood={handleRemoveFood}
                onCreateMenu={handleCreateMenu}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalCreateMenu
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
      />
    </div>
  );
}

export default CreateRecommend;
