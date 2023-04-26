import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_CM_CONTRACT_TYPE } from 'src/app/models/CM/T_CM_CONTRACT_TYPE.model';

@Injectable({
  providedIn: 'root'
})
export class T_CM_CONTRACT_TYPE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListContractType(): Observable<T_CM_CONTRACT_TYPE[]> {
    return this.http.get<T_CM_CONTRACT_TYPE[]>(this.apiUrl + '/api/ContractType/GetList', this.requestOptions)
  }

  createContractType(addItemRequest: T_CM_CONTRACT_TYPE): Observable<T_CM_CONTRACT_TYPE> {
    debugger
    return this.http.post<T_CM_CONTRACT_TYPE>(this.apiUrl + '/api/ContractType/Create', addItemRequest, this.requestOptions)
  }

  updateContractType(code: string, updateItemRequest: T_CM_CONTRACT_TYPE): Observable<T_CM_CONTRACT_TYPE> {
    return this.http.put<T_CM_CONTRACT_TYPE>(this.apiUrl + '/api/ContractType/Update/' + code, updateItemRequest, this.requestOptions)
  }

  deleteContractType(code: string): Observable<T_CM_CONTRACT_TYPE> {
    return this.http.delete<T_CM_CONTRACT_TYPE>(this.apiUrl + '/api/ContractType/Delete/' + code, this.requestOptions)
  }

}