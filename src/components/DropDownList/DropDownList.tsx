import React, { useState, useEffect, useCallback } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import "./DropdownList.css";

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
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await fetch("https://dummyjson.com/recipes?select=name");
      if (!response.ok) throw new Error("Failed to fetch recipe names");
      const data = await response.json();
      setRecipes(data.recipes);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (recipe: Recipe) => {
    onSelect(recipe.id);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loadingSpinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="dropdown-container">
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        className="dropdown-button"
        data-testid="select-recipe-button"
      >
        Our Recipes
        <ChevronDownIcon
          className={`chevron-icon ${isOpen ? "chevron-rotate" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="dropdown-list" data-testid="recipe-list">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => handleSelect(recipe)}
              className="dropdown-item"
              data-testid="recipe-item"
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
