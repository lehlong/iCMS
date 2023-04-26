import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_CM_TEMPLATE_TEXT_ELEMENT } from 'src/app/models/CM/T_CM_TEMPLATE_TEXT_ELEMENT.model';
import { Select } from 'src/app/models/Common/select.model';

@Injectable({
  providedIn: 'root'
})
export class T_CM_TEMPLATE_TEXT_ELEMENT_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };

  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  GetListTemplateTextElement() : Observable<T_CM_TEMPLATE_TEXT_ELEMENT[]>{
    return this.http.get<T_CM_TEMPLATE_TEXT_ELEMENT[]>(this.apiUrl + `/api/TemplateTextElement/GetList`, this.requestOptions)
}
}