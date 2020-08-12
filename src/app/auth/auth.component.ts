import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';
import { AuthResponseData } from '../models/auth';
import { Observable } from 'rxjs';
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

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode(): void {
    this.authMode = this.authMode === AuthMode.Login ? AuthMode.Signup : AuthMode.Login;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    const value = form.value;
    let url: string;

    if (this.authMode === AuthMode.Login) {
      url = AuthUrl.LoginUrl;
    } else {
      url =  AuthUrl.SignupUrl;
    }

    const authObs: Observable<AuthResponseData> = this.authService.authenticate(value.email, value.password, url);
    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }


  ngOnInit(): void {
  }

}
