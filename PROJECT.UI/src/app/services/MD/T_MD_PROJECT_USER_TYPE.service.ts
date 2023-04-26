import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_PROJECT_USER_TYPE } from 'src/app/models/MD/T_MD_PROJECT_USER_TYPE.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_PROJECT_USER_TYPE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListProjectUserType(): Observable<T_MD_PROJECT_USER_TYPE[]> {
    return this.http.get<T_MD_PROJECT_USER_TYPE[]>(this.apiUrl + '/api/ProjectUserType/GetList', this.requestOptions)
  }

  createProjectUserType(addItemRequest: T_MD_PROJECT_USER_TYPE): Observable<T_MD_PROJECT_USER_TYPE> {
    debugger
    return this.http.post<T_MD_PROJECT_USER_TYPE>(this.apiUrl + '/api/ProjectUserType/Create', addItemRequest, this.requestOptions)
  }

  getDetailProjectUserType(code: string): Observable<T_MD_PROJECT_USER_TYPE> {
    return this.http.get<T_MD_PROJECT_USER_TYPE>(this.apiUrl + '/api/ProjectUserType/Detail/' + code, this.requestOptions)
  }

  updateProjectUserType(code: string, updateItemRequest: T_MD_PROJECT_USER_TYPE): Observable<T_MD_PROJECT_USER_TYPE> {
    return this.http.put<T_MD_PROJECT_USER_TYPE>(this.apiUrl + '/api/ProjectUserType/Update/' + code, updateItemRequest, this.requestOptions)
  }

  deleteProjectUserType(code: string): Observable<T_MD_PROJECT_USER_TYPE> {
    return this.http.delete<T_MD_PROJECT_USER_TYPE>(this.apiUrl + '/api/ProjectUserType/Delete/' + code, this.requestOptions)
  }

  searchProjectUserType(key: string): Observable<T_MD_PROJECT_USER_TYPE[]> {
    return this.http.get<T_MD_PROJECT_USER_TYPE[]>(this.apiUrl + '/api/ProjectUserType/Search/' + key, this.requestOptions)
  }
}