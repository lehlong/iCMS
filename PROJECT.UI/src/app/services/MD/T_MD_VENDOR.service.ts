import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_VENDOR } from 'src/app/models/MD/T_MD_VENDOR.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_VENDOR_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListVendor(): Observable<T_MD_VENDOR[]> {
    return this.http.get<T_MD_VENDOR[]>(this.apiUrl + '/api/Vendor/GetList', this.requestOptions)
  }

  createVendor(addItemRequest: T_MD_VENDOR): Observable<T_MD_VENDOR> {
    debugger
    return this.http.post<T_MD_VENDOR>(this.apiUrl + '/api/Vendor/Create', addItemRequest, this.requestOptions)
  }

  getDetailVendor(code: string): Observable<T_MD_VENDOR> {
    return this.http.get<T_MD_VENDOR>(this.apiUrl + '/api/Vendor/Detail/' + code, this.requestOptions)
  }

  updateVendor(code: string, updateItemRequest: T_MD_VENDOR): Observable<T_MD_VENDOR> {
    return this.http.put<T_MD_VENDOR>(this.apiUrl + '/api/Vendor/Update/' + code, updateItemRequest, this.requestOptions)
  }

  deleteVendor(code: string): Observable<T_MD_VENDOR> {
    return this.http.delete<T_MD_VENDOR>(this.apiUrl + '/api/Vendor/Delete/' + code, this.requestOptions)
  }

  searchVendor(key: string): Observable<T_MD_VENDOR[]> {
    return this.http.get<T_MD_VENDOR[]>(this.apiUrl + '/api/Vendor/Search/' + key, this.requestOptions)
  }
}