import RecipeCard from "../recipeCardProps/RecipeCardProps";
import food1 from "../../../../assets/food/saladPak1.svg";
import food2 from "../../../../assets/food/sapageties.svg";
import food3 from "../../../../assets/food/stakesalmon.svg";
import { useNavigate } from "react-router-dom";

// Recipes Section Component
const RecipesSection: React.FC = () => {
    const navigate = useNavigate();
  const recipes = [
    {
      image: food1,
      title: "สลัดผัก",
      calories: 200,
      likes: 399,
    },
    {
      image: food2,
      title: "สปาเก็ตตี้",
      calories: 350,
      likes: 1090,
    },
    {
      image: food3,
      title: "สเต็กปลาแซลมอน",
      calories: 300,
      likes: 25200,
    },
    {
      image: food1,
      title: "สลัดผัก",
      calories: 200,
      likes: 399,
    },
    {
      image: food2,
      title: "สปาเก็ตตี้",
      calories: 350,
      likes: 1090,
    },
    {
      image: food3,
      title: "สเต็กปลาแซลมอน",
      calories: 300,
      likes: 25200,
    },
    {
      image: food1,
      title: "สลัดผัก",
      calories: 200,
      likes: 399,
    },
    {
      image: food2,
      title: "สปาเก็ตตี้",
      calories: 350,
      likes: 1090,
    },
    {
      image: food3,
      title: "สเต็กปลาแซลมอน",
      calories: 300,
      likes: 25200,
    },
  ];

  return (
    <section className="px-8 py-8 bg-[#FFFBF3]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">เมนูแนะนำ</h2>
        <div className="grid grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              image={recipe.image}
              title={recipe.title}
              calories={recipe.calories}
              likes={recipe.likes}
              onClick={() => navigate(`/recipe/${encodeURIComponent(recipe.title)}`)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;
