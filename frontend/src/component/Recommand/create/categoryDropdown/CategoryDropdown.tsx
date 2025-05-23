import { ChevronDown } from "lucide-react";

interface Category {
  value: string;
  label: string;
}

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategoryChange,
  categories
}) => {
  return (
    <div className="relative">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full appearance-none bg-white border-0 rounded-full px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
    </div>
  );
};

export default CategoryDropdown;