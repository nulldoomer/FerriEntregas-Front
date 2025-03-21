import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private toastService: ToastService, private http: HttpClient) { }

  enviarImagen(archivo: File, descripcion: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', archivo, archivo.name); // 'file' es el nombre del campo que espera el backend
    formData.append('descripcion', descripcion); // Aquí puedes agregar otros campos si es necesario

    const headers = new HttpHeaders();

    return this.http.post(`${environment.apiUrlBase}/imagenes`, formData, { headers }).pipe(
      tap(() => this.toastService.showToast('Imagen subida con éxito', 'success')),
      catchError(error => {
        this.toastService.showToast('Error al subir la imagen', 'error');
        throw error;
      })
    );
  }
}
