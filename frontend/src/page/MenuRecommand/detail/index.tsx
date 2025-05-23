import { useParams } from "react-router-dom";
import NavBar from "../../../component/navbar/NavBar";
import FoodDetails from "../../../component/Recommand/detail/foodDetails/Fooddetail";
import MainFoodCard from "../../../component/Recommand/detail/mainFood/MainFood";
import RecipesSection from "../../../component/Recommand/home/recipesSection/RecipesSection";
import food1 from "../../../assets/food/saladPak1.svg";
import food2 from "../../../assets/food/sapageties.svg";
import food3 from "../../../assets/food/stakesalmon.svg";
import type { IFoodRecommend } from "../../../interfaces/IFoodRecommend";

// Recipe Detail Page Component
const RecipeDetailPage: React.FC = () => {
  const { recipeName } = useParams<{ recipeName: string }>();
  const decodedRecipeName = decodeURIComponent(recipeName || '');
  
  // Mock data - in real app, you would fetch this based on recipeName
  const getCurrentFood = (): IFoodRecommend => {
    const foodData: { [key: string]: IFoodRecommend } = {
      'สลัดผัก': {
        id: 1,
        name: "สลัดผักรวมมิกซ์ใส่น้ำสลัดต่างๆ",
        description: "สลัดใส่เป็นเมนูที่ได้ประดับจังหวัดทั่วไทยและไทยแวร์ธิวเซอร์มหาสมุทรเหล่านอก เป็น ผักสลัด มะเขือเทศ และแตงกวา เป็นการสำหรับรสชาติของการอุปโภคน้ำหนักดีและฟิตเนสเพิ่มเติมสำหรับลดลงองค์กำลังกาย",
        calories: 200,
        image: food1,
        benefits: [
          "รับประทานคู่กับน้ำสลัดหรูหัวเปปเดริ่งหรือน้ำสลัดแบบใส เพื่อลดแคลอรี่",
          "เสริฟแแบบเป็นเพื่อริกษาความสดขอผัก",
          "สามารถเก็บไว้ปองความง่าย หรือเป็นมื้อเย็นไม่บ่าง ควรนอม"
        ],
        disadvantages: [
          "ช่วยเสริมโรคลำไส้แปอ",
          "ลดความรู้สึกกิเวระหว่างวิ่น",
          "ดีต่อระบบย่อยอาหาร"
        ],
        protein: 6,
        carb: 14,
        sodium: 20,
        author: "Pongsakorn In-on",
        rating: 36.9,
        isLiked: true,
        likes: 399
      },
      'สปาเก็ตตี้': {
        id: 2,
        name: "สปาเก็ตตี้ซอสมะเขือเทศ",
        description: "สปาเก็ตตี้คลาสสิคกับซอสมะเขือเทศสดใหม่ ปรุงรสด้วยสมุนไพรอิตาเลียน",
        calories: 350,
        image: food2,
        benefits: [
          "ให้พลังงานสูงเหมาะกับการออกกำลังกาย",
          "อุดมไปด้วยคาร์โบไฮเดรต",
          "มีไลโคปีนจากมะเขือเทศ"
        ],
        disadvantages: [
          "เพิ่มพลังงานให้ร่างกาย",
          "ช่วยในการซ่อมแซมกล้ามเนื้อ",
          "มีสารต้านอนุมูลอิสระ"
        ],
        protein: 6,
        carb: 14,
        sodium: 20,
        author: "Chef Marco",
        rating: 42.5,
        isLiked: false,
        likes: 1090
      },
      'สเต็กปลาแซลมอน': {
        id: 3,
        name: "สเต็กปลาแซลมอนย่างสมุนไพร",
        description: "ปลาแซลมอนย่างสุกกำลังดี เสิร์ฟพร้อมผักโรสต์และซอสครีมเลมอน",
        calories: 300,
        image: food3,
        benefits: [
          "อุดมไปด้วยโอเมก้า 3",
          "โปรตีนคุณภาพสูง",
          "ช่วยบำรุงสมองและหัวใจ"
        ],
        disadvantages: [
          "ช่วยลดความเสี่ยงโรคหัวใจ",
          "บำรุงระบบประสาท",
          "มีวิตามินดีสูง"
        ],
        protein: 6,
        carb: 14,
        sodium: 20,
        author: "Chef Salmon",
        rating: 48.2,
        isLiked: true,
        likes: 25200
      }
    };

    return foodData[decodedRecipeName] || foodData['สลัดผัก'];
  };

  const currentFood = getCurrentFood();

  return (
    <div className="min-h-screen bg-[#FDF2DC]">
      <NavBar />
      <MainFoodCard food={currentFood} />
      <div className="bg-[#FFFBF3] pb-8">
        <FoodDetails food={currentFood} />
        <RecipesSection />
      </div>
    </div>
  );
};

export default RecipeDetailPage;