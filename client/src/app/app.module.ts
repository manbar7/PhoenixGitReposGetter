import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; 
import { ROUTES } from './app.router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HomeService } from './services/home.service';
import { AuthService } from './services/auth.service';
import { RequestHandlerService } from './services/request-handler.service';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guard/auth-guard.service';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:tokenGetter,
        allowedDomains: ["localhost:7222"],
        disallowedRoutes: []
      }
    })
  ],
  exports: [RouterModule],
  providers: [HomeService,RequestHandlerService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
