import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root',
})
export class WeatherForcastService {
  private apiKey = 'f22c5bc01b9b98e59c8c6a9bb364100d';
  private geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
 
  // Array to hold favorite cities
  private favoriteCities: string[] = [];
 
  constructor(private http: HttpClient) {}
 
  // Methods to manage favorite cities
  addCityToFavorites(city: string): void {
    if (!this.favoriteCities.includes(city)) {
      this.favoriteCities.push(city);
    }
  }
  setCity(cities: string[]): void {
    this.favoriteCities = cities;
  }
 
  // Get city coordinates using Geocoding API
  getCityCoordinates(city: string): Observable<any> {
    const url = `${this.geocodeUrl}?q=${city}&limit=1&appid=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          return { lat, lon };
        } else {
          throw new Error('City not found');
        }
      }),
      catchError((error) => {
        console.error('City not found', error);
        return throwError(() => new Error('City not found'));
      })
    );
  }
 
  // Get weather data using the Weather API
  getWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.weatherUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((data: any) => ({
        cityName: data.name,
        weatherDescription: data.weather[0].description,
        weatherIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
      })),
      catchError((error) => {
        console.error('Error fetching weather data', error);
        return throwError(() => new Error('Error fetching weather data'));
      })
    );
  }

  // Get weather by city name (combining both APIs)
  getWeatherByCity(city: string): Observable<any> {
    return this.getCityCoordinates(city).pipe(
      switchMap((coords) => this.getWeather(coords.lat, coords.lon)),
      catchError((error) => {
        console.error('Error getting weather by city', error);
        return throwError(() => new Error('Error getting weather by city'));
      })
    );
  }
}