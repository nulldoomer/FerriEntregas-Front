import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(
    private toastService: ToastService,
    private http: HttpClient
  ) {}

  enviarImagen(archivo: File,): Observable<any> {
    const formData = new FormData();
    formData.append('files', archivo, archivo.name); 
    formData.append('folderName', 'ferrientregas'); // nuevo parámetro


    return this.http.post(`${environment.apiUrlBase}/image/upload`, formData).pipe(
      tap(() => this.toastService.showToast('Imagen subida con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al subir la imagen', 'error');
        return throwError(() => error);
      })
    );
  }
  detectarTexto(archivo: File,): Observable<any> {
    const formData = new FormData();
    formData.append('file', archivo, archivo.name); 
    return this.http.post(`http://127.0.0.1:8000/extract_text`, formData).pipe(
      tap(() => this.toastService.showToast('Imagen detectaada con exito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al subir la imagen', 'error');
        return throwError(() => error);
      })
    );
  }
}
