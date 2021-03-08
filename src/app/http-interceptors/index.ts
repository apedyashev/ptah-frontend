import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { BaseUrlInterceptor } from './base-url.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
];
