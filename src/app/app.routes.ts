import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { FavouriteComponent} from './Components/favourite/favourite.component';
import { WeatherForcastingComponent } from './Components/weather-forcasting/weather-forcasting.component';
import { authGuard } from './auth.guard';

// Define your application's routes
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'favorites',
    component: FavouriteComponent,
    canActivate: [authGuard],
  },
  { path: 'weather-forecast', component: WeatherForcastingComponent },
  { path: '**', redirectTo: '/home' },
];