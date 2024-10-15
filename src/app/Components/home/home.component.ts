import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}
  dataSource?: Subscription;
  isLoggedIn: boolean = false;
  userEmail: string | null = '';
  // Logic to handle redirection based on authentication
  navigateHome() {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/profile']); // Redirect to profile if logged in
    } else {
      this.router.navigate(['/home']); // Redirect to home if not logged in
    }
  }
  ngOnInit(): void {
    this.dataSource = this.authService.user.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.userEmail = this.authService.getCurrentUserEmail();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.unsubscribe();
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
