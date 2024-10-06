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
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleSelect = (recipe: Recipe) => {
    setIsOpen(false);
    onSelect(recipe.id);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dropdown-container">
      <button onClick={toggleDropdown} className="dropdown-button">
        Our Recipes
        <ChevronDownIcon
          className={`chevron-icon ${isOpen ? "chevron-icon-open" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="dropdown-list">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => handleSelect(recipe)}
              className="dropdown-list-item"
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
