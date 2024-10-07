import DropdownList from "./DropDownList";

interface HeaderProps {
  selectedRecipe: (recipeId: number) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedRecipe }) => {
  return (
    <header className="bg-amber-100 p-4 flex flex-col sm:flex-row justify-start border-b-2 border-amber-900 shadow-xl">
      <h1 className="text-amber-900 text-3xl underline mb-4 sm:mb-0 font-bold">
        RecipeRadar
      </h1>
      <DropdownList onSelect={selectedRecipe} />
    </header>
  );
};

export default Header;
