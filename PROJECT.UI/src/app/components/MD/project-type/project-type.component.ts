import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_PROJECT_TYPE } from 'src/app/models/MD/T_MD_PROJECT_TYPE.model';
import { T_MD_PROJECT_TYPE_Service } from 'src/app/services/MD/T_MD_PROJECT_TYPE.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './project-type.component.html',
  styleUrls: ['./project-type.component.css']
})
export class ProjectTypeComponent implements OnInit {
  lstProjectType: T_MD_PROJECT_TYPE[] = [];

  addItemRequest: T_MD_PROJECT_TYPE = {
    CODE: '',
    NAME: '',
    ACTIVE: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_MD_PROJECT_TYPE = {
    CODE: '',
    NAME: '',
    ACTIVE: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: T_MD_PROJECT_TYPE_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListProjectType()
      .subscribe({
        next: (response) => {
          this.lstProjectType = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteProjectType(code: string) {
    Swal.fire({
      title: 'Xoá Loại dự án?',
      text: "Bạn có chắc muốn xoá Loại dự án! Hành động này sẽ không được hoàn tác?",
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
        this._service.deleteProjectType(code)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess("Xoá thành công Loại dự án khỏi hệ thống!")
            }
          })
      } else {
        return;
      }
    })

  }

  createProjectType() {
    this._service.createProjectType(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới Loại dự án thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailProjectType(code: string) {
    if (code) {
      this._service.getDetailProjectType(code)
        .subscribe({
          next: (response) => {
            this.itemDetail = response
          }
        })
    }
  }

  updateProjectType() {
    this._service.updateProjectType(this.itemDetail?.CODE, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Loại dự án thành công!`);
        }
      })
  }

  searchProjectType(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchProjectType(key)
      .subscribe({
        next: (response) => {
          this.lstProjectType = response
        }
      })
  }
}
