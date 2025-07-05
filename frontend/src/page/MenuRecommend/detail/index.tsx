import { useParams } from "react-router-dom";
import NavBar from "../../../component/navbar/NavBar";
import FoodDetails from "../../../component/recommend/detail/foodDetails/FoodDetail";
import MainFoodCard from "../../../component/recommend/detail/mainFood/MainFood";
import RecipesSection from "../../../component/recommend/home/recipesSection/RecipesSection";
import food1 from "../../../assets/food/saladPak1.svg";
import food2 from "../../../assets/food/sapageties.svg";
import food3 from "../../../assets/food/stakesalmon.svg";
import type { IFoodRecommend } from "../../../interfaces/IFoodRecommend";
import { useEffect, useState } from "react";
import { GetAllFoodRecommend } from "../../../services/https";

// Recipe Detail Page Component
const RecipeDetailPage: React.FC = () => {
  const { recipeName } = useParams<{ recipeName: string }>();
  const decodedRecipeName = decodeURIComponent(recipeName || "");
  const [currentFood, setCurrentFood] = useState<IFoodRecommend | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      try {
        setIsLoading(true);
        const allRecs = await GetAllFoodRecommend();
        console.log("FoodRecommend All: ", allRecs.data);
        console.log("decodedRecipeName: ", decodedRecipeName);
        const match = allRecs.data.find(
          (rec: IFoodRecommend) => rec.Food?.FoodName === decodedRecipeName
        );
        
        if (match) setCurrentFood(match);
        console.log("FoodRecommend Current", currentFood);
      } catch (error) {
        console.error('Error loading food detail:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    fetchData();
  }, [decodedRecipeName]);

  if (!currentFood){
    return <div className="text-center mt-10 text-gray-600">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#FDF2DC]">
      <NavBar />
      <MainFoodCard food={currentFood} />
      <div className="bg-[#FFFBF3] pb-8">
        <FoodDetails food={currentFood} loading={isLoading}/>
        <RecipesSection />
      </div>
    </div>
  );
};

export default RecipeDetailPage;
