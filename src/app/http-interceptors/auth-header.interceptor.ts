import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private lsService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.lsService.getAuthHeader();
    const authReq = request.clone({ setHeaders: { Authorization: authToken || '' } });
    return next.handle(authReq);
  }
}
