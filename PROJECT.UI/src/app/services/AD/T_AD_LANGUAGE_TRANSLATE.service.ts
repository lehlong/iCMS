import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_AD_LANGUAGE_TRANSLATE } from 'src/app/models/AD/T_AD_LANGUAGE_TRANSLATE.model';

@Injectable({
  providedIn: 'root'
})
export class T_AD_LANGUAGE_TRANSLATE_Service {

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
  });
  requestOptions = { headers: this.headers };
  
  apiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getListLanguageTranslate() : Observable<T_AD_LANGUAGE_TRANSLATE[]>{
      return this.http.get<T_AD_LANGUAGE_TRANSLATE[]>(this.apiUrl + '/api/LanguageTranslate/GetList', this.requestOptions)
  }

  createLanguageTranslate(addItemRequest : T_AD_LANGUAGE_TRANSLATE): Observable<T_AD_LANGUAGE_TRANSLATE>{
    debugger
    return this.http.post<T_AD_LANGUAGE_TRANSLATE>(this.apiUrl + '/api/LanguageTranslate/Create', addItemRequest, this.requestOptions)
  }

  updateLanguageTranslate(pkid: string, updateItemRequest : T_AD_LANGUAGE_TRANSLATE): Observable<T_AD_LANGUAGE_TRANSLATE>{
    return this.http.put<T_AD_LANGUAGE_TRANSLATE>(this.apiUrl + '/api/LanguageTranslate/Update/'+ pkid, updateItemRequest, this.requestOptions)
  }
}