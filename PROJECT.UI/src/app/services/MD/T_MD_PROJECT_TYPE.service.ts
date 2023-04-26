import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_PROJECT_TYPE } from 'src/app/models/MD/T_MD_PROJECT_TYPE.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_PROJECT_TYPE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListProjectType(): Observable<T_MD_PROJECT_TYPE[]> {
    return this.http.get<T_MD_PROJECT_TYPE[]>(this.apiUrl + '/api/ProjectType/GetList', this.requestOptions)
  }

  createProjectType(addItemRequest: T_MD_PROJECT_TYPE): Observable<T_MD_PROJECT_TYPE> {
    debugger
    return this.http.post<T_MD_PROJECT_TYPE>(this.apiUrl + '/api/ProjectType/Create', addItemRequest, this.requestOptions)
  }

  getDetailProjectType(code: string): Observable<T_MD_PROJECT_TYPE> {
    return this.http.get<T_MD_PROJECT_TYPE>(this.apiUrl + '/api/ProjectType/Detail/' + code, this.requestOptions)
  }

  updateProjectType(code: string, updateItemRequest: T_MD_PROJECT_TYPE): Observable<T_MD_PROJECT_TYPE> {
    return this.http.put<T_MD_PROJECT_TYPE>(this.apiUrl + '/api/ProjectType/Update/' + code, updateItemRequest, this.requestOptions)
  }

  deleteProjectType(code: string): Observable<T_MD_PROJECT_TYPE> {
    return this.http.delete<T_MD_PROJECT_TYPE>(this.apiUrl + '/api/ProjectType/Delete/' + code, this.requestOptions)
  }

  searchProjectType(key: string): Observable<T_MD_PROJECT_TYPE[]> {
    return this.http.get<T_MD_PROJECT_TYPE[]>(this.apiUrl + '/api/ProjectType/Search/' + key, this.requestOptions)
  }
}