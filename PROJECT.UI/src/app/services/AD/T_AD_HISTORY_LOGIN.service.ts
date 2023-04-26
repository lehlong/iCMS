import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_HISTORY_LOGIN } from 'src/app/models/AD/T_AD_HISTORY_LOGIN.model';
import { OnChangDate } from 'src/app/models/Common/chang-date.model';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';

@Injectable({
  providedIn: 'root'
})
export class T_AD_HISTORY_LOGIN_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };
  
  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  searchHistoryLogin(date : OnChangDate): Observable<T_AD_HISTORY_LOGIN[]>{
    return this.http.get<T_AD_HISTORY_LOGIN[]>(this.apiUrl + `/api/HistoryLogin/Search/${JSON.stringify(date)}`, this.requestOptions)
  }

  userOnline(): Observable<T_AD_USER[]>{
    return this.http.get<T_AD_USER[]>(this.apiUrl + `/api/HistoryLogin/UserOnline`, this.requestOptions)
  }
}