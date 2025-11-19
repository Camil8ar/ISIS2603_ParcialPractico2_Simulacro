import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { Recipe } from './Recipe';

@Injectable({
  providedIn: 'root'  
})
export class RecipeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl + "recipe.json");
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.apiUrl + id + "/recipe.json");
  }
}