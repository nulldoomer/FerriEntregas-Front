import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Customer, CustomerResult, CustomerResults } from 'src/interfaces/customer.interface';
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
  getCustomerById(id: string): Observable<CustomerResult> {
    return this.http.get<CustomerResult>(`${environment.apiUrlBase}/customers/${id}`).pipe(
      tap(),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }
  createCustomer(customer: Customer): Observable<CustomerResult> {
    return this.http.post<CustomerResult>(`${environment.apiUrlBase}/customers`, customer).pipe(
      tap(() => this.toastService.showToast('Cliente ingresada con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }
  updateCustomer(customer: Customer): Observable<CustomerResult> {
    return this.http.put<CustomerResult>(`${environment.apiUrlBase}/customers/${customer.id}`, customer).pipe(
      tap(() => this.toastService.showToast('Cliente actualizado con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }
  deleteCustomer(id: string): Observable<CustomerResult> {
    return this.http.delete<CustomerResult>(`${environment.apiUrlBase}/customers/${id}`).pipe(
      tap(() => this.toastService.showToast('Cliente eliminado con éxito', 'success')),
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
