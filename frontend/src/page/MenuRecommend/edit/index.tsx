// pages/recommend/EditRecommend.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  GetFoodRecommendByID,
  GetAllFoods,
  GetAllFoodType,
  UpdateFoodRecommend,
} from "../../../services/https";
import type { IFood } from "../../../interfaces/IFood";
import type { IFoodRecommendSelected } from "../../../interfaces/IFoodRecommendSelected";
import type { IFoodType } from "../../../interfaces/IFoodType";

import NavBar from "../../../component/navbar/NavBar";
import CategoryDropdown from "../../../component/recommend/create/categoryDropdown/CategoryDropdown";
import SearchBar from "../../../component/recommend/create/searchBar/SearchBar";
import FoodCard from "../../../component/recommend/create/foodCard/FoodCard";
import SummaryPanel from "../../../component/recommend/create/sumaryPanel/SummaryPanel";
import ModalCreateMenu from "../../../component/recommend/create/modalCreateMenu/ModalCreateMenu";
import type { IFoodRecommendUpdateDTO } from "../../../interfaces/IFoodRecommendUpdateDTO";
import { message } from "antd";

const EditRecommend = () => {
  const { id } = useParams(); // 🆔 Get recommend ID from route
  const navigate = useNavigate();
  const [foods, setFoods] = useState<IFood[]>([]);
  const [foodTypes, setFoodTypes] = useState<IFoodType[]>([]);
  const [selectedFood, setSelectedFood] =
    useState<IFoodRecommendSelected | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [foodsLoading, setFoodsLoading] = useState(true);
  const [foodsError, setFoodsError] = useState<string | null>(null);
  const [initialFoodId, setInitialFoodId] = useState<number | null>(null);

  const userIdStr = localStorage.getItem("user_id");
  const userId = userIdStr ? parseInt(userIdStr) : undefined;

  type FoodFormValues = {
    title: string;
    instruction: string;
    description: string;
    benefits: string;
    disadvantages: string;
  };

  const [formValuesMap, setFormValuesMap] = useState<
    Record<number, FoodFormValues>
  >({});

  // โหลดข้อมูลแนะนำอาหารเดิม
  useEffect(() => {
    fetchRecommend();
  }, [id]);

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
    console.log("foodsList: ", foods);
  }, []);

  const fetchRecommend = async () => {
    try {
      const res = await GetFoodRecommendByID(Number(id));
      const recommend = res.data;

      const wrapped: IFoodRecommendSelected = {
        id: recommend.ID,
        name: recommend.Name,
        image: recommend.Food?.ImageUrl,
        calories: recommend.Food?.Calories || 0,
        category: recommend.Food?.FoodTypeID?.toString() || "อื่นๆ",
        uniqueId: Date.now(),
        food: recommend.Food,
        oldRecommend: recommend,
      };
      setSelectedFood(wrapped);

      // Store default form values keyed by food ID
      setFormValuesMap((prev) => ({
        ...prev,
        [recommend.Food.ID]: {
          title: recommend.Name || "",
          instruction: recommend.Instruction || "",
          description: recommend.DesCription || "",
          benefits: recommend.Benefits || "",
          disadvantages: recommend.Disadvantages || "",
        },
      }));

      // ดึง foods ใหม่ แล้วใส่รวมกับ food ที่แนะนำไว้
      const foodRes = await GetAllFoods();
      let fetchedFoods: IFood[] = Array.isArray(foodRes.data)
        ? foodRes.data
        : [];

      // ถ้ายังไม่มี food นี้ใน list ให้เติม
      const foodAlreadyExists = fetchedFoods.find(
        (f) => f.ID === recommend.Food?.ID
      );
      if (!foodAlreadyExists && recommend.Food) {
        fetchedFoods = [...fetchedFoods, recommend.Food];
      }

      setFoods(fetchedFoods); // อัปเดต foods รวม selected
      setInitialFoodId(recommend.Food?.ID || null); // <<== จำ ID เดิมไว้

      setIsModalOpen(false); // เติมข้อมูลให้ modal โดยเปิดทันที
    } catch (error) {
      console.error("โหลดข้อมูลแนะนำอาหารล้มเหลว:", error);
      alert("ไม่สามารถโหลดข้อมูลแนะนำอาหารได้");
      navigate("/");
    }
  };

  // โหลด foods และ types
  useEffect(() => {
    // GetAllFoods().then((res) => setFoods(res.data));
    GetAllFoodType().then((res) => setFoodTypes(res.data));
  }, []);

  const handleUpdate = async (
    title: string,
    instruction: string,
    description: string,
    benefits: string,
    disadvantages: string
  ) => {
    console.log("selectedFoodUpdate: ", selectedFood);
    console.log("selectedFoodUpdateOld: ", selectedFood?.oldRecommend);
    if (!selectedFood || !selectedFood.oldRecommend || !userId) return;

    setIsLoading(true);
    try {
      const updateData: IFoodRecommendUpdateDTO = {
        name: title,
        instruction,
        description,
        benefits,
        disadvantages,
        foodID: selectedFood.food.ID,
        userID: userId,
      };

      await UpdateFoodRecommend(selectedFood.oldRecommend.ID, updateData);
      message.success("อัปเดตข้อมูลสำเร็จ");
      // ✅ เพิ่ม delay ก่อน navigate
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Update error", err);
      message.error("อัปเดตไม่สำเร็จ");
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

  const filteredFoods = Array.isArray(foods)
    ? (() => {
        let filtered = foods.filter((food) => {
          const matchesCategory =
            selectedCategory === "all" ||
            food.FoodTypeID.toString() === selectedCategory;

          const matchesSearch = food.FoodName.toLowerCase().includes(
            searchTerm.toLowerCase()
          );

          return matchesCategory && matchesSearch;
        });

        // ดันเฉพาะอาหารเดิมที่ถูกแนะนำไว้ขึ้นบนสุด

        if (initialFoodId) {
          const index = filtered.findIndex((f) => f.ID === initialFoodId);
          if (index !== -1) {
            const [oldFood] = filtered.splice(index, 1);
            filtered.unshift(oldFood); // เอาไว้ตำแหน่งแรก
          }
        }

        return filtered;
      })()
    : [];
  console.log("selected old food ID", selectedFood?.food?.ID);
  //   console.log(
  //     "foods:",
  //     foods.map((f) => f.ID)
  //   );

  const handleSelectFood = (food: IFoodRecommendSelected) => {
    setSelectedFood((prev) => ({
      ...food,
      oldRecommend: prev?.oldRecommend || undefined, // <<== preserve oldRecommend
    }));
    console.log("selected foodddddddddddddd:", food);

    // 👇 ถ้ายังไม่มีค่าใน formValuesMap ให้ใส่ default
    if (!formValuesMap[food.food.ID]) {
      setFormValuesMap((prev) => ({
        ...prev,
        [food.food.ID]: {
          title: "",
          instruction: "",
          description: "",
          benefits: "",
          disadvantages: "",
        },
      }));
    }
    console.log("formValuesMappppppp:", formValuesMap);
  };

  return (
    <div className="min-h-screen bg-[#FDF2DC]">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            แก้ไขการแนะนำอาหาร
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
                    isSelected={selectedFood?.food?.ID === food.ID}
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
                onRemoveFood={() => setSelectedFood(null)}
                onCreateMenu={() => setIsModalOpen(true)}
                actionLabel="อัปเดตการแนะนำอาหาร"
              />
            </div>
          </div>
        </div>
      </div>

      <ModalCreateMenu
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdate}
        isLoading={isLoading}
        initialValues={
          selectedFood?.food?.ID
            ? formValuesMap[selectedFood.food.ID] || {
                title: "",
                instruction: "",
                description: "",
                benefits: "",
                disadvantages: "",
              }
            : undefined
        }
        onFormChange={(newForm) => {
          if (selectedFood?.food?.ID) {
            setFormValuesMap((prev) => ({
              ...prev,
              [selectedFood.food.ID]: newForm,
            }));
          }
        }}
      />
    </div>
  );
};

export default EditRecommend;
