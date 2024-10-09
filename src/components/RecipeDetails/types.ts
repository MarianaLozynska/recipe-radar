export interface RecipeDetailsProps {
  recipeId: number;
  closeDetails: () => void;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  caloriesPerServing: number;
  rating: number;
  reviewCount: number;
  image: string;
}
