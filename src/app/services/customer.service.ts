import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { CustomerResults } from 'src/interfaces/customer.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private toastService: ToastService,private http: HttpClient) { }

  getCustomers(page: number, pageSize: number, filter: string = ''):Observable<CustomerResults> {
    const offset = (page - 1) * pageSize;
    let params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', pageSize.toString());

    if (filter) {
      params = params.set('search', filter);
    }

    return this.http.get<CustomerResults>(`${environment.apiUrlBase}/customers`, { params }).pipe(
      tap(),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }
    // getPayments(): Observable<PaymentResults> {
    //   return this.http.get<PaymentResults>(`${environment.apiUrlBase}/payment-types`).pipe(
    //     tap( ),
    //     catchError(error => {
    //       throw error;
    //     })
    //   )
    // }
}
