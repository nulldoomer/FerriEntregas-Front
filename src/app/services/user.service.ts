import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Customer, CustomerResult, CustomerResults } from 'src/interfaces/customer.interface';
import { environment } from 'src/environments/environment';
import { ApiUserResponse, ApiUserResponseOne, User } from 'src/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor(private toastService: ToastService,private http: HttpClient) { }

  getusers(page: number, pageSize: number, filter: string = ''):Observable<ApiUserResponse> {
    const offset = (page - 1) * pageSize;
    let params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', pageSize.toString());

    if (filter) {
      params = params.set('search', filter);
    }

    return this.http.get<ApiUserResponse>(`${environment.apiUrlBase}/users`, { params }).pipe(
      tap(),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }
  getuserById(id: string): Observable<ApiUserResponseOne> {
    return this.http.get<ApiUserResponseOne>(`${environment.apiUrlBase}/users/${id}`).pipe(
      tap(),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }
  createuser(user: User): Observable<ApiUserResponseOne> {
    return this.http.post<ApiUserResponseOne>(`${environment.apiUrlBase}/users`, user).pipe(
      tap(() => this.toastService.showToast('Usuario ingresada con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }
  updateuser(user: User): Observable<ApiUserResponseOne> {
    return this.http.put<ApiUserResponseOne>(`${environment.apiUrlBase}/users/${user.id}`, user).pipe(
      tap(() => this.toastService.showToast('Usuario actualizado con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }
  deleteuser(id: string): Observable<ApiUserResponseOne> {
    return this.http.delete<ApiUserResponseOne>(`${environment.apiUrlBase}/users/${id}`).pipe(
      tap(() => this.toastService.showToast('Usuario eliminado con éxito', 'success')),
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
