import { Component, OnInit } from '@angular/core';
import { UserFilter } from 'src/app/@filter/AD/user-filter.model';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';
import { UserService } from 'src/app/services/AD/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  constructor(private _service: UserService) { }

  listUser: T_AD_USER[] = [];
  filter: UserFilter = {
    CurrentPage: 1,
    TotalPage: 0,
    ItemCount: 0,
    PageSize: 15,
    KeySearch: 'Empty',
    Data: []
  }

  ngOnInit(): void {
    this._service.getListUser(this.filter)
      .subscribe({
        next: (response) => {
          this.listUser = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }

  searchUser(event: any) {
    this.filter.CurrentPage = 1;
    if (event.target.value) {
      this.filter.KeySearch = event.target.value;
    } else {
      this.filter.KeySearch = "Empty"
    }

    console.log(this.filter.KeySearch)
    this._service.getListUser(this.filter)
      .subscribe({
        next: (response) => {
          this.listUser = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }
  onChangePage(event: any) {
    this.filter.CurrentPage = event;
    this._service.getListUser(this.filter)
      .subscribe({
        next: (response) => {
          this.listUser = response.Data.Data;
          this.filter = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }
}