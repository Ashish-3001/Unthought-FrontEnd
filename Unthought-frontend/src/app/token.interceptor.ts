import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const user = '1846b2aa521497244d79980e83cd6e07bfe4d546';
    //const user = '64bc2e8802bd9799d16e00de496b5e418787d332';
     const user = '14d9db934f6ab813b70e059695104da277c968d5';
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${user}`
        }
      });
    }
    return next.handle(request);
  }
}