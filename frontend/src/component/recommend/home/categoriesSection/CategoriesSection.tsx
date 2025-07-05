import CategoryCard from "../categoryCard/CategoryCard";
import { useNavigate } from "react-router-dom";

import healthy from "../../../../assets/categories/healthy.svg";
import onedish from "../../../../assets/categories/oneDish.svg";
import dessert from "../../../../assets/categories/desert.svg";
import drink from "../../../../assets/categories/drink.svg";

// Categories Section Component
const CategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      image: healthy,
      title: "เมนูสุขภาพ",
      bgColor: "bg-[#FCF2DD]",
      accentColor: "bg-green-500",
    },
    {
      image: onedish,
      title: "อาหารจานเดียว",
      bgColor: "bg-[#FCF2DD]",
      accentColor: "bg-orange-500",
    },
    {
      image: dessert,
      title: "ขนมหวาน",
      bgColor: "bg-[#FCF2DD]",
      accentColor: "bg-pink-500",
    },
    {
      image: drink,
      title: "เครื่องดื่ม",
      bgColor: "bg-[#FCF2DD]",
      accentColor: "bg-blue-500",
    },
  ];

  return (
    <section className="px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">หมวดหมู่</h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transition-all duration-300 hover:-translate-y-2"
              onClick={() =>
                navigate(`/category/${encodeURIComponent(category.title)}`)
              }
            >
              {/* Top accent line that appears on hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${category.accentColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-t-lg z-10`}
              ></div>

              <CategoryCard
                image={category.image}
                title={category.title}
                bgColor={category.bgColor}
                onClick={() => {}} // Empty since we handle click on the wrapper
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
