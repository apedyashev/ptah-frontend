import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,  HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'; 
import {  Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {LoginRequest} from './login-page/login-request.model'
import {RegisterRequest} from './register-page/register-request.model'

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(formData: LoginRequest): Observable<HttpResponse<any>> {
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

  register(formData: RegisterRequest) { 
    // TODO: add base URL in interceptor?
    return this.http.post('http://localhost:8090/api/v1/auth/register', formData, { observe: 'response' }).pipe(
      catchError(this.handleError),
      tap((resp: HttpResponse<any>) => {
        this.router.navigate(['/login']); 
      })
    )
  }

  // TODO:  get the server error message from the response once it's implemented in API
  private handleError(errorResponse: HttpErrorResponse) {
    const {error: errorBody} = errorResponse;
    if (errorResponse instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', errorBody.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${errorResponse.status}, body was:`, errorBody);
      if (errorResponse.status === 422) {
        return throwError(errorBody);
      }
    }
    // Return an observable with a user-facing error message.
    return throwError({message: 'Something bad happened; please try again later.', errors: []});
  }
}
