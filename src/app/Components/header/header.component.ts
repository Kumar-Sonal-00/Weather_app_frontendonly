import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit ,OnDestroy{
  dataSource?: Subscription;
  isLoggedIn: boolean = false;
  userEmail: string | null = '';

  constructor(private authService: AuthService, private router: Router) {
    this.userEmail = this.authService.getCurrentUserEmail(); // Fetch logged-in user's email
  }

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
