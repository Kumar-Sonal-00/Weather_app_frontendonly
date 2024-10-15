import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule, JsonPipe } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPopup = false;
  registeredData: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      // mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onRegister() {
    if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.userService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          this.registeredData = response;
          this.showPopup = true;
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.error('Error registering user', err);
        }
      });
    } else {
      alert('Registration Failed: Ensure all fields are filled and passwords match.');
    }
  }

  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/login']);
  }
}