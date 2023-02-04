import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin:boolean = false;
  username:string ='';
  password:string = '';
constructor(private router:Router,public authService:AuthService) {}


login(form: NgForm) {
  const credentials = {
    'username': form.value.username,
    'password':form.value.password
  }

  credentials.username = this.username;
  credentials.password = this.password;
  
  this.authService.Login(credentials)
  .subscribe((response: { token: any; }) => {
    
    const token = (<any>response.token);
    this.invalidLogin = true;
    localStorage.setItem("jwt",token);
    this.invalidLogin = false;
    this.router.navigate(["/home"]);
  }, (err: any) => {
    console.log(err, " line 44");
    this.invalidLogin = true;
    console.log("invalid login")

    
  })
 }
}
