import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_CM_TEMPLATE_CONTRACT } from 'src/app/models/CM/T_CM_TEMPLATE_CONTRACT.model';
import { Select } from 'src/app/models/Common/select.model';

@Injectable({
  providedIn: 'root'
})
export class T_CM_TEMPLATE_CONTRACT_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  GetListTemplate() : Observable<T_CM_TEMPLATE_CONTRACT[]>{
    return this.http.get<T_CM_TEMPLATE_CONTRACT[]>(this.apiUrl + `/api/TemplateContract/GetListTemplate`, this.requestOptions)
}
}