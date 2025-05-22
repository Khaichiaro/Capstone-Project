// Category Card Component
interface CategoryCardProps {
  icon: string;
  title: string;
  bgColor: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, bgColor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${bgColor} rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <span className="text-gray-700 font-medium text-sm">{title}</span>
    </div>
  );
};

export default CategoryCard;
