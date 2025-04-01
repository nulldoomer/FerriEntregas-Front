import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Petición interceptada:', req);
    
    const token = this.getDecryptedToken();

    if (!token) {
      // console.warn('No hay token disponible, la petición se envía sin autenticación.');
      return next.handle(req);
    }

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // console.log('Intercepted request with token:', clonedRequest);
    return next.handle(clonedRequest);
  }

  private getDecryptedToken(): string | null {
    const encryptedToken = localStorage.getItem('authToken');
    if (!encryptedToken) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, environment.secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error decrypting token:', error);
      return null;
    }
  }
}
