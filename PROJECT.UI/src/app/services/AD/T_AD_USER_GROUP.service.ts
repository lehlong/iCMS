import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_USER_GROUP } from 'src/app/models/AD/T_AD_USER_GROUP.model';

@Injectable({
  providedIn: 'root'
})
export class T_AD_USER_GROUP_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListUserGroup(): Observable<T_AD_USER_GROUP[]> {
    return this.http.get<T_AD_USER_GROUP[]>(this.apiUrl + '/api/UserGroup/GetList', this.requestOptions)
  }

  getListUserGroupForAdd(itemRequest: T_AD_USER_GROUP[]): Observable<T_AD_USER_GROUP[]> {
    return this.http.post<T_AD_USER_GROUP[]>(this.apiUrl + '/api/UserGroup/GetListForAdd', itemRequest, this.requestOptions)
  }

  getUserGroupDetail(code: string): Observable<T_AD_USER_GROUP> {
    return this.http.get<T_AD_USER_GROUP>(this.apiUrl + '/api/UserGroup/Detail/' + code, this.requestOptions)
  }

  updateUserGroup(code: string, updateItemRequest: T_AD_USER_GROUP): Observable<T_AD_USER_GROUP> {
    return this.http.put<T_AD_USER_GROUP>(this.apiUrl + '/api/UserGroup/Update/' + code, updateItemRequest)
  }

  createUserGroup(addItemRequest: T_AD_USER_GROUP): Observable<T_AD_USER_GROUP> {
    return this.http.post<T_AD_USER_GROUP>(this.apiUrl + '/api/UserGroup/Create', addItemRequest)
  }

  searchUserGroup(key: string): Observable<T_AD_USER_GROUP[]> {
    return this.http.get<T_AD_USER_GROUP[]>(this.apiUrl + '/api/UserGroup/Search/' + key)
  }

  createUserGroupOfUser(addItemRequest: T_AD_USER_GROUP[]): Observable<T_AD_USER_GROUP[]> {
    return this.http.post<T_AD_USER_GROUP[]>(this.apiUrl + '/api/UserGroup/Create', addItemRequest)
  }
}