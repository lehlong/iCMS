import { Component, OnInit } from '@angular/core';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';
import { UserService } from 'src/app/services/AD/user.service';
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  constructor(private _service: UserService) { }

  listUser: T_AD_USER[] = [];

  ngOnInit(): void {
    this._service.getListUser()
      .subscribe({
        next: (response) => { this.listUser = response.Data;},
        error: (response) => { console.log(response);}
      })
  }

  pageSize : number = 15;
  page : number = this.listUser.length / this.pageSize;

  searchUser(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchUser(key)
      .subscribe({
        next: (response) => {
          this.listUser = response
        }
      })
  }
}
