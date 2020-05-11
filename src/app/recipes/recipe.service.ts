import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService) {}

  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      "Rendang",
      "Awesome Stuff",
      "https://rasamalaysia.com/wp-content/uploads/2018/04/beef-rendang.jpg",
      [new Ingredient("Meat", 1), new Ingredient("Rendang Sauce", 1)]
    ),

    new Recipe(
      "Babi Ketjap",
      "Npm nom",
      "https://www.dewereldkeukenthuis.com/wp-content/uploads/2015/06/Babi-ketjap-600x900.jpg",
      [new Ingredient("Babi", 1), new Ingredient("Ketjap", 1)]
    ),
  ];

  getRecipes() {
    return [...this.recipes];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
