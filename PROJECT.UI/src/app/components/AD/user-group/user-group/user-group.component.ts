import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_AD_USER_GROUP } from 'src/app/models/AD/T_AD_USER_GROUP.model';
import { T_AD_USER_GROUP_Service } from 'src/app/services/AD/T_AD_USER_GROUP.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {
  lstUserGroup: T_AD_USER_GROUP[] = [];

  addItemRequest: T_AD_USER_GROUP = {
    CODE: '',
    NAME: '',
    NOTES: '',
    ACTIVE:'',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  constructor(private _service: T_AD_USER_GROUP_Service, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this._service.getListUserGroup()
      .subscribe({
        next: (response) => {
          this.lstUserGroup = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  createUserGroup() {
    this._service.createUserGroup(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới Khu vực thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  searchUserGroup(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchUserGroup(key)
      .subscribe({
        next: (response) => {
          this.lstUserGroup = response
        }
      })
  }
}
