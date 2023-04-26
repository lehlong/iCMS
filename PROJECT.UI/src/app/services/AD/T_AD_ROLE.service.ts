import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_ROLE } from 'src/app/models/AD/T_AD_ROLE.model';

@Injectable({
  providedIn: 'root'
})
export class T_AD_ROLE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListRole(): Observable<T_AD_ROLE[]> {
    return this.http.get<T_AD_ROLE[]>(this.apiUrl + '/api/Role/GetList', this.requestOptions)
  }

  getRoleDetail(code: string): Observable<T_AD_ROLE> {
    return this.http.get<T_AD_ROLE>(this.apiUrl + '/api/Role/Detail/' + code, this.requestOptions)
  }

  updateRole(code: string, updateItemRequest: T_AD_ROLE): Observable<T_AD_ROLE> {
    return this.http.put<T_AD_ROLE>(this.apiUrl + '/api/Role/Update/' + code, updateItemRequest, this.requestOptions)
  }

  createRole(addItemRequest: T_AD_ROLE): Observable<T_AD_ROLE> {
    return this.http.post<T_AD_ROLE>(this.apiUrl + '/api/Role/Create', addItemRequest, this.requestOptions)
  }

  searchRole(key: string): Observable<T_AD_ROLE[]> {
    return this.http.get<T_AD_ROLE[]>(this.apiUrl + '/api/Role/Search/' + key, this.requestOptions)
  }
}