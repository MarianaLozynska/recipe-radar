import DropdownList from "./DropDownList";

const Header: React.FC = () => {
  return (
    <header className="bg-amber-100 p-4 flex justify-start border-b-2 border-amber-900 shadow-xl">
      <h1 className="text-amber-900 text-3xl underline">RecipeRadar</h1>
      <DropdownList />
    </header>
  );
};

export default Header;
