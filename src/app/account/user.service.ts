import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  loadUser(): Observable<User> {
    return this.http
      .get('users/me', {
        observe: 'response',
      })
      .pipe(map((resp) => resp.body as User));
  }
}
