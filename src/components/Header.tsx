import DropdownList from "./DropDownList";

interface HeaderProps {
  selectedRecipe: (recipeId: number) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedRecipe }) => {
  return (
    <header className="bg-amber-100 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-start border-b-2 border-amber-900 shadow-xl">
      <div className="flex items-center mb-4 sm:mb-0">
        <img
          src="src/assets/favicon.jpg"
          alt="RecipeRadar Logo"
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-md mr-4"
        />
        <h1 className="text-gray-900 text-xl sm:text-3xl underline font-bold sm:pr-16 pb-1">
          RecipeRadar
        </h1>
      </div>
      <DropdownList onSelect={selectedRecipe} />
    </header>
  );
};

export default Header;
