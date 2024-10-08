import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";
import { QUOTE, AUTHOR } from "./constants/quotes";

describe("App Component", () => {
  it("renders the quote and author initially", () => {
    render(<App />);

    expect(screen.getByText(QUOTE)).toBeInTheDocument();
    expect(screen.getByText(AUTHOR)).toBeInTheDocument();
  });

  it("shows RecipeDetails when a recipe is selected", async () => {
    render(<App />);

    const selectRecipeButton = await screen.findByTestId(
      "select-recipe-button"
    );
    fireEvent.click(selectRecipeButton);

    expect(screen.getByTestId("recipe-list")).toBeInTheDocument();
  });

  it("hides RecipeDetails when closed", async () => {
    render(<App />);

    const selectRecipeButton = await screen.findByTestId(
      "select-recipe-button"
    );
    fireEvent.click(selectRecipeButton);

    expect(screen.getByTestId("recipe-list")).toBeInTheDocument();
    const recipeItems = screen.getAllByTestId("recipe-item");

    expect(recipeItems[0]).toHaveTextContent("Classic Margherita Pizza");
    fireEvent.click(recipeItems[0]);

    const recipeDetails = await screen.findByTestId("recipe-details");
    expect(recipeDetails).toBeInTheDocument();

    const closeButton = await screen.findByTestId("close-button");
    fireEvent.click(closeButton);

    expect(recipeDetails).not.toBeInTheDocument();
  });
});
