import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_ORGANIZE } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { NodeOrganize } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { TranferObject } from 'src/app/models/Common/tranfer-object.model';
import { CommonService } from '../Common/common.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizeService {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        'Language' : `${localStorage.getItem('lang')}`
  });
  requestOptions = { headers: this.headers };
  
  apiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private _commonService : CommonService) { }

  getListCP(): Observable<T_AD_ORGANIZE[]> {
    return this.http.get<T_AD_ORGANIZE[]>(this.apiUrl + '/api/Organize/GetListCP', this.requestOptions)
  }
  getListBP(): Observable<T_AD_ORGANIZE[]> {
    return this.http.get<T_AD_ORGANIZE[]>(this.apiUrl + '/api/Organize/GetListBP', this.requestOptions)
  }
  buildTreeOrganize() {
    return this._commonService.getRequest('/api/Organize/BuildTree')
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

  getDetailOrganize(pkid: string): Observable<T_AD_ORGANIZE> {
    return this.http.get<T_AD_ORGANIZE>(this.apiUrl + '/api/Organize/GetDetail/' + pkid,this.requestOptions)
  }

  updateOrganize(updateItemRequest : T_AD_ORGANIZE): Observable<TranferObject>{
    return this.http.put<TranferObject>(this.apiUrl + '/api/Organize/Update', updateItemRequest, this.requestOptions) 
  }

  createOrganize(addItemRequest : T_AD_ORGANIZE): Observable<TranferObject>{
    return this.http.post<TranferObject>(this.apiUrl + '/api/Organize/Create', addItemRequest, this.requestOptions)
  }
}