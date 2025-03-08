import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from 'src/interfaces/token.interface';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrlBase}/auth/login`, credentials).pipe(
      tap(res => {
        if (res.token) {
          this.storeEncryptedToken(res.token);
        }
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
