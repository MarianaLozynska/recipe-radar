import DropdownList from "./DropDownList";

interface HeaderProps {
  selectedRecipe: (recipeId: number) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedRecipe }) => {
  return (
    <header className="bg-amber-100 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-start border-b-2 border-amber-900 shadow-xl">
      <div className="flex items-center mb-4 sm:mb-0 border rounded-md border-gray-900 mr-4">
        <img
          src="src/assets/favicon.jpg"
          alt="RecipeRadar Logo"
          className="w-6 h-6 sm:w-10 sm:h-10 rounded-md mr-1"
        />
        <h1 className="text-gray-900 text-sm sm:text-lg underline font-bold sm:pr-8 pr-0 pb-1 mr-4">
          RecipeRadar
        </h1>
      </div>
      <DropdownList onSelect={selectedRecipe} />
    </header>
  );
};

export default Header;
