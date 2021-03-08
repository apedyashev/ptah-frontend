import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// TODO: config
const BASE_URL = 'http://localhost:8090/api';
const API_VERSION = 'v1';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiRequest = request.clone({ url: this.buildUrl(request.url) });
    return next.handle(apiRequest);
  }

  private buildUrl(endpoint: string) {
    return /^http(s)?:\/\//.test(endpoint.replace(/\/$/, ''))
      ? endpoint
      : `${BASE_URL}/${API_VERSION}/${endpoint.replace(/^\//, '')}`;
  }
}
