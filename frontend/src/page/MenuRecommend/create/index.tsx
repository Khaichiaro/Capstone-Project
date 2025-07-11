import React, { useEffect, useState } from "react";
import NavBar from "../../../component/navbar/NavBar";
import CategoryDropdown from "../../../component/recommend/create/categoryDropdown/CategoryDropdown";
import SearchBar from "../../../component/recommend/create/searchBar/SearchBar";
import FoodCard from "../../../component/recommend/create/foodCard/FoodCard";
import SummaryPanel from "../../../component/recommend/create/sumaryPanel/SummaryPanel";

import type { IFood } from "../../../interfaces/IFood";
import type { IFoodRecommendSelected } from "../../../interfaces/IFoodRecommendSelected";
import ModalCreateMenu from "../../../component/recommend/create/modalCreateMenu/ModalCreateMenu";
import { useNavigate } from "react-router-dom";
import { CreateFoodRecommend, GetAllFoodType, GetAllFoods } from "../../../services/https";
import type { IFoodType } from "../../../interfaces/IFoodType";

function CreateRecommend() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<IFoodRecommendSelected | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [foods, setFoods] = useState<IFood[]>([]);
  const [foodsLoading, setFoodsLoading] = useState(true);
  const [foodsError, setFoodsError] = useState<string | null>(null);
  const userIdStr = localStorage.getItem("user_id");
  const userId = userIdStr ? parseInt(userIdStr) : undefined;
  const [foodTypes, setFoodTypes] = useState<IFoodType[]>([]);

  

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    
    const loadFoods = async () => {
      try {
        setFoodsLoading(true);
        setFoodsError(null);
        const result = await GetAllFoods();
        
        // ตรวจสอบว่าข้อมูลที่ได้มาเป็น array หรือไม่
        if (Array.isArray(result.data)) {
          setFoods(result.data);
        } else {
          console.error("Foods data is not an array:", result.data);
          setFoodsError("ข้อมูลอาหารไม่ถูกต้อง");
          setFoods([]);
        }
      } catch (err) {
        console.error("Error fetching foods:", err);
        setFoodsError("ไม่สามารถโหลดข้อมูลอาหารได้");
        setFoods([]);
      } finally {
        setFoodsLoading(false);
      }
    };

    loadFoods();
    console.log("foodsList: ", foods)
  }, []);

  useEffect(() => {
    const fetchFoodTypes = async () => {
      const response = await GetAllFoodType();
      setFoodTypes(response.data);
    };
    fetchFoodTypes();
  }, []);
  console.log("FoodType: ", foodTypes)

  const handleModalSave = async (
    title: string,
    instruction: string,
    description: string,
    benefits: string,
    disadvantages: string
  ) => {
    if (!selectedFood) return;

    setIsLoading(true);
    try {
      const recommendData = {
        userID: userId, 
        foodID: selectedFood.food.ID,
        name: title,
        instruction: instruction,
        description: description,
        benefits: benefits,
        disadvantages: disadvantages,
        rankingID: 0
      };

      await CreateFoodRecommend(recommendData);
      alert("สร้างการแนะนำอาหารเรียบร้อยแล้ว!");
      setSelectedFood(null);
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error creating food recommend:", error);
      alert("เกิดข้อผิดพลาดในการสร้างการแนะนำอาหาร");
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    { value: "all", label: "ทั้งหมด" },
    ...foodTypes.map((ft) => ({
      value: ft.ID.toString(),
      label: ft.FoodType,
    })),
  ];

  const mapFoodType = (foodTypeID: number): string => {
    const found = foodTypes.find((ft) => ft.ID === foodTypeID);
    return found ? found.FoodType : "ไม่ทราบหมวดหมู่";
  };

  const filteredFoods = Array.isArray(foods)
  ? foods.filter((food) => {
      const matchesCategory =
        selectedCategory === "all" ||
        food.FoodTypeID.toString() === selectedCategory;
      const matchesSearch = food.FoodName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
  : [];

  const handleSelectFood = (food: IFoodRecommendSelected) => {
    setSelectedFood(food);
  };

  const handleRemoveFood = () => {
    setSelectedFood(null);
  };

  const handleCreateMenu = () => {
    if (selectedFood) {
      setIsModalOpen(true);
    } else {
      alert("กรุณาเลือกอาหารก่อนสร้างการแนะนำ");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF2DC]">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            เลือกอาหารที่จะแนะนำของคุณ
          </h1>
          <p className="text-gray-600 text-lg">
            เลือกแนะนำอาหารตามใจ และวิเคราะห์คุณค่าทางโภชนาการได้แบบเรียลไทม์
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
                categories={categoryOptions}
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
              {foodsLoading ? (
                <div className="col-span-full text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#84AC46]"></div>
                  <p className="mt-2 text-gray-600">กำลังโหลดข้อมูลอาหาร...</p>
                </div>
              ) : foodsError ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-red-500">{foodsError}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-2 text-[#84AC46] hover:underline"
                  >
                    ลองใหม่
                  </button>
                </div>
              ) : filteredFoods.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">ไม่พบอาหารในหมวดหมู่นี้</p>
                </div>
              ) : (
                filteredFoods.map((food) => (
                  <FoodCard 
                    key={food.ID} 
                    food={food} 
                    onAdd={handleSelectFood}
                    isSelected={selectedFood?.food.ID === food.ID}
                    foodTypes={foodTypes}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Panel - Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <SummaryPanel
                selectedFood={selectedFood}
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
        isLoading={isLoading}
      />
    </div>
  );
}

export default CreateRecommend;