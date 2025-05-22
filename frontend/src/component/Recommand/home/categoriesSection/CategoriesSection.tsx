import { useNavigate } from "react-router-dom";
import CategoryCard from "../categoryCard/CategoryCard";

// Categories Section Component
const CategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { icon: '🥗', title: 'เมนูสุขภาพ', bgColor: 'bg-orange-100' },
    { icon: '🍪', title: 'ข้าวจานเดียว', bgColor: 'bg-yellow-100' },
    { icon: '🍰', title: 'ขนมหวาน', bgColor: 'bg-pink-100' },
    { icon: '☕', title: 'เครื่องดื่ม', bgColor: 'bg-blue-100' },
  ];

  return (
    <section className="px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">หมวดหมู่</h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
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
