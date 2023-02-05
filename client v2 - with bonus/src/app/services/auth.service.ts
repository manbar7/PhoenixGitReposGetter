import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { RequestHandlerService } from './request-handler.service';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set( 'Access-Control-Allow-Origin', '*')

  @Injectable()
  export class AuthService{
    private _baseUrl = environment.API;
    constructor(private http:HttpClient){} 


   Login(credentials:any) :any{
    return this.http.post<any>(`${this._baseUrl}api/auth/login`,credentials)
    .pipe(
        map((response: any) => response),
        tap()
       
        )
    .pipe(
        catchError(this.handleError("error"))
      );
  }
      handleError(arg0: string): any {
          console.log(arg0)
      }
  }