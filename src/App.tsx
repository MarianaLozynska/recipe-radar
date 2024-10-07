import Header from "./components/Header";
import { AUTHOR, QUOTE } from "./constants/quotes";
import BackgroundSection from "./components/BackgroundSection";
import { useState } from "react";
import RecipeDetails from "./components/RecipeDetails";

const App: React.FC = () => {
  const [recipeId, setRecipeId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectRecipe = (recipeId: number) => {
    setRecipeId(recipeId);
    setIsOpen(true);
  };
  const handleCloseDetails = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header selectedRecipe={handleSelectRecipe} />
      <BackgroundSection>
        {isOpen ? (
          <RecipeDetails
            recipeId={recipeId}
            closeDetails={handleCloseDetails}
          />
        ) : (
          <div className="text-center mx-4 max-w-3xl mt-8">
            <p className="quote-text">{QUOTE}</p>
            <p className="author-text">{AUTHOR}</p>
          </div>
        )}
      </BackgroundSection>
    </div>
  );
};

export default App;

// To Do
// 1. Create a new component called RecipeDetails.tsx in the components folder.
// 2. Add placeholder images to main page and each recipe.
// 3. Import the RecipeDetails component into App.tsx.
// 4. Render the RecipeDetails component in App.tsx.
// 5. Add service worker to the app.
// 6. Style the components.
// 7. Add tests to the app.
// 8. Add a README.md file to the app.
// 9. Add search functionality to the app.
// 10. Add filter functionality to the app.
// 11. Add save my favorites functionality to the app.
