import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_VENDOR } from 'src/app/models/MD/T_MD_VENDOR.model';
import { T_MD_VENDOR_Service } from 'src/app/services/MD/T_MD_VENDOR.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response: string): any
declare function MessageDanger(response: string): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-test-list',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  lstVendor: T_MD_VENDOR[] = [];

  addItemRequest: T_MD_VENDOR = {
    CODE: '',
    NAME: '',
    SHORT_NAME: '',
    MST: '',
    EMAIL: '',
    PHONE: '',
    ADDRESS: '',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_MD_VENDOR = {
    CODE: '',
    NAME: '',
    SHORT_NAME: '',
    MST: '',
    EMAIL: '',
    PHONE: '',
    ADDRESS: '',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  pageSize = 15;
  page = this.lstVendor.length / 15;

  constructor(private _service: T_MD_VENDOR_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    ShowLoading();
    this._service.getListVendor()
      .subscribe({
        next: (response) => {
          this.lstVendor = response;
          HideLoading();
        },
        error: (response) => {
          console.log(response)
          HideLoading();
        }
      })
  }

  createVendor() {
    this._service.createVendor(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới thông tin Thầu phụ thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailVendor(code: string) {
    if (code) {
      this._service.getDetailVendor(code)
        .subscribe({
          next: (response) => {
            this.itemDetail = response
          }
        })
    }
  }

  updateVendor() {
    this._service.updateVendor(this.itemDetail?.CODE, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật thông tin Thầu phụ thành công!`);
        }
      })
  }

  searchVendor(event: any) {
    var key = event.target.value;
    if (!key) {
      key = 'Empty'
    }
    this._service.searchVendor(key)
      .subscribe({
        next: (response) => {
          this.lstVendor = response
        }
      })
  }
}
