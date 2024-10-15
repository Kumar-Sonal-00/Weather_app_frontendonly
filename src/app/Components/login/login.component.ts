import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: any = {
    phone: '',
    email:'',
    password: '',
    username:''
  };

  constructor(private router: Router, private userService:UserService,private authService:AuthService) {}

  onLogin() {
    this.userService.loginUser().subscribe({
      next: (users:any[]) => {
       const user=users.filter(x=>  x.email===this.loginObj.email && x.password===this.loginObj.password);
       if(user.length==1){
        this.authService.setLogin(this.loginObj.email);
        alert('Login Successful');
        this.router.navigateByUrl('/profile');
       }
       else{
        alert('User not found');
       }
      },
      error: (err) => {
        console.error('Error registering user', err);
        alert('An error occurred during login. Please try again later.');
      }
    });
  }
}