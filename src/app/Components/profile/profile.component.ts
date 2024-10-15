import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
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
