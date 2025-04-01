import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, tap } from 'rxjs';
import { OrdenesListResponse, OrdenesRequest, OrdenesResponse, OrdenesResult } from 'src/interfaces/ordenes.interface';

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
   createCustomer(orden: OrdenesRequest): Observable<OrdenesResponse> {
     return this.http.post<OrdenesResponse>(`${environment.apiUrlBase}/deliveries`, orden).pipe(
       tap(),
       catchError(error => {
         this.toastService.showToast('Error al realizar el pago', 'error');
         throw error;
       })
     );
   }
   updateCustomer(orden: OrdenesRequest): Observable<OrdenesResponse> {
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
  //  /api/v1/deliveries/create-first
   getDataFist(){

    return this.http.get<OrdenesResponse>(`${environment.apiUrlBase}/deliveries/create-first`).pipe(
      tap(),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );


   }
}
