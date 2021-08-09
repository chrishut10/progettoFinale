import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class EpicInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string;

    let authReq: HttpRequest<any>  = req;
    if (this.authService.isLogged) {
        authReq = req.clone({ headers: req.headers.set("Authorization", 'Bearer ' + this.authService.currentUser.accessToken).set('X-TENANT-ID','fe_0221') });

      //  authReq = req.clone({ headers: req.headers.set("Authorization", 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYxNzc5OTgyMSwiZXhwIjoxNjE3ODg2MjIxfQ.h4AwEnWe35N9HektTWlV9vVo8LmiwbL5DhkL2OrZ_O5b0isFxH1JQinim9nPYKZCfZhmCOinHjup16BSAbTGxg') });

    }
    return next.handle(authReq).pipe(
      tap(
          event => {ok = event instanceof HttpResponse ? 'succeeded' : ''
        },
          error => { }
      ),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }),
      finalize(() => {

      })
    );
  }
}
