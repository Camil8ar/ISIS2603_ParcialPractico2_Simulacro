import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipeId!: string;
  @Input() recipe!: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRecipe(+id);
    }
  }

    getRecipe(id: number): void {
    this.recipeService.getRecipe(this.recipeId).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        console.log('Detalle de receta:', this.recipe);
      }
    });
  }

  getMostUsedIngredient(): string {
    if (!this.recipe?.ingredientes || this.recipe.ingredientes.length === 0) {
      return 'No hay ingredientes';
    }

    let maxIngredient = this.recipe.ingredientes[0];
    for (const ingredient of this.recipe.ingredientes) {
      const currentAmount = this.extractNumber(ingredient.cantidad);
      const maxAmount = this.extractNumber(maxIngredient.cantidad);
      
      if (currentAmount > maxAmount) {
        maxIngredient = ingredient;
      }
    }
    
    return maxIngredient.nombre;
  }

  private extractNumber(cantidad: string): number {
    const match = cantidad.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
