import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from 'src/interfaces/token.interface';
import * as CryptoJS from 'crypto-js';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(credentials: { email: string; password: string; firstNames: string; lastNames: string; }): Observable<any> {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private toastService: ToastService) { }

  login(credentials: { email: string, password: string }): Observable<Token | any> {
    return this.http.post<Token>(`${environment.apiUrlBase}/auth/login`, credentials).pipe(
      tap(res => {
        if (res.token) {
          this.toastService.showToast( 'Bienvenido', 'success');
          this.storeEncryptedToken(res.token);
        }
      }),
      catchError(error => {
        this.toastService.showToast( 'Error en el inicio de sesión', 'error');
        console.error('Login error:', error);
        return error
      })
    );
  }

  private storeEncryptedToken(token: string): void {
    const encryptedToken = CryptoJS.AES.encrypt(token, environment.secretKey).toString();
    localStorage.setItem('authToken', encryptedToken);
  }

  getDecryptedToken(): string | null {
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

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
