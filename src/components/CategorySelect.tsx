import { getAllCategories } from '@/api/category';
import useFetch from '@/hooks/useFetch';
import React, { useState } from 'react';

interface CategorySelectProps {
  onCategoryChange?: (categoryId: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onCategoryChange }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data: CategoriesData, error: CategoriesError, loading: CategoriesLoading } = useFetch(getAllCategories)

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCategory = (categoryId: string, categoryName: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName)
    setIsOpen(false);
    console.log('Category name selected:', categoryId);

    if (onCategoryChange) {
      onCategoryChange(categoryId); // Gọi hàm cha truyền xuống
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggleDropdown}
        className="w-full px-3 py-2 text-left bg-base-100 border rounded-md focus:outline-none focus:ring focus:ring-primary"
      >
        {selectedCategoryName ?? "Chọn danh mục"}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-base-100 border rounded-md shadow-lg">
          {CategoriesData?.map(item => (
            <button
              key={item.$id}
              onClick={() => handleSelectCategory(item.$id, item.name)}
              className="w-full text-left px-4 py-2 hover:bg-primary hover:text-primary-content"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
