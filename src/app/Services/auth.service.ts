import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  isLoggedIn = new BehaviorSubject<boolean>(false);
  user: Observable<any | null> = this.isLoggedIn.asObservable();
  private currentUser: any;

  constructor(private http: HttpClient) {
    localStorage.getItem('isLoggedIn')
      ? this.isLoggedIn.next(true)
      : this.isLoggedIn.next(false);
  }
  setLogin(email: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', email);
    this.isLoggedIn.next(true);
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    this.isLoggedIn.next(false);
  }

  getCurrentUserEmail() {
    const userEmail = localStorage.getItem('email');
    return userEmail ? userEmail : null;
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn.value;
  }
}
