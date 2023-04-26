import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_UNIT } from 'src/app/models/MD/T_MD_UNIT.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_UNIT_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListUnit(): Observable<T_MD_UNIT[]> {
    return this.http.get<T_MD_UNIT[]>(this.apiUrl + '/api/Unit/GetList', this.requestOptions)
  }

  createUnit(addItemRequest: T_MD_UNIT): Observable<T_MD_UNIT> {
    debugger
    return this.http.post<T_MD_UNIT>(this.apiUrl + '/api/Unit/Create', addItemRequest, this.requestOptions)
  }

  getDetailUnit(code: string): Observable<T_MD_UNIT> {
    return this.http.get<T_MD_UNIT>(this.apiUrl + '/api/Unit/Detail/' + code, this.requestOptions)
  }

  updateUnit(code: string, updateItemRequest: T_MD_UNIT): Observable<T_MD_UNIT> {
    return this.http.put<T_MD_UNIT>(this.apiUrl + '/api/Unit/Update/' + code, updateItemRequest, this.requestOptions)
  }

  deleteUnit(code: string): Observable<T_MD_UNIT> {
    return this.http.delete<T_MD_UNIT>(this.apiUrl + '/api/Unit/Delete/' + code, this.requestOptions)
  }

  searchUnit(key: string): Observable<T_MD_UNIT[]> {
    return this.http.get<T_MD_UNIT[]>(this.apiUrl + '/api/Unit/Search/' + key, this.requestOptions)
  }
}