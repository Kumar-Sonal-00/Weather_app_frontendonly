import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { AuthService } from '../../Services/auth.service';
import { FavouriteService } from '../../Services/favourite.service';
import { WeatherForcastService } from '../../Services/weather-forcast.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-weather-forcasting',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,
    HeaderComponent,
  ],
  templateUrl: './weather-forcasting.component.html',
  styleUrl: './weather-forcasting.component.css',
})
export class WeatherForcastingComponent implements OnInit, OnDestroy{
  weatherData$: Observable<any> = of([]);
  error: string | null = null;
  // city = 'London';
  searchedCity: string = '';
  @Input() city: string = 'Pune';
  @Input() callingFromParent: boolean = false;
  dataSource?: Subscription;
  isLoggedIn: boolean = false;
  email: string | null = '';
  constructor(
    private weatherService: WeatherForcastService,
    private favoritesService: FavouriteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.fetchWeather();
    this.dataSource = this.authService.user.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.email = this.authService.getCurrentUserEmail();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.unsubscribe();
    }
  }

  fetchWeather(): void {
    this.weatherData$ = this.weatherService.getWeatherByCity(this.city).pipe(
      catchError((error) => {
        this.error = 'City not found';
        this.snackBar.open(this.error, 'Close', { duration: 3000 });
        return of(null);
      })
    );
  }

  searchWeather(): void {
    if (this.searchedCity.trim()) {
      this.city = this.searchedCity;
      this.fetchWeather();
    }
  }

  refreshWeather(): void {
    this.fetchWeather();
  }
  addToFavorites(city: string): void {
    if (this.isLoggedIn && this.email) {
      this.favoritesService.addToFavorites(city, this.email);
      this.snackBar.open(`${city} added to favorites!`, 'Close', {
        duration: 3000,
      });
    } else {
      alert('Login first');
      // this.router.navigate(["login"])
    }
  }
}
