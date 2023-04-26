import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_USER_USER_GROUP } from 'src/app/models/AD/T_AD_USER_USER_GROUP.model';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';
import { T_AD_USER_GROUP } from 'src/app/models/AD/T_AD_USER_GROUP.model';

@Injectable({
  providedIn: 'root'
})
export class T_AD_USER_USER_GROUP_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListUserUserGroup(userGroupCode: string): Observable<T_AD_USER[]> {
    return this.http.get<T_AD_USER[]>(this.apiUrl + '/api/UserUserGroup/GetList/' + userGroupCode, this.requestOptions)
  }

  getListUserUserGroupDetail(username: string): Observable<T_AD_USER_GROUP[]> {
    return this.http.get<T_AD_USER_GROUP[]>(this.apiUrl + '/api/UserUserGroup/GetListDetail/' + username, this.requestOptions)
  }

  deleteUserUserGroup(userGroupCode: string, username: string): Observable<T_AD_USER_USER_GROUP> {
    return this.http.delete<T_AD_USER_USER_GROUP>(this.apiUrl + `/api/UserUserGroup/Delete/${userGroupCode}/${username}`, this.requestOptions)
  }

  getListUserForAdd(userGroupCode: string): Observable<T_AD_USER[]> {
    return this.http.get<T_AD_USER[]>(this.apiUrl + `/api/UserUserGroup/ListUserForAdd/${userGroupCode}`, this.requestOptions)
  }

  addUserToUserGroup(userGroupCode: string, username: string): Observable<T_AD_USER_USER_GROUP> {
    return this.http.post<T_AD_USER_USER_GROUP>(this.apiUrl + `/api/UserUserGroup/AddUserToUserGroup/${userGroupCode}/${username}`, this.requestOptions)
  }
}