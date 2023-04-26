import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_CUSTOMER } from 'src/app/models/MD/T_MD_CUSTOMER.model';
import { T_MD_CUSTOMER_Service } from 'src/app/services/MD/T_MD_CUSTOMER.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response: string): any
declare function MessageDanger(response: string): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-test-list',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  lstCustomer: T_MD_CUSTOMER[] = [];
  lstCustomerSearch: T_MD_CUSTOMER[] = [];

  addItemRequest: T_MD_CUSTOMER = {
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
  itemDetail: T_MD_CUSTOMER = {
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
  page = this.lstCustomer.length / 15;

  constructor(private _service: T_MD_CUSTOMER_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    ShowLoading();
    this._service.getListCustomer()
      .subscribe({
        next: (response) => {
          this.lstCustomer = response;
          this.lstCustomerSearch = response;
          HideLoading();
        },
        error: (response) => {
          console.log(response)
          HideLoading();
        }
      })
  }

  createCustomer() {
    this._service.createCustomer(this.addItemRequest)
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

  getDetailCustomer(code: string) {
    var detail = this.lstCustomer.find(item => item.CODE == code);
    if (detail) {
      this.itemDetail = detail
    }
  }

  updateCustomer() {
    this._service.updateCustomer(this.itemDetail?.CODE, this.itemDetail)
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

  searchCustomer(event: any) {
    var key = event.target.value.toLowerCase();
    if (!key) {
      this.lstCustomerSearch = this.lstCustomer;
    } else {
      var result = this.lstCustomer.filter(x => x.CODE.toLowerCase().includes(key) 
      || x.NAME.toLowerCase().includes(key) || x.MST.toLowerCase().includes(key)
      || x.SHORT_NAME?.includes(key) || x.EMAIL?.includes(key)
      || x.PHONE?.includes(key) || x.ADDRESS?.includes(key));

      if (result) {
        this.lstCustomerSearch = result;
      }
    }
  }
}
