import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_AD_HISTORY_LOGIN } from 'src/app/models/AD/T_AD_HISTORY_LOGIN.model';
import { T_AD_HISTORY_LOGIN_Service } from 'src/app/services/AD/T_AD_HISTORY_LOGIN.service';
import { DatePipe } from '@angular/common';
import { OnChangDate } from 'src/app/models/Common/chang-date.model';

declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-test-list',
  templateUrl: './history-login.component.html',
  styleUrls: ['./history-login.component.css']
})
export class HistoryLoginComponent implements OnInit {
  lstHistoryLogin: T_AD_HISTORY_LOGIN[] = [];

  constructor(private _service: T_AD_HISTORY_LOGIN_Service, private router: Router, private route: ActivatedRoute) { }

  pipe = new DatePipe('en-US');

  date : OnChangDate = {
    startDate : this.pipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
    finishDate : this.pipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
  }
  ngOnInit(): void {
    ShowLoading()
    this._service.searchHistoryLogin(this.date)
      .subscribe({
        next: (response) => {
          this.lstHistoryLogin = response;
          this.lstHistoryLogin.map((item) => {
            item.LOGIN_TIME = this.pipe.transform(item.LOGIN_TIME, 'dd/MM/yyyy hh:mm:ss') ?? '';
          })
        },
        error: (response) => {
          console.log(response)
        }
      })
    HideLoading();
  }

  onChangeStartDate(event : any){
    this.date.startDate = event.target.value;
    this._service.searchHistoryLogin(this.date)
      .subscribe({
        next: (response) => {
          this.lstHistoryLogin = response;
          this.lstHistoryLogin.map((item) => {
            item.LOGIN_TIME = this.pipe.transform(item.LOGIN_TIME, 'dd/MM/yyyy hh:mm:ss') ?? '';
          })
        },
        error: (response) => {
          console.log(response)
        }
      })
  }
  onChangeFinishDate(event : any){
    this.date.finishDate = event.target.value;
    this._service.searchHistoryLogin(this.date)
    .subscribe({
      next: (response) => {
        this.lstHistoryLogin = response;
        this.lstHistoryLogin.map((item) => {
          item.LOGIN_TIME = this.pipe.transform(item.LOGIN_TIME, 'dd/MM/yyyy hh:mm:ss') ?? '';
        })
      },
      error: (response) => {
        console.log(response)
      }
    })
  }
}
