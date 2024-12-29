import DropDownList from '../DropDownList/DropDownList'
import './Header.css'
import favicon from '/src/assets/favicon.jpg'
interface HeaderProps {
  selectedRecipe: (recipeId: number) => void
}

const Header: React.FC<HeaderProps> = ({ selectedRecipe }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={favicon} alt="RecipeRadar Logo" className="header-logo img" />
        <h1 className="header-title">RecipeRadar</h1>
      </div>
      <DropDownList onSelect={selectedRecipe} />
    </header>
  )
}

export default Header
