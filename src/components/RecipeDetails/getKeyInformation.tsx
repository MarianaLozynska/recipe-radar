import { Recipe } from "./types";
import "./RecipeDetails.css";
import { FaNutritionix, FaHeart, FaClock } from "react-icons/fa";
import { PiChefHat } from "react-icons/pi";
import { TbToolsKitchen3 } from "react-icons/tb";

export const getKeyInformation = (recipe: Recipe) => [
  {
    label: <FaClock className="text-lg" />,
    value: (
      <div className="flex flex-col text-center">
        <span>{`Prep: ${recipe.prepTimeMinutes} mins`}</span>
        <span>{`Cook: ${recipe.cookTimeMinutes} mins`}</span>
      </div>
    ),
  },
  {
    label: <PiChefHat className="text-lg" />,
    value: recipe.difficulty,
  },
  {
    label: <TbToolsKitchen3 className="text-lg" />,
    value: `${recipe.servings} ${recipe.servings > 1 ? "people" : "person"}`,
  },
  {
    label: <FaNutritionix className="text-lg" />,
    value: `${recipe.caloriesPerServing} kcal`,
  },
  {
    label: <FaHeart className="text-lg" />,
    value: `${recipe.rating} (${recipe.reviewCount} reviews)`,
  },
];
