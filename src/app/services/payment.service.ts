import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { Payment, PaymentResult, PaymentResults } from 'src/interfaces/payment.interface';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private toastService: ToastService, private http: HttpClient) { }
  createPaymentIntent(payment: Payment): Observable<PaymentResult> {
     return this.http.post<PaymentResult>(`${environment.apiUrlBase}/payment-types`, payment).pipe(
      tap(() => this.toastService.showToast('Pago ingresado con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    )
  }
  getPayments(): Observable<PaymentResults> {
    return this.http.get<PaymentResults>(`${environment.apiUrlBase}/payment-types`).pipe(
      tap( ),
      catchError(error => {
        throw error;
      })
    )
  }
  getPayment(id: string): Observable<PaymentResult> {
    return this.http.get<PaymentResult>(`${environment.apiUrlBase}/payment-types/${id}`).pipe(
      tap(),
      catchError(error => {
        throw error;
      })
    )
  }
  updatePayment(payment: Payment): Observable<PaymentResult> {
    console.log('Enviando actualización de pago:', payment);
  
    return this.http.put<PaymentResult>(`${environment.apiUrlBase}/payment-types/${payment.id}`, payment).pipe(
      tap(() => this.toastService.showToast('Tipo de pago actualizado con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al actualizar el pago', 'error');
        console.error('Error en updatePayment:', error);
        throw error;
      })
    );
  }
  
  deletePayment(id: string): Observable<PaymentResult> {
    return this.http.delete<PaymentResult>(`${environment.apiUrlBase}/payment-types/${id}`).pipe(
      tap(() => this.toastService.showToast('Tipo de pago eliminado con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    )
  }

}
