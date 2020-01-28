import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.token.pipe(
      take(1),
      exhaustMap(token => {
        if (!token) {
          return next.handle(req);
        }
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token.access_token
        });
        const modifiedReq = req.clone({headers: headers})
        console.log(modifiedReq);
        return next.handle(modifiedReq);
      })
    )
  }
}