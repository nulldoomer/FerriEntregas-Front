import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InvoiceApiResponse } from 'src/interfaces/ordenes.interface';
import { environment } from 'src/environments/environment';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

 constructor(private toastService: ToastService,private http: HttpClient) { }
 
   getCustomers(page: number, pageSize: number, filter: string = ''):Observable<InvoiceApiResponse> {
     const offset = (page - 1) * pageSize;
     let params = new HttpParams()
       .set('offset', offset.toString())
       .set('limit', pageSize.toString());
 
     if (filter) {
       params = params.set('search', filter);
     }
 
     return this.http.get<InvoiceApiResponse>(`${environment.apiUrlBase}/customers`, { params }).pipe(
       tap(),
       catchError(error => {
         this.toastService.showToast('Error al realizar el pago', 'error');
         throw error;
       })
     );
   }
}
