import { Component, OnInit } from '@angular/core';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';
import { T_AD_USER_Service } from 'src/app/services/AD/T_AD_USER.service';

declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  constructor(private _service: T_AD_USER_Service) { }

  listUser: T_AD_USER[] = [];

  ngOnInit(): void {
    this._service.getListUser()
      .subscribe({
        next: (response) => {
          this.listUser = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  pageSize : number = 15;
  page : number = this.listUser.length / this.pageSize;
}
