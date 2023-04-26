import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_CUSTOMER } from 'src/app/models/MD/T_MD_CUSTOMER.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_CUSTOMER_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListCustomer(): Observable<T_MD_CUSTOMER[]> {
    return this.http.get<T_MD_CUSTOMER[]>(this.apiUrl + '/api/Customer/GetList', this.requestOptions)
  }

  createCustomer(addItemRequest: T_MD_CUSTOMER): Observable<T_MD_CUSTOMER> {
    debugger
    return this.http.post<T_MD_CUSTOMER>(this.apiUrl + '/api/Customer/Create', addItemRequest, this.requestOptions)
  }

  updateCustomer(code: string, updateItemRequest: T_MD_CUSTOMER): Observable<T_MD_CUSTOMER> {
    return this.http.put<T_MD_CUSTOMER>(this.apiUrl + '/api/Customer/Update/' + code, updateItemRequest, this.requestOptions)
  }

  deleteCustomer(code: string): Observable<T_MD_CUSTOMER> {
    return this.http.delete<T_MD_CUSTOMER>(this.apiUrl + '/api/Customer/Delete/' + code, this.requestOptions)
  }
}