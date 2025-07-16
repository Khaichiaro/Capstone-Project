import RecipeCard from "../recipeCardProps/RecipeCardProps";
import food1 from "../../../../assets/food/saladPak1.svg";
import food2 from "../../../../assets/food/sapageties.svg";
import food3 from "../../../../assets/food/stakesalmon.svg";
import { useNavigate } from "react-router-dom";
import type { IFoodRecommend } from "../../../../interfaces/IFoodRecommend";
import { useEffect, useState } from "react";
import { GetAllFoodRecommend } from "../../../../services/https";
import { apiUrl } from "../../../../services/https";

// Recipes Section Component
const RecipesSection: React.FC = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<IFoodRecommend[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllFoodRecommend();
        const allData: IFoodRecommend[] = response.data;

        const ranked = allData
          .filter(
            (item) =>
              item.Ranking?.Rank !== undefined && item.Ranking?.Rank !== null
          )
          .sort(
            (a, b) => parseInt(a.Ranking!.Rank) - parseInt(b.Ranking!.Rank)
          );

        const unranked = allData
          .filter((item) => !item.Ranking)
          .sort(
            (a, b) =>
              new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
          );

        const finalList = [...ranked, ...unranked]; // 🧠 รวมโดยให้ ranked อยู่บน

        setRecipes(finalList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="px-8 py-8 bg-[#FFFBF3]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">เมนูแนะนำ</h2>
        {/* <div >
          <p className="text-gray-600">อาหารที่เราแนะนำ</p>
        </div> */}
        <div className="grid grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.ID}
              food={recipe}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate(`/recipe/${encodeURIComponent(recipe.Food.FoodName)}`);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;
