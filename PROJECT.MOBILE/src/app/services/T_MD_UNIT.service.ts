import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { T_MD_UNIT } from '../models/T_MD_UINIT.model';

@Injectable({
  providedIn: 'root'
})
export class T_MD_UNIT_Service {

  apiUrl: string = "https://localhost:4008";
  constructor(private http: HttpClient) { }

  getListUnit(): Observable<T_MD_UNIT[]> {
    return this.http.get<T_MD_UNIT[]>("http://sso.d2s.com.vn:4008/api/Unit/GetList")
  }
}