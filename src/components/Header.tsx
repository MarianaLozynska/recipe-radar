import DropdownList from "./DropDownList";

const Header: React.FC = () => {
  const handleSelectRecipe = (recipeId: number) => {
    console.log(`Selected recipe ID: ${recipeId}`);
  };

  return (
    <header className="bg-amber-100 p-4 flex flex-col sm:flex-row justify-start border-b-2 border-amber-900 shadow-xl">
      <h1 className="text-amber-900 text-3xl underline mb-4 sm:mb-0">
        RecipeRadar
      </h1>
      <DropdownList onSelect={handleSelectRecipe} />
    </header>
  );
};

export default Header;
