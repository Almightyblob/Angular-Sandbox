import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      "Test Recipe",
      "just a test",
      "https://rasamalaysia.com/wp-content/uploads/2018/04/beef-rendang.jpg"
    ),
    new Recipe(
      "Test Recipe",
      "just a test",
      "https://rasamalaysia.com/wp-content/uploads/2018/04/beef-rendang.jpg"
    )
  ];

  constructor() {}

  ngOnInit(): void {}
}
