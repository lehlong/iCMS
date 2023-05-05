import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { TranferObject } from 'src/app/models/Common/tranfer-object.model';
declare function ShowLoading(): any
declare function HideLoading(): any
declare function Message(response : TranferObject): any

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    token = localStorage.getItem('jwt');
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        'Language': `${localStorage.getItem('lang')}`
    });
    requestOptions = { headers: this.headers };

    apiUrl: string = environment.baseApiUrl;

    constructor(private http: HttpClient) { }

    getRequest(url: string): Observable<TranferObject> {
        ShowLoading();
        var tranferObject = this.http.get<TranferObject>(this.apiUrl + url, this.requestOptions)
        tranferObject.subscribe({
            next: (response) => { HideLoading(); },
            error: (response) => { HideLoading(); }
        })
        return tranferObject;
    }

    postRequest(url: string, request :any): Observable<TranferObject>{
        ShowLoading();
        var tranferObject = this.http.post<TranferObject>(this.apiUrl + url, request, this.requestOptions)
        tranferObject.subscribe({
            next: (response) => { HideLoading(); Message(response) },
            error: (response) => { HideLoading(); Message(response)}
        })
        return tranferObject;
    }

    putRequest(url: string, request :any): Observable<TranferObject>{
        ShowLoading();
        var tranferObject = this.http.put<TranferObject>(this.apiUrl + url, request, this.requestOptions)
        tranferObject.subscribe({
            next: (response) => { HideLoading(); Message(response) },
            error: (response) => { HideLoading(); Message(response)}
        })
        return tranferObject;
    }

    deleteRequest(url: string): Observable<TranferObject>{
        ShowLoading();
        var tranferObject = this.http.delete<TranferObject>(this.apiUrl + url, this.requestOptions)
        tranferObject.subscribe({
            next: (response) => { HideLoading(); Message(response) },
            error: (response) => { HideLoading(); Message(response)}
        })
        return tranferObject;
    }
}