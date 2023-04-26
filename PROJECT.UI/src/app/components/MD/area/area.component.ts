import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_AREA } from 'src/app/models/MD/T_MD_AREA.model';
import { T_MD_AREA_Service } from 'src/app/services/MD/T_MD_AREA.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  lstArea: T_MD_AREA[] = [];

  addItemRequest: T_MD_AREA = {
    CODE: '',
    NAME: '',
    ACTIVE: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_MD_AREA = {
    CODE: '',
    NAME: '',
    ACTIVE: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: T_MD_AREA_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListArea()
      .subscribe({
        next: (response) => {
          this.lstArea = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteArea(code: string) {
    Swal.fire({
      title: 'Xoá Khu vực?',
      text: "Bạn có chắc muốn xoá Khu vực! Hành động này sẽ không được hoàn tác?",
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
        this._service.deleteArea(code)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess("Xoá thành công Khu vực khỏi hệ thống!")
            }
          })
      } else {
        return;
      }
    })

  }

  createArea() {
    this._service.createArea(this.addItemRequest)
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

  getDetailArea(code: string) {
    if (code) {
      this._service.getDetailArea(code)
        .subscribe({
          next: (response) => {
            this.itemDetail = response
          }
        })
    }
  }

  updateArea() {
    this._service.updateArea(this.itemDetail?.CODE, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Khu vực thành công!`);
        }
      })
  }

  searchArea(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchArea(key)
      .subscribe({
        next: (response) => {
          this.lstArea = response
        }
      })
  }
}
