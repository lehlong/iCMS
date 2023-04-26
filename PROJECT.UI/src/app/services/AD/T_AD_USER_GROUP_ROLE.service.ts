import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_USER_GROUP_ROLE } from 'src/app/models/AD/T_AD_USER_GROUP_ROLE.model';
import { T_AD_ROLE } from 'src/app/models/AD/T_AD_ROLE.model';

@Injectable({
  providedIn: 'root'
})
export class T_AD_USER_GROUP_ROLE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListUserGroupRole(userGroupCode: string): Observable<T_AD_USER_GROUP_ROLE[]> {
    return this.http.get<T_AD_USER_GROUP_ROLE[]>(this.apiUrl + '/api/UserGroupRole/GetList/' + userGroupCode, this.requestOptions)
  }

  getListUserGroupRoleForAdd(addItemRequest: T_AD_USER_GROUP_ROLE[]): Observable<T_AD_ROLE[]> {
    return this.http.post<T_AD_ROLE[]>(this.apiUrl + '/api/UserGroupRole/GetListForAdd', addItemRequest, this.requestOptions)
  }

  addRoleToUserGroup(userGroupCode: string, roleCode: string): Observable<T_AD_USER_GROUP_ROLE[]> {
    return this.http.post<T_AD_USER_GROUP_ROLE[]>(this.apiUrl + `/api/UserGroupRole/AddRoleToUserGroup/${userGroupCode}/${roleCode}`, this.requestOptions)
  }

  deleteRoleToUserGroup(userGroupCode: string, roleCode: string): Observable<T_AD_USER_GROUP_ROLE> {
    return this.http.delete<T_AD_USER_GROUP_ROLE>(this.apiUrl + `/api/UserGroupRole/Delete/${userGroupCode}/${roleCode}`, this.requestOptions)
  }
}