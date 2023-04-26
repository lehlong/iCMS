import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_PROJECT_PROFILE } from 'src/app/models/MD/T_MD_PROJECT_PROFILE.model';
import { T_MD_PROJECT_PROFILE_Service } from 'src/app/services/MD/T_MD_PROJECT_PROFILE.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {
  lstProjectProfile: T_MD_PROJECT_PROFILE[] = [];

  addItemRequest: T_MD_PROJECT_PROFILE = {
    ID: '00000000-0000-0000-0000-000000000000',
    COMPANY_CODE :'',
    PROJECT_PROFILE: '',
    PROJECT_TYPE: '',
    FIRST_CHARACTER:'',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_MD_PROJECT_PROFILE = {
    ID: '00000000-0000-0000-0000-000000000000',
    COMPANY_CODE :'',
    PROJECT_PROFILE: '',
    PROJECT_TYPE: '',
    FIRST_CHARACTER:'',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: T_MD_PROJECT_PROFILE_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListProjectProfile()
      .subscribe({
        next: (response) => {
          this.lstProjectProfile = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteProjectProfile(id: string) {
    Swal.fire({
      title: 'Xoá cấu hình Project Profile?',
      text: "Bạn có chắc muốn xoá Project Profile! Hành động này sẽ không được hoàn tác?",
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
        this._service.deleteProjectProfile(id)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess("Xoá thành công Project Profile khỏi hệ thống!")
            }
          })
      } else {
        return;
      }
    })

  }

  createProjectProfile() {
    this._service.createProjectProfile(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới Project Profile thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailProjectProfile(id: string) {
    if (id) {
      this._service.getDetailProjectProfile(id)
        .subscribe({
          next: (response) => {
            this.itemDetail = response
          }
        })
    }
  }

  updateProjectProfile() {
    this._service.updateProjectProfile(this.itemDetail?.ID, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Project Profile thành công!`);
        }
      })
  }

  searchProjectProfile(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchProjectProfile(key)
      .subscribe({
        next: (response) => {
          this.lstProjectProfile = response
        }
      })
  }
}
