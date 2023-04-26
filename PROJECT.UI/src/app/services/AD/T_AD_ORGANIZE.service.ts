import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_ORGANIZE } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { NodeOrganize } from 'src/app/models/AD/T_AD_ORGANIZE.model';

@Injectable({
  providedIn: 'root'
})
export class T_AD_ORGANIZE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };
  
  apiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getListCP(): Observable<T_AD_ORGANIZE[]> {
    return this.http.get<T_AD_ORGANIZE[]>(this.apiUrl + '/api/Organize/GetListCP', this.requestOptions)
  }
  getListBP(): Observable<T_AD_ORGANIZE[]> {
    return this.http.get<T_AD_ORGANIZE[]>(this.apiUrl + '/api/Organize/GetListBP', this.requestOptions)
  }
  buildTreeOrganize(): Observable<NodeOrganize[]> {
    return this.http.get<NodeOrganize[]>(this.apiUrl + '/api/Organize/BuildTree',this.requestOptions)
  }
  buildTreeOrganizeGrid(): Observable<NodeOrganize[]> {
    return this.http.get<NodeOrganize[]>(this.apiUrl + '/api/Organize/Grid/BuildTree',this.requestOptions)
  }
  getDataTable(): Observable<T_AD_ORGANIZE[]> {
    return this.http.get<T_AD_ORGANIZE[]>(this.apiUrl + '/api/Organize/Grid/DataTable',this.requestOptions)
  }
  searchOrganize(key: string): Observable<NodeOrganize[]> {
    return this.http.get<NodeOrganize[]>(this.apiUrl + '/api/Organize/Search/' + key,this.requestOptions)
  }
  searchOrganizeGrid(key: string): Observable<NodeOrganize[]> {
    return this.http.get<NodeOrganize[]>(this.apiUrl + '/api/Organize/Grid/Search/' + key,this.requestOptions)
  }
}