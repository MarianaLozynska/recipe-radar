import React, { useState, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import './DropDownList.css'

interface Recipe {
  id: number
  name: string
}

interface DropdownProps {
  onSelect: (recipeId: number) => void
}

const DropDownList: React.FC<DropdownProps> = ({ onSelect }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          'https://dummyjson.com/recipes?select=name'
        )
        if (!response.ok) throw new Error('Failed to fetch recipe names')
        const data = await response.json()
        setRecipes(data.recipes)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  const toggleDropdown = () => setIsOpen((prev) => !prev)

  const handleSelect = (recipe: Recipe) => {
    onSelect(recipe.id)
    setIsOpen(false)
  }

  if (loading) {
    return (
      <div className="mt-10 flex justify-center">
        <div className="loadingSpinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="bg-amber-100 border border-gray-800 text-gray-800 px-8 py-6 rounded relative max-w-lg mx-auto mt-20 flex justify-center items-center"
        role="alert"
      >
        <div>
          <p className="font-bold text-lg">Error: {error}</p>
          <p className="block mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dropdown-container">
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        className="dropdown-button"
        data-testid="select-recipe-button"
      >
        Our Recipes
        <ChevronDownIcon
          className={`chevron-icon ${isOpen ? 'chevron-rotate' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="dropdown-list" data-testid="recipe-list">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => handleSelect(recipe)}
              className="dropdown-item"
              data-testid="recipe-item"
            >
              {recipe.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropDownList
