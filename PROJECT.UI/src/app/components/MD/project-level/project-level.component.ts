import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_PROJECT_LEVEL } from 'src/app/models/MD/T_MD_PROJECT_LEVEL.model';
import { T_MD_PROJECT_LEVEL_Service } from 'src/app/services/MD/T_MD_PROJECT_LEVEL.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './project-level.component.html',
  styleUrls: ['./project-level.component.css']
})
export class ProjectLevelComponent implements OnInit {
  lstProjectLevel: T_MD_PROJECT_LEVEL[] = [];

  addItemRequest: T_MD_PROJECT_LEVEL = {
    CODE: '',
    NAME: '',
    VALUE_FROM: '',
    VALUE_TO:'',
    THOI_GIAN:'',
    NOTES:'',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_MD_PROJECT_LEVEL = {
    CODE: '',
    NAME: '',
    VALUE_FROM: '',
    VALUE_TO:'',
    THOI_GIAN:'',
    NOTES:'',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: T_MD_PROJECT_LEVEL_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListProjectLevel()
      .subscribe({
        next: (response) => {
          this.lstProjectLevel = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteProjectLevel(code: string) {
    Swal.fire({
      title: 'Xoá Cấp dự án?',
      text: "Bạn có chắc muốn xoá Cấp dự án! Hành động này sẽ không được hoàn tác?",
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
        this._service.deleteProjectLevel(code)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess("Xoá thành công Cấp dự án khỏi hệ thống!")
            }
          })
      } else {
        return;
      }
    })

  }

  createProjectLevel() {
    this._service.createProjectLevel(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới Cấp dự án thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailProjectLevel(code: string) {
    if (code) {
      this._service.getDetailProjectLevel(code)
        .subscribe({
          next: (response) => {
            this.itemDetail = response
          }
        })
    }
  }

  updateProjectLevel() {
    this._service.updateProjectLevel(this.itemDetail?.CODE, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Cấp dự án thành công!`);
        }
      })
  }

  searchProjectLevel(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchProjectLevel(key)
      .subscribe({
        next: (response) => {
          this.lstProjectLevel = response
        }
      })
  }
}
