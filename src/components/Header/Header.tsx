import DropdownList from "../DropDownList/DropDownList";
import "./Header.css";

interface HeaderProps {
  selectedRecipe: (recipeId: number) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedRecipe }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <img
          src="src/assets/favicon.jpg"
          alt="RecipeRadar Logo"
          className="header-logo img"
        />
        <h1 className="header-title">RecipeRadar</h1>
      </div>
      <DropdownList onSelect={selectedRecipe} />
    </header>
  );
};

export default Header;
