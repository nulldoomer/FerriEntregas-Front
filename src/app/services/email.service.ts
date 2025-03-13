import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private toastService: ToastService, private http: HttpClient,) { }

  sendEmail(to: string): Observable<any> {
    const body = { 'to':to }
      return this.http.post<any>(`${environment.apiUrlBase}/email/send`, body).pipe(
        tap(res => {
            this.toastService.showToast( 'Codigo enviado a tu correo', 'success');
        }),
        catchError(error => {
          this.toastService.showToast( 'Error', 'error');
          return error
        })
      );
    }
  veryEmail(token: string): Observable<any> {
    const body = { 'token':token }
      return this.http.post<any>(`${environment.apiUrlBase}/user/email-verification`, body).pipe(
        tap(res => {
            this.toastService.showToast('Correo verificado', 'success');
        }),
        catchError(error => {
          this.toastService.showToast('Error', 'error');
          return error
        })
      );
    }
}
