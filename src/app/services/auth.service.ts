import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from 'src/interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
   ) { }

   login(credentials: { email: string, password: string }): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrlBase}/auth/login`, credentials)
  }
}
