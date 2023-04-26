import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_MESSAGE } from 'src/app/models/AD/T_AD_MESSAGE.model';

@Injectable({
  providedIn: 'root'
})
export class T_AD_MESSAGE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };
  
  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListMessage() : Observable<T_AD_MESSAGE[]>{
      return this.http.get<T_AD_MESSAGE[]>(this.apiUrl + '/api/Message/GetList', this.requestOptions)
  }

  createMessage(addItemRequest : T_AD_MESSAGE): Observable<T_AD_MESSAGE>{
    return this.http.post<T_AD_MESSAGE>(this.apiUrl + '/api/Message/Create', addItemRequest, this.requestOptions)
  }

  getDetailMessage(pkid: string) : Observable<T_AD_MESSAGE>{
    return this.http.get<T_AD_MESSAGE>(this.apiUrl + '/api/Message/Detail/'+ pkid, this.requestOptions)
  }

  updateMessage(pkid: string, updateItemRequest : T_AD_MESSAGE): Observable<T_AD_MESSAGE>{
    return this.http.put<T_AD_MESSAGE>(this.apiUrl + '/api/Message/Update/'+ pkid, updateItemRequest, this.requestOptions)
  }

  deleteMessage(pkid: string): Observable<T_AD_MESSAGE>{
    return this.http.delete<T_AD_MESSAGE>(this.apiUrl + '/api/Message/Delete/'+ pkid, this.requestOptions)
  }

  searchMessage(key: string): Observable<T_AD_MESSAGE[]>{
    return this.http.get<T_AD_MESSAGE[]>(this.apiUrl + '/api/Message/Search/'+ key, this.requestOptions)
  }
}