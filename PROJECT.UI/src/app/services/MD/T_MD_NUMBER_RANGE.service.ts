import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_NUMBER_RANGE } from 'src/app/models/MD/T_MD_NUMBER_RANGE.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_NUMBER_RANGE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListNumberRange(): Observable<T_MD_NUMBER_RANGE[]> {
    return this.http.get<T_MD_NUMBER_RANGE[]>(this.apiUrl + '/api/NumberRange/GetList', this.requestOptions)
  }

  createNumberRange(addItemRequest: T_MD_NUMBER_RANGE): Observable<T_MD_NUMBER_RANGE> {
    debugger
    return this.http.post<T_MD_NUMBER_RANGE>(this.apiUrl + '/api/NumberRange/Create', addItemRequest, this.requestOptions)
  }

  getDetailNumberRange(id: string): Observable<T_MD_NUMBER_RANGE> {
    return this.http.get<T_MD_NUMBER_RANGE>(this.apiUrl + '/api/NumberRange/Detail/' + id, this.requestOptions)
  }

  updateNumberRange(id: string, updateItemRequest: T_MD_NUMBER_RANGE): Observable<T_MD_NUMBER_RANGE> {
    return this.http.put<T_MD_NUMBER_RANGE>(this.apiUrl + '/api/NumberRange/Update/' + id, updateItemRequest, this.requestOptions)
  }

  deleteNumberRange(id: string): Observable<T_MD_NUMBER_RANGE> {
    return this.http.delete<T_MD_NUMBER_RANGE>(this.apiUrl + '/api/NumberRange/Delete/' + id, this.requestOptions)
  }

  searchNumberRange(key: string): Observable<T_MD_NUMBER_RANGE[]> {
    return this.http.get<T_MD_NUMBER_RANGE[]>(this.apiUrl + '/api/NumberRange/Search/' + key, this.requestOptions)
  }
}