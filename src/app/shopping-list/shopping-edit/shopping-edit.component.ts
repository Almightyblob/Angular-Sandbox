import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor() {}

  ngOnInit(): void {}

  onAdd(nameInput: string, amountInput: number) {
    const newIngredient = new Ingredient(nameInput, amountInput);
    this.ingredientAdded.emit(newIngredient);
  }
}
