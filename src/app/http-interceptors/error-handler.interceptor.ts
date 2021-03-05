import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    const { error: errorBody } = errorResponse;
    console.log('error interceptor');
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
