import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, concat, throwError, EMPTY } from 'rxjs';
import { filter, take, map, tap, catchError } from 'rxjs/operators';
import { LoginRequest } from './login-page/login-request.model';
import { RegisterRequest } from './register-page/register-request.model';
import { LocalStorageService } from '../shared/local-storage.service';
import { UserService } from '../account/user.service';
import { User } from '../account/user';

@Injectable({
  providedIn: 'root', // it is a singleton
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private lsService: LocalStorageService,
    private userService: UserService
  ) {}

  login(formData: LoginRequest): Observable<HttpResponse<any>> {
    // TODO: add base URL in interceptor?
    return this.http
      .post('http://localhost:8090/login', formData, { observe: 'response' })
      .pipe(catchError(this.handleError), tap(this.handleSuccesfulLogin));
  }

  register(formData: RegisterRequest): Observable<HttpResponse<any>> {
    // TODO: add base URL in interceptor?
    return this.http
      .post('http://localhost:8090/api/v1/auth/register', formData, { observe: 'response' })
      .pipe(
        catchError(this.handleError),
        tap((resp: HttpResponse<any>) => {
          this.lsService.setEmailToBeConfirmed(formData.email);
          this.router.navigate(['/confirm-email']);
        })
      );
  }

  confirmEmail(token: string): Observable<HttpResponse<any>> {
    return this.http
      .post('http://localhost:8090/api/v1/auth/confirm', { token }, { observe: 'response' })
      .pipe(
        catchError(this.handleError),
        tap(this.handleSuccesfulLogin),
        tap(() => {
          this.lsService.removeEmailToBeConfirmed();
        })
      );
  }

  getEmailToBeConfirmed(): string | null {
    return this.lsService.getEmailToBeConfirmed();
  }

  isAuthenticated(): Observable<boolean> {
    return this.getUser().pipe(map((u) => !!u));
  }

  private handleSuccesfulLogin = (resp: HttpResponse<any>) => {
    const authData = resp.headers.get('authorization');
    this.lsService.setAuthHeader(authData || '');
    this.router.navigate(['/']);
  };

  private getUser() {
    return concat(
      this.userSubject.pipe(
        take(1),
        filter((u) => !!u)
      ),
      this.userService.loadUser().pipe(
        catchError((error) => {
          this.userSubject.next(null);
          // do not rethrow error
          return EMPTY;
        }),
        filter((u: User) => !!u),
        tap((u: User) => this.userSubject.next(u))
      ),
      this.userSubject.asObservable()
    );
  }

  // TODO:  global error handler (interceptor?)
  private handleError(errorResponse: HttpErrorResponse) {
    const { error: errorBody } = errorResponse;
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
    return throwError({ message: 'Something bad happened; please try again later.', errors: [] });
  }
}
