import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
 
  constructor(private http: HttpClient) { }
  url:string="http://localhost:3000/favourites"
  addToFavorites(city: string,email:string) {
    this.http.get<any[]>(`${this.url}?city=${city}`).subscribe(favorites => {
      console.log(favorites);
      const cityExists = favorites.some(fav => fav.city === city);
      if (!cityExists) {
        const newFavorite = {
          city: city,
          email: email
        };
        this.http.post(this.url, newFavorite).subscribe(() => {
          alert(`${city} has been added to your favorites!`);
        }, error => {
          console.error("Error adding favorite: ", error);
        });
 
      } else {
        alert(`${city} is already in your favorites!`);
      }
    }, error => {
      console.error("Error fetching favorites: ", error);
    });
  }
 
  getFavorites(email:string): Observable<string[]> {
    return this.http.get<any[]>(`${this.url}?email=${email}`);
  }
 
  removeFromFavorites(city: string) {
    // First, find the favorite city to remove from the server
    this.http.get<any[]>(`${this.url}?city=${city}`).subscribe(favorites => {
      if (favorites.length > 0) {
        const favoriteId = favorites[0].id; // Assuming the first match has the required city
        // Now make a DELETE request to remove the city
        this.http.delete(`${this.url}/${favoriteId}`).subscribe(
          () => {
            alert(`${city} has been removed from favorites.`);
          },
          error => {
            alert(`Failed to remove ${city} from favorites: ${error.message}`);
          }
        );
      } else {
        alert(`${city} is not in your favorites!`);
      }
    }, error => {
      alert(`Failed to check if ${city} is in your favorites: ${error.message}`);
    });
  }
}