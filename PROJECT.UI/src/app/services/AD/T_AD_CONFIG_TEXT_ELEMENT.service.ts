import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_CONFIG_TEXT_ELEMENT } from 'src/app/models/AD/T_AD_CONFIG_TEXT_ELEMENT.model';

@Injectable({
  providedIn: 'root'
})
export class T_AD_CONFIG_TEXT_ELEMENT_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };
  
  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListConfigTextElement() : Observable<T_AD_CONFIG_TEXT_ELEMENT>{
      return this.http.get<T_AD_CONFIG_TEXT_ELEMENT>(this.apiUrl + '/api/ConfigTextElement/GetList', this.requestOptions)
  }
 
  updateConfigTextElement(id: string, updateItemRequest : T_AD_CONFIG_TEXT_ELEMENT): Observable<T_AD_CONFIG_TEXT_ELEMENT>{
    return this.http.put<T_AD_CONFIG_TEXT_ELEMENT>(this.apiUrl + '/api/ConfigTextElement/Update/'+ id, updateItemRequest, this.requestOptions)
  }
}