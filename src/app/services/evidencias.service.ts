import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { evideceRequest, Evidencia, EvidenciasResponse } from 'src/interfaces/evidencias.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvidenciasService {

  constructor(private toastService: ToastService, private http: HttpClient) { }
  createEvidencia(evidencia: evideceRequest): Observable<EvidenciasResponse>{

    return this.http.post<EvidenciasResponse>(`${environment.apiUrlBase}/evidences`, evidencia);
  }
  getEvidencias(id:string): Observable<EvidenciasResponse[]>{
    return this.http.get<EvidenciasResponse[]>(`${environment.apiUrlBase}/evidence/${id}`);
  }

}
