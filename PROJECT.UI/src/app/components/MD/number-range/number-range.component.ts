import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_NUMBER_RANGE } from 'src/app/models/MD/T_MD_NUMBER_RANGE.model';
import { T_MD_NUMBER_RANGE_Service } from 'src/app/services/MD/T_MD_NUMBER_RANGE.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './number-range.component.html',
  styleUrls: ['./number-range.component.css']
})
export class NumberRangeComponent implements OnInit {
  lstNumberRange: T_MD_NUMBER_RANGE[] = [];

  addItemRequest: T_MD_NUMBER_RANGE = {
    ID: '00000000-0000-0000-0000-000000000000',
    CHARACTER: '',
    CURRENT_NUMBER: 0,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_MD_NUMBER_RANGE = {
    ID: '00000000-0000-0000-0000-000000000000',
    CHARACTER: '',
    CURRENT_NUMBER: 0,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: T_MD_NUMBER_RANGE_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListNumberRange()
      .subscribe({
        next: (response) => {
          this.lstNumberRange = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteNumberRange(id: string) {
    Swal.fire({
      title: 'Xoá cấu hình Number Range?',
      text: "Bạn có chắc muốn xoá Number Range! Hành động này sẽ không được hoàn tác?",
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
        this._service.deleteNumberRange(id)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess("Xoá thành công Number Range khỏi hệ thống!")
            }
          })
      } else {
        return;
      }
    })

  }

  createNumberRange() {
    this._service.createNumberRange(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới Number Range thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailNumberRange(id: string) {
    if (id) {
      this._service.getDetailNumberRange(id)
        .subscribe({
          next: (response) => {
            this.itemDetail = response
          }
        })
    }
  }

  updateNumberRange() {
    this._service.updateNumberRange(this.itemDetail?.ID, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Number Range thành công!`);
        }
      })
  }

  searchNumberRange(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchNumberRange(key)
      .subscribe({
        next: (response) => {
          this.lstNumberRange = response
        }
      })
  }
}
