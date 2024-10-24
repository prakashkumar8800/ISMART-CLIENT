import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private apiService: ApiService) { }
  login(email: string, password: string): Observable<any> {
    const url = this.apiService.BASE_URL + 'user123/adminLogin';
    const postData = { email, password };
    return this.http.post(url, postData);
  }
}
