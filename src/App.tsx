import Header from "./components/Header/Header";
import { AUTHOR, QUOTE } from "./constants/quotes";
import BackgroundSection from "./components/BackgroundSection";
import { useState } from "react";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";

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
