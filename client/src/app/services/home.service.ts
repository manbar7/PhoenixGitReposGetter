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
export class HomeService { 
    private _baseUrl = environment.API;
    params2: any   = new URLSearchParams();
    
    constructor(private http: HttpClient,private requestHandler: RequestHandlerService) { }


   getSearchQuery() :any {
    return this.http.get<any[]>(`${this._baseUrl}GitSearch`,{headers: new HttpHeaders({
        'Content-Type': 'application/json',
 'Access-Control-Allow-Origin': '*'
    })})
   }

   GetResults(searchValue:string,pageIndexString:string) :Observable <any> {
    var bodyString = searchValue+"&page="+pageIndexString;
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const body=JSON.stringify(bodyString);
    const options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
    } 
   
    return this.http.post<any>(`${this._baseUrl}GitSearch`,body,{headers: new HttpHeaders({
        'content-type': 'application/json',
 'Access-Control-Allow-Origin': '*'
    })}).pipe(
        map((response: any) => response),
        tap()
       
        )
    // .pipe(
    //     catchError(this.handleError('get results', searchValue))
    //   );
   }


    handleError(arg0: string, searchValue: any): (err: any, caught: Observable<any[]>) => import("rxjs").ObservableInput<any> {
        throw new Error(arg0, searchValue);
    }

   
   getSearchQuery2() :any{
    return this.http.post<any>('GitSearch',{headers: new HttpHeaders({
        'content-type': 'application/json',
 'Access-Control-Allow-Origin': '*'
    })});
  }
}
