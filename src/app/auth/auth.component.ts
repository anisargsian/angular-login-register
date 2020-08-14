import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AuthMode } from '../enums/auth-mode';
import { AuthUrl } from '../enums/auth-url';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authMode: AuthMode = AuthMode.Login;
  isLoading = false;
  error: string = null;
  authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  public get AuthMode(): {Login: string, Signup: string} {
    return AuthMode;
  }

  onSwitchMode(): void {
    this.authMode = this.authMode === AuthMode.Login ? AuthMode.Signup : AuthMode.Login;
  }

  onSubmit(): void {
    if (!this.authForm.valid) {
      return;
    }

    this.isLoading = true;

    const value = this.authForm.value;
    const url: string = this.authMode === AuthMode.Login ? AuthUrl.LoginUrl : AuthUrl.SignupUrl;
    this.authService.authenticate(value.email, value.password, url).subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.authForm.reset();
  }


  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

}
