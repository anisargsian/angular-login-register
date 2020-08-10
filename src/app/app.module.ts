import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule  } from '@angular/common/http' 

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'auth', component: AuthComponent},
      {path: '**', redirectTo: '/'}
    ]),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
