import { useNavigate } from "react-router-dom";
import CategoryCard from "../categoryCard/CategoryCard";

import healthy from "../../../../assets/categories/healthy.svg";
import onedish from "../../../../assets/categories/oneDish.svg";
import dessert from "../../../../assets/categories/desert.svg";
import drink from "../../../../assets/categories/drink.svg";

// Categories Section Component
const CategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { image: healthy, title: 'เมนูสุขภาพ', bgColor: 'bg-[#FCF2DD]' },
    { image: onedish, title: 'อาหารจานเดียว', bgColor: 'bg-[#FCF2DD]' },
    { image: dessert, title: 'ขนมหวาน', bgColor: 'bg-[#FCF2DD]' },
    { image: drink, title: 'เครื่องดื่ม', bgColor: 'bg-[#FCF2DD]' },
  ];

  return (
    <section className="px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">หมวดหมู่</h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              image={category.image}
              title={category.title}
              bgColor={category.bgColor}
              onClick={() => navigate(`/category/${encodeURIComponent(category.title)}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
