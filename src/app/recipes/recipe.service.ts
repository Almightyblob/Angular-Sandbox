import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      "Test Recipe",
      "just a test",
      "https://rasamalaysia.com/wp-content/uploads/2018/04/beef-rendang.jpg"
    ),
    new Recipe(
      "Test Recipe 2",
      "just a test",
      "https://rasamalaysia.com/wp-content/uploads/2018/04/beef-rendang.jpg"
    ),
  ];

  getRecipes() {
    return [...this.recipes];
  }
}
