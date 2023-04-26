import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_PROJECT_LEVEL } from 'src/app/models/MD/T_MD_PROJECT_LEVEL.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_PROJECT_LEVEL_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListProjectLevel() : Observable<T_MD_PROJECT_LEVEL[]>{
      return this.http.get<T_MD_PROJECT_LEVEL[]>(this.apiUrl + '/api/ProjectLevel/GetList',this.requestOptions)
  }

  createProjectLevel(addItemRequest : T_MD_PROJECT_LEVEL): Observable<T_MD_PROJECT_LEVEL>{
    debugger
    return this.http.post<T_MD_PROJECT_LEVEL>(this.apiUrl + '/api/ProjectLevel/Create', addItemRequest,this.requestOptions)
  }

  getDetailProjectLevel(code: string) : Observable<T_MD_PROJECT_LEVEL>{
    return this.http.get<T_MD_PROJECT_LEVEL>(this.apiUrl + '/api/ProjectLevel/Detail/'+ code,this.requestOptions)
  }

  updateProjectLevel(code: string, updateItemRequest : T_MD_PROJECT_LEVEL): Observable<T_MD_PROJECT_LEVEL>{
    return this.http.put<T_MD_PROJECT_LEVEL>(this.apiUrl + '/api/ProjectLevel/Update/'+ code, updateItemRequest,this.requestOptions)
  }

  deleteProjectLevel(code: string): Observable<T_MD_PROJECT_LEVEL>{
    return this.http.delete<T_MD_PROJECT_LEVEL>(this.apiUrl + '/api/ProjectLevel/Delete/'+ code,this.requestOptions)
  }

  searchProjectLevel(key: string): Observable<T_MD_PROJECT_LEVEL[]>{
    return this.http.get<T_MD_PROJECT_LEVEL[]>(this.apiUrl + '/api/ProjectLevel/Search/'+ key,this.requestOptions)
  }
}