import { User } from "lucide-react";
import type { IFoodRecommend } from "../../../../interfaces/IFoodRecommend";
import profile2 from "../../../../assets/profile2.svg";

// Main Food Card Component
const MainFoodCard = ({ food }: { food: IFoodRecommend }) => {
  return (
    <div className="bg-[#FDF2DC] pb-8">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
          <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover rounded-full shadow-lg"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
              อร่อยมาก
            </h1>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-2">
              มีประโยชน์ด้วย
            </h2>
            <h3 className="text-3xl lg:text-5xl font-bold text-gray-800">
              ต้องลอง!!!
            </h3>
          </div>
        </div>
        <div className="absolute right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg  transform -translate-x-1 ">
          <User className="w-8 h-8 text-gray-600 " />
        </div>
      </div>
    </div>
  );
};

export default MainFoodCard;
