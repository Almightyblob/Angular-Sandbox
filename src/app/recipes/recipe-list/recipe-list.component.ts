import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

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
    )
  ];

  constructor() {}

  ngOnInit(): void {}
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
