import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { recipeData } from '../recipeData';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: Array<Recipe> = [];
  selected: Boolean = false;
  selectedRecipe: Recipe | null = null;

constructor(private recipeService: RecipeService) { }

  getRecipes(){
    this.recipeService.getRecipes().subscribe({next: apiData => this.recipes = apiData })
  }
  
  ngOnInit() {
    this.recipes = recipeData;
  }

  onSelect(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.selected = true;
  }

  countIngredients(recipe: Recipe): number {
    return recipe.ingredientes ? recipe.ingredientes.length : 0;
  }
}
