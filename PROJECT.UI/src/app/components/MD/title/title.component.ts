import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_TITLE } from 'src/app/models/MD/T_MD_TITLE.model';
import { T_MD_TITLE_Service } from 'src/app/services/MD/T_MD_TITLE.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  lstTitle: T_MD_TITLE[] = [];

  addItemRequest: T_MD_TITLE = {
    CODE: '',
    NAME: '',
    ACTIVE: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_MD_TITLE = {
    CODE: '',
    NAME: '',
    ACTIVE: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: T_MD_TITLE_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListTitle()
      .subscribe({
        next: (response) => {
          this.lstTitle = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteTitle(code: string) {
    Swal.fire({
      title: 'Xoá Chức danh?',
      text: "Bạn có chắc muốn xoá Chức danh! Hành động này sẽ không được hoàn tác?",
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
        this._service.deleteTitle(code)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess("Xoá thành công Chức danh khỏi hệ thống!")
            }
          })
      } else {
        return;
      }
    })

  }

  createTitle() {
    this._service.createTitle(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới Chức danh thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailTitle(code: string) {
    if (code) {
      this._service.getDetailTitle(code)
        .subscribe({
          next: (response) => {
            this.itemDetail = response
          }
        })
    }
  }

  updateTitle() {
    this._service.updateTitle(this.itemDetail?.CODE, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Chức danh thành công!`);
        }
      })
  }

  searchTitle(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchTitle(key)
      .subscribe({
        next: (response) => {
          this.lstTitle = response
        }
      })
  }
}
