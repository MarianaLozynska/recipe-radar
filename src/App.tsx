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

// 8. Add a README.md file to the app.
// 9. Add search functionality to the app.
// 10. Add filter functionality to the app.
// 11. Add save my favorites functionality to the app.
