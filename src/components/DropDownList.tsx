import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface Recipe {
  id: number;
  name: string;
}

interface DropdownProps {
  onSelect: (recipeId: number) => void;
}

const DropdownList: React.FC<DropdownProps> = ({ onSelect }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/recipes?select=name"
        );
        if (!response.ok) throw new Error("Failed to fetch recipe names");
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchRecipes();
  }, []);

  const handleSelect = (recipe: Recipe) => {
    setIsOpen(false);
    onSelect(recipe.id);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative w-full ml-0 lg:ml-auto lg:mr-20">
      <button
        onClick={toggleDropdown}
        className="flex items-center p-2 rounded-md text-gray-900 focus:outline-none font-bold"
      >
        Our Recipes
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-900 ml-2 transition-transform ease-in-out ${
            isOpen ? "rotate-180" : ""
          } font-bold text-lg`}
        />
      </button>

      {isOpen && (
        <ul
          className={`bg-gray-900 absolute z-10 mt-2 left-0 w-full lg:w-[800px] xl:w-[1050px] rounded-md shadow-lg max-h-[800px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4`}
        >
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => handleSelect(recipe)}
              className="hover:bg-amber-100 hover:text-amber-900 cursor-pointer text-sm p-2 text-amber-100 rounded-md font-bold"
            >
              {recipe.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownList;
