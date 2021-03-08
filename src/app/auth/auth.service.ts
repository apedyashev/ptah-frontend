import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, concat, EMPTY } from 'rxjs';
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
    return (
      this.http
        // TODO: move under v1/api on backend and then remove base url from here
        .post('http://localhost:8090/login', formData, { observe: 'response' })
        .pipe(tap(this.handleSuccesfulLogin))
    );
  }

  register(formData: RegisterRequest): Observable<HttpResponse<any>> {
    return this.http.post('auth/register', formData, { observe: 'response' }).pipe(
      tap((resp: HttpResponse<any>) => {
        this.lsService.setEmailToBeConfirmed(formData.email);
        this.router.navigate(['/confirm-email']);
      })
    );
  }

  confirmEmail(token: string): Observable<HttpResponse<any>> {
    return this.http.post('auth/confirm', { token }, { observe: 'response' }).pipe(
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
}
