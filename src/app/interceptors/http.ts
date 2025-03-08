import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }

    });
    console.log(clonedRequest);
    return next.handle(clonedRequest);
  }

  private getToken(): string {
    const token = this.authService.getDecryptedToken();
    if (token) {
      return token;
    }
    return localStorage.getItem('token') || '';
  }
}
