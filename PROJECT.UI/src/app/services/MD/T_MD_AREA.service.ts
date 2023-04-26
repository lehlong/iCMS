import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_AREA } from 'src/app/models/MD/T_MD_AREA.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_AREA_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListArea() : Observable<T_MD_AREA[]>{
      return this.http.get<T_MD_AREA[]>(this.apiUrl + '/api/Area/GetList', this.requestOptions)
  }

  createArea(addItemRequest : T_MD_AREA): Observable<T_MD_AREA>{
    debugger
    return this.http.post<T_MD_AREA>(this.apiUrl + '/api/Area/Create', addItemRequest, this.requestOptions)
  }

  getDetailArea(code: string) : Observable<T_MD_AREA>{
    return this.http.get<T_MD_AREA>(this.apiUrl + '/api/Area/Detail/'+ code, this.requestOptions)
  }

  updateArea(code: string, updateItemRequest : T_MD_AREA): Observable<T_MD_AREA>{
    return this.http.put<T_MD_AREA>(this.apiUrl + '/api/Area/Update/'+ code, updateItemRequest, this.requestOptions)
  }

  deleteArea(code: string): Observable<T_MD_AREA>{
    return this.http.delete<T_MD_AREA>(this.apiUrl + '/api/Area/Delete/'+ code, this.requestOptions)
  }

  searchArea(key: string): Observable<T_MD_AREA[]>{
    return this.http.get<T_MD_AREA[]>(this.apiUrl + '/api/Area/Search/'+ key, this.requestOptions)
  }
}