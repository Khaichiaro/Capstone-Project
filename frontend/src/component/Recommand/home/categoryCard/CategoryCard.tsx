// Category Card Component
interface CategoryCardProps {
  image: string;
  title: string;
  bgColor: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  bgColor,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${bgColor} rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer shadow-sm`}
    >
      <img src={image} alt={title} className="w-26 h-26 mb-3 object-contain" />
      <span className="text-gray-700 font-bold text-xl">{title}</span>
    </div>
  );
};

export default CategoryCard;
