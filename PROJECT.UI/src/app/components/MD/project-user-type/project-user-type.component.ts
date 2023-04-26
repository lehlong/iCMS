import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_PROJECT_USER_TYPE } from 'src/app/models/MD/T_MD_PROJECT_USER_TYPE.model';
import { T_MD_PROJECT_USER_TYPE_Service } from 'src/app/services/MD/T_MD_PROJECT_USER_TYPE.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './project-user-type.component.html',
  styleUrls: ['./project-user-type.component.css']
})
export class ProjectUserTypeComponent implements OnInit {
  lstProjectUserType: T_MD_PROJECT_USER_TYPE[] = [];

  addItemRequest: T_MD_PROJECT_USER_TYPE = {
    CODE: '',
    NAME: '',
    ACTIVE: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_MD_PROJECT_USER_TYPE = {
    CODE: '',
    NAME: '',
    ACTIVE: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: T_MD_PROJECT_USER_TYPE_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListProjectUserType()
      .subscribe({
        next: (response) => {
          this.lstProjectUserType = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteProjectUserType(code: string) {
    Swal.fire({
      title: 'Xoá Nhóm nhân sự trong dự án?',
      text: "Bạn có chắc muốn xoá Nhóm nhân sự trong dự án! Hành động này sẽ không được hoàn tác?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
      focusConfirm: false,
      focusCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.deleteProjectUserType(code)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess("Xoá thành công Nhóm nhân sự trong dự án khỏi hệ thống!")
            }
          })
      } else {
        return;
      }
    })

  }

  createProjectUserType() {
    this._service.createProjectUserType(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới Nhóm nhân sự trong dự án thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailProjectUserType(code: string) {
    if (code) {
      this._service.getDetailProjectUserType(code)
        .subscribe({
          next: (response) => {
            this.itemDetail = response
          }
        })
    }
  }

  updateProjectUserType() {
    this._service.updateProjectUserType(this.itemDetail?.CODE, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Nhóm nhân sự trong dự án thành công!`);
        }
      })
  }

  searchProjectUserType(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchProjectUserType(key)
      .subscribe({
        next: (response) => {
          this.lstProjectUserType = response
        }
      })
  }
}
