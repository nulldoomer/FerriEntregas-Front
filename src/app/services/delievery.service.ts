import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { DelieveryStatus, DelieveryStatusResult, DelieveryStatusResults } from 'src/interfaces/delievery.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DelieveryService {

  constructor(private toastService: ToastService, private http: HttpClient) { }
  createDelieveryIntent(delievery: DelieveryStatus): Observable<DelieveryStatusResult> {
     return this.http.post<DelieveryStatusResult>(`${environment.apiUrlBase}/delivery-status`, delievery).pipe(
      tap(() => this.toastService.showToast('Estado ingresada con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al realizar la entrega', 'error');
        throw error;
      })
    )
  }
  getDelieveryIntents(): Observable<DelieveryStatusResults> {
    return this.http.get<DelieveryStatusResults>(`${environment.apiUrlBase}/delivery-status`).pipe(
      tap(),
      catchError(error => {
        this.toastService.showToast('Error al realizar la entrega', 'error');
        throw error;
      })
    )
  }
  updateDelieveryIntent(delievery: DelieveryStatus): Observable<DelieveryStatusResult> {
    return this.http.put<DelieveryStatusResult>(`${environment.apiUrlBase}/delivery-status/${delievery.id}`, delievery).pipe(
      tap(() => this.toastService.showToast('Estado ingresada con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al realizar la entrega', 'error');
        throw error;
      })
    )
  }
  deleteDelieveryIntent(id: string): Observable<DelieveryStatusResult> {
    return this.http.delete<DelieveryStatusResult>(`${environment.apiUrlBase}/delivery-status/${id}`).pipe(
      tap(() => this.toastService.showToast('Estado ingresada con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al realizar la entrega', 'error');
        throw error;
      })
    )
  }

  getDelieveryIntent(id: string): Observable<DelieveryStatusResult> {
    return this.http.get<DelieveryStatusResult>(`${environment.apiUrlBase}/delivery-status/${id}`).pipe(
      tap(),
      catchError(error => {
        this.toastService.showToast('Error al realizar la entrega', 'error');
        throw error;
      })
    )
  }




}
