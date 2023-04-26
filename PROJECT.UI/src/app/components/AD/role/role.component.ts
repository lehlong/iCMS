import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_AD_ROLE } from 'src/app/models/AD/T_AD_ROLE.model';
import { T_AD_ROLE_Service } from 'src/app/services/AD/T_AD_ROLE.service';
import * as jQuery from 'jquery';

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  lstRole: T_AD_ROLE[] = [];

  addItemRequest: T_AD_ROLE = {
    CODE: '',
    NAME: '',
    NOTES: '',
    ACTIVE:'',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  
  constructor(private _service: T_AD_ROLE_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListRole()
      .subscribe({
        next: (response) => {
          this.lstRole = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  createRole() {
    this._service.createRole(this.addItemRequest)
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

  searchRole(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchRole(key)
      .subscribe({
        next: (response) => {
          this.lstRole = response
        }
      })
  }
}
