import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_RIGHT } from 'src/app/models/AD/T_AD_RIGHT_model';
import { NodeRight } from 'src/app/models/AD/T_AD_RIGHT_model';

@Injectable({
  providedIn: 'root'
})
export class T_AD_RIGHT_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  buildTreeRight(): Observable<NodeRight[]> {
    return this.http.get<NodeRight[]>(this.apiUrl + '/api/Right/BuildTree', this.requestOptions)
  }
  buildTreeRightGrid(): Observable<NodeRight[]> {
    return this.http.get<NodeRight[]>(this.apiUrl + '/api/Right/Grid/BuildTree', this.requestOptions)
  }
  getDataTable(): Observable<T_AD_RIGHT[]> {
    return this.http.get<T_AD_RIGHT[]>(this.apiUrl + '/api/Right/Grid/DataTable', this.requestOptions)
  }
  searchRight(key: string): Observable<NodeRight[]> {
    return this.http.get<NodeRight[]>(this.apiUrl + '/api/Right/Search/' + key, this.requestOptions)
  }
  searchRightGrid(key: string): Observable<NodeRight[]> {
    return this.http.get<NodeRight[]>(this.apiUrl + '/api/Right/Grid/Search/' + key, this.requestOptions)
  }
}