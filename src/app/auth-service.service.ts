import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  // private baseUrl = 'http://localhost:4500/auth';
  constructor(private http:HttpClient, private router: Router) { }
  //  login(data):Observable<any>{
  //   console.log("I am a Service");
  //   return this.http.post(`${baseUrl}auth/login`,data)
  //  }
  login(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data, { responseType: 'text' }).pipe(
      tap((response: any) => {
        // Assuming the token is in `response.token`
        const token = response.token;
        if (response && token) {
          localStorage.setItem('authToken', token);
        }
      })
    );
  }
  logout() {
    localStorage.removeItem('authToken'); // Clear token on logout
    this.router.navigate(['/user-login']);
  }
  getToken(): string | null {
    return localStorage.getItem('authtoken');
  }
  getUser(): Observable<any> {
    return this.http.get('https://ismartapi.pw.work.gd/user/getAllusers'); // replace with actual endpoint
  }
}

