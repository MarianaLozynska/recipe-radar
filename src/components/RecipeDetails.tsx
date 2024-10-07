import { useEffect, useState } from "react";
import { FaRegClock, FaNutritionix, FaHeart } from "react-icons/fa";
import { PiChefHat } from "react-icons/pi";
import { TbToolsKitchen3 } from "react-icons/tb";

interface RecipeDetailsProps {
  recipeId: number;
  closeDetails: () => void;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  caloriesPerServing: number;
  rating: number;
  reviewCount: number;
  image: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  recipeId,
  closeDetails,
}) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/recipes/${recipeId}`
        );
        if (!response.ok) throw new Error("Failed to fetch recipe details");
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) fetchRecipeDetails();
  }, [recipeId]);

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }

  const keyInformation = [
    {
      label: <FaRegClock className="text-lg" />,
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

  const containerStyle =
    "w-full backdrop-blur-sm bg-black/20 p-8 flex flex-col gap-4 h-full";
  const cardStyle =
    "p-6 rounded-lg shadow-lg max-w-4xl mx-auto transition-colors bg-amber-50";
  const keyInfoStyle =
    "px-4 py-2 rounded-lg shadow-md max-w-4xl mx-auto transition-colors bg-amber-50 hover:bg-amber-100";
  const infoItemStyle =
    "flex flex-col items-center p-1 bg-transparent space-x-0 text-amber-700 block text-center";

  return (
    <div className={containerStyle}>
      <h1 className="text-4xl text-center font-extrabold text-amber-100 p-2">
        {recipe.name}
      </h1>

      <div className={cardStyle}>
        <div className={keyInfoStyle}>
          <div className="flex flex-wrap justify-between text-sm font-medium">
            {keyInformation.map((item, index) => (
              <div key={index} className={infoItemStyle}>
                <strong className="text-amber-900 block">{item.label}</strong>
                <span className={index !== 0 ? "mt-2" : ""}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex justify-center items-center md:w-1/2 h-full">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="rounded-md shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.4)] transition-shadow duration-500 ease-in-out"
              style={{
                width: "80%",
                height: "80%",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>

          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-amber-800 border-b-2 border-amber-800 pb-2">
              Ingredients
            </h2>
            <ul
              className={`list-disc list-inside pl-4 mt-2 text-gray-800 leading-relaxed text-md ${
                recipe.ingredients.length > 10 ? "grid grid-cols-2 gap-2" : ""
              }`}
            >
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 md:mt-0 pl-0 md:pl-10">
          <h2 className="text-2xl font-semibold text-amber-900 border-b-2 border-amber-800 pb-2">
            Instructions
          </h2>
          <ol className="list-decimal list-inside pl-4 mt-2 text-md text-gray-800 leading-relaxed">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="mb-1">
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center mt-6">
          <button
            className="w-32 text-amber-50 bg-amber-800 p-2 rounded-md border-2 border-transparent hover:bg-amber-100 hover:text-amber-800 hover:border-amber-800 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-800 focus:ring-offset-2"
            onClick={closeDetails}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
