import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,  HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'; 
import {  throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {LoginRequest} from './login-page/login-request.model'

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(formData: LoginRequest) {
    // TODO: add base URL in interceptor?
    return this.http.post('http://localhost:8090/login', formData, { observe: 'response' }).pipe(
      catchError(this.handleError),
      tap((resp: HttpResponse<any>) => {
        const authData = resp.headers.get('authorization')
        localStorage.setItem('auth', authData || '');
        this.router.navigate(['/']); 
      })
    )
  }

  // TODO:  get the server error message from the response once it's implemented in API
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
