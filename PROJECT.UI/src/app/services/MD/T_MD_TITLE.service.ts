import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_TITLE } from 'src/app/models/MD/T_MD_TITLE.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_TITLE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListTitle(): Observable<T_MD_TITLE[]> {
    return this.http.get<T_MD_TITLE[]>(this.apiUrl + '/api/Title/GetList', this.requestOptions)
  }

  createTitle(addItemRequest: T_MD_TITLE): Observable<T_MD_TITLE> {
    debugger
    return this.http.post<T_MD_TITLE>(this.apiUrl + '/api/Title/Create', addItemRequest, this.requestOptions)
  }

  getDetailTitle(code: string): Observable<T_MD_TITLE> {
    return this.http.get<T_MD_TITLE>(this.apiUrl + '/api/Title/Detail/' + code, this.requestOptions)
  }

  updateTitle(code: string, updateItemRequest: T_MD_TITLE): Observable<T_MD_TITLE> {
    return this.http.put<T_MD_TITLE>(this.apiUrl + '/api/Title/Update/' + code, updateItemRequest, this.requestOptions)
  }

  deleteTitle(code: string): Observable<T_MD_TITLE> {
    return this.http.delete<T_MD_TITLE>(this.apiUrl + '/api/Title/Delete/' + code, this.requestOptions)
  }

  searchTitle(key: string): Observable<T_MD_TITLE[]> {
    return this.http.get<T_MD_TITLE[]>(this.apiUrl + '/api/Title/Search/' + key, this.requestOptions)
  }
}