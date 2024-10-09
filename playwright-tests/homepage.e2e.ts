import { test, expect } from "@playwright/test";

test("homepage has title and recipes", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Check if the title is correct
  await expect(page).toHaveTitle("Recipe Radar");

  // Check if the "Our Recipes" button is visible
  const recipesButton = page.locator('[data-testid="select-recipe-button"]');
  await expect(recipesButton).toBeVisible();

  // Simulate click on the "Our Recipes" button
  await recipesButton.click();

  // Verify if the recipe list is visible
  const recipeList = page.locator('[data-testid="recipe-list"]');
  await expect(recipeList).toBeVisible();
});
