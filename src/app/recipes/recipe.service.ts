import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  // recipes: Recipe[] = [
  //   new Recipe(
  //     "Rendang",
  //     "Awesome Stuff",
  //     "https://rasamalaysia.com/wp-content/uploads/2018/04/beef-rendang.jpg",
  //     [new Ingredient("Meat", 1), new Ingredient("Rendang Sauce", 1)]
  //   ),

  //   new Recipe(
  //     "Babi Ketjap",
  //     "Npm nom",
  //     "https://www.dewereldkeukenthuis.com/wp-content/uploads/2015/06/Babi-ketjap-600x900.jpg",
  //     [new Ingredient("Babi", 1), new Ingredient("Ketjap", 1)]
  //   ),
  // ];

  private recipes: Recipe[] = []

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next([... this.recipes])
  }

  getRecipes() {
    return [...this.recipes];
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next([... this.recipes])
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next([... this.recipes])
  }

  deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next([... this.recipes])
  }

  

}
