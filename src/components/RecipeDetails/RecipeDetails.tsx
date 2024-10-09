import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Recipe, RecipeDetailsProps } from "./types";
import "./RecipeDetails.css";
import { getKeyInformation } from "./getKeyInformation";

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

  const keyInformation = recipe ? getKeyInformation(recipe) : null;

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
    <div className="containerStyle">
      {!loading && !error && recipe && (
        <div className="cardStyle" data-testid="recipe-details">
          {/* Close Button */}
          <button onClick={closeDetails} className="closeButtonStyle">
            <IoIosClose className="h-6 w-6" />
          </button>

          {/* Recipe Name */}
          <h1 className="recipeNameStyle">{recipe.name}</h1>

          {/* Key Information */}
          {keyInformation && (
            <div className="keyInfoStyle">
              <div className="flex flex-wrap justify-between text-sm font-medium">
                {keyInformation.map((item, index) => (
                  <div key={index} className="infoItemStyle">
                    <strong className="text-gray-900 block">
                      {item.label}
                    </strong>
                    <span className={index !== 0 ? "mt-4" : "mt-2"}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image and Ingredients */}
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div className="recipeImgContainer">
              <img src={recipe.image} alt={recipe.name} className="recipeImg" />
            </div>
            {/* Ingredients List */}
            <div className="md:w-1/2">
              <h2 className="sectionHeadingStyle">Ingredients</h2>
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

          {/* Instructions */}
          <div className="pt-6 md:mt-0 pl-0 md:pl-10">
            <h2 className="sectionHeadingStyle">Instructions</h2>
            <ol className="list-decimal list-inside pl-4 mt-2 text-md text-gray-800 leading-relaxed">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="mb-1">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {/* Close Button */}
          <div className="text-center mt-6">
            <button
              className="buttonStyle"
              data-testid="close-button"
              onClick={closeDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
