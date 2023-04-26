import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_PROJECT_PROFILE } from 'src/app/models/MD/T_MD_PROJECT_PROFILE.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_PROJECT_PROFILE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListProjectProfile(): Observable<T_MD_PROJECT_PROFILE[]> {
    return this.http.get<T_MD_PROJECT_PROFILE[]>(this.apiUrl + '/api/ProjectProfile/GetList', this.requestOptions)
  }

  createProjectProfile(addItemRequest: T_MD_PROJECT_PROFILE): Observable<T_MD_PROJECT_PROFILE> {
    debugger
    return this.http.post<T_MD_PROJECT_PROFILE>(this.apiUrl + '/api/ProjectProfile/Create', addItemRequest, this.requestOptions)
  }

  getDetailProjectProfile(id: string): Observable<T_MD_PROJECT_PROFILE> {
    return this.http.get<T_MD_PROJECT_PROFILE>(this.apiUrl + '/api/ProjectProfile/Detail/' + id, this.requestOptions)
  }

  updateProjectProfile(id: string, updateItemRequest: T_MD_PROJECT_PROFILE): Observable<T_MD_PROJECT_PROFILE> {
    return this.http.put<T_MD_PROJECT_PROFILE>(this.apiUrl + '/api/ProjectProfile/Update/' + id, updateItemRequest, this.requestOptions)
  }

  deleteProjectProfile(id: string): Observable<T_MD_PROJECT_PROFILE> {
    return this.http.delete<T_MD_PROJECT_PROFILE>(this.apiUrl + '/api/ProjectProfile/Delete/' + id, this.requestOptions)
  }

  searchProjectProfile(key: string): Observable<T_MD_PROJECT_PROFILE[]> {
    return this.http.get<T_MD_PROJECT_PROFILE[]>(this.apiUrl + '/api/ProjectProfile/Search/' + key, this.requestOptions)
  }
}