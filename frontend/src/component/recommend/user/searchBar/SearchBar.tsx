import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch(value);
    };
  
    return (
      <div className="relative max-w-2xl mx-auto">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-500 transition-colors duration-200" />
          <input
            type="text"
            placeholder="ค้นหารายการอาหาร..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-all duration-300 text-lg bg-white shadow-lg hover:shadow-xl focus:shadow-2xl"
          />
        </div>
      </div>
    );
  };
  
  export default SearchBar