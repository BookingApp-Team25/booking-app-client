import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: any = localStorage.getItem('user');
    if (req.headers.get('skip')) return next.handle(req);
    
    if (accessToken) {
      console.log('Interceptor called for token:', req.url);
      console.log('Token: ',accessToken);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });
      console.log(cloned);
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
