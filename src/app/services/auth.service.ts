import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from 'src/interfaces/token.interface';
import * as CryptoJS from 'crypto-js';
import { ToastService } from './toast.service';
import { Registro, RegistroResponse } from 'src/interfaces/registro.interface';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private toastService: ToastService, private emailService: EmailService) { }



  isAuthenticated() {
    const token = this.getDecryptedToken();
    if (!token){
      return false;
    }else{
      return true;
    } 

    
  }
  register(registro: Registro): Observable<RegistroResponse> {
    return this.http.post<RegistroResponse>(`${environment.apiUrlBase}/auth/register`, registro).pipe(
      tap(res => {
        if (res.token) {
          this.toastService.showToast('Registro exitoso', 'success');
          this.storeEncryptedToken(res.token);
          localStorage.setItem('rol', res.role.name);
          this.emailService.sendEmail(registro.email).subscribe();
        }
      }),
      catchError(error => {
        this.toastService.showToast('Error en el registro', 'error');
        console.error('Registro error:', error);
        return of({} as RegistroResponse);
      })
    );
  }


  login(credentials: { email: string, password: string }): Observable<Token | any> {
    return this.http.post<Token>(`${environment.apiUrlBase}/auth/login`, credentials).pipe(
      tap(res => {
        console.log(res);
        console.log('role', res.result.roles[0].name)
        if (res.result.accessToken) {
          this.toastService.showToast( 'Bienvenido', 'success');
          this.storeEncryptedToken(res.result.accessToken);
         localStorage.setItem('role', res.result.roles[0].name);

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
