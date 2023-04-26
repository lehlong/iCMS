import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { Login } from 'src/app/models/Authentication/login.model';
import { environment } from 'src/environments/environment';

declare function MessageDanger(response : string) : any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public translate : TranslateService,private router: Router, private http: HttpClient,private jwtHelper : JwtHelperService, private _location : Location){}

  invalidLogin?: boolean;

  apiUrl: string = environment.baseApiUrl;

  loginRequest: Login = {
    username:'',
    password:''
  }

  public login = () => {
    ShowLoading();
    this.http.post(this.apiUrl + '/api/Authentication/Login', this.loginRequest, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      localStorage.setItem("jwt", (<any>response).Token);
      localStorage.setItem("user",JSON.stringify((<any>response).User, null, 2));
      localStorage.setItem("lstRight", JSON.stringify((<any>response).ListRight, null, 2));

      this.invalidLogin = false;
      this.router.navigate(['']).then(() =>{
        window.location.reload();
      })
      HideLoading();
    }, err => {
      this.invalidLogin = true;
      HideLoading();
      MessageDanger("Đăng nhập không thành công! Sai tên đăng nhập hoặc mật khẩu! Vui lòng liên hệ với Quản trị viên để được hỗ trợ!");
    });
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
}
