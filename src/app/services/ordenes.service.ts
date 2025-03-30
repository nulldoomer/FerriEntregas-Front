import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, tap } from 'rxjs';
import { OrdenesListResponse, OrdenesResponse, OrdenesResult } from 'src/interfaces/ordenes.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

 constructor(private toastService: ToastService,private http: HttpClient) { }
 
   getCustomers(page: number, pageSize: number, filter: string = ''):Observable<OrdenesListResponse> {
     const offset = (page - 1) * pageSize;
     let params = new HttpParams()
       .set('offset', offset.toString())
       .set('limit', pageSize.toString());
 
     if (filter) {
       params = params.set('search', filter);
     }
 
     return this.http.get<OrdenesListResponse>(`${environment.apiUrlBase}/deliveries`, { params }).pipe(
       tap(),
       catchError(error => {
         this.toastService.showToast('Error al realizar el pago', 'error');
         throw error;
       })
     );
   }
   getCustomerById(id: string): Observable<OrdenesResponse> {
     return this.http.get<OrdenesResponse>(`${environment.apiUrlBase}/deliveries/${id}`).pipe(
       tap(),
       catchError(error => {
         this.toastService.showToast('Error al realizar el pago', 'error');
         throw error;
       })
     );
   }
   createCustomer(customer: any): Observable<OrdenesResponse> {
     return this.http.post<OrdenesResponse>(`${environment.apiUrlBase}/deliveries`, customer).pipe(
       tap(),
       catchError(error => {
         this.toastService.showToast('Error al realizar el pago', 'error');
         throw error;
       })
     );
   }
   updateCustomer(orden: OrdenesResult): Observable<OrdenesResponse> {
     return this.http.put<OrdenesResponse>(`${environment.apiUrlBase}/deliveries/${orden.id}`, orden).pipe(
       tap(),
       catchError(error => {
         this.toastService.showToast('Error al realizar el pago', 'error');
         throw error;
       })
     );
   }
   deleteCustomer(id: string): Observable<OrdenesResponse> {
     return this.http.delete<OrdenesResponse>(`${environment.apiUrlBase}/deliveries/${id}`).pipe(
       tap(),
       catchError(error => {
         this.toastService.showToast('Error al realizar el pago', 'error');
         throw error;
       })
     );
   }
}
