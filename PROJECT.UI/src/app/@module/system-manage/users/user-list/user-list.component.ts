import { Component, OnInit } from '@angular/core';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';
import { Pagination } from 'src/app/models/Common/pagination.model';
import { UserService } from 'src/app/services/AD/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  constructor(private _service: UserService) { }

  listUser: T_AD_USER[] = [];
  pagination: Pagination = {
    CurrentPage: 1,
    TotalPage: 0,
    ItemCount: 0,
    PageSize: 15,
    KeySearch: 'Empty',
    Data: []
  }

  ngOnInit(): void {
    this._service.getListUser(this.pagination)
      .subscribe({
        next: (response) => {
          this.listUser = response.Data.Data;
          this.pagination = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }

  searchUser(event: any) {
    this.pagination.CurrentPage = 1;
    if (event.target.value) {
      this.pagination.KeySearch = event.target.value;
    } else {
      this.pagination.KeySearch = "Empty"
    }

    console.log(this.pagination.KeySearch)
    this._service.getListUser(this.pagination)
      .subscribe({
        next: (response) => {
          this.listUser = response.Data.Data;
          this.pagination = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }
  onChangePage(event: any) {
    this.pagination.CurrentPage = event;
    this._service.getListUser(this.pagination)
      .subscribe({
        next: (response) => {
          this.listUser = response.Data.Data;
          this.pagination = response.Data;
        },
        error: (response) => { console.log(response); }
      });
  }
}
