import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_UNIT } from 'src/app/models/MD/T_MD_UNIT.model';
import { T_MD_UNIT_Service } from 'src/app/services/MD/T_MD_UNIT.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'
import { JwtHelperService } from '@auth0/angular-jwt';

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  lstUnit: T_MD_UNIT[] = [];

  addItemRequest: T_MD_UNIT = {
    CODE: '',
    NAME: '',
    SKF: '',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_MD_UNIT = {
    CODE: '',
    NAME: '',
    SKF: '',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: T_MD_UNIT_Service, private router: Router, private route: ActivatedRoute,private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
    this._service.getListUnit()
      .subscribe({
        next: (response) => {
          this.lstUnit = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteUnit(code: string) {
    Swal.fire({
      title: 'Xoá đơn vị tính?',
      text: "Bạn có chắc muốn xoá đơn vị tính! Hành động này sẽ không được hoàn tác?",
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
        this._service.deleteUnit(code)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess("Xoá thành công Đơn vị tính khỏi hệ thống!")
            }
          })
      } else {
        return;
      }
    })

  }

  createUnit() {
    this._service.createUnit(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới đơn vị tính thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailUnit(code: string) {
    if (code) {
      this._service.getDetailUnit(code)
        .subscribe({
          next: (response) => {
            this.itemDetail = response
          }
        })
    }
  }

  updateUnit() {
    this._service.updateUnit(this.itemDetail?.CODE, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Đơn vị tính thành công!`);
        }
      })
  }

  searchUnit(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchUnit(key)
      .subscribe({
        next: (response) => {
          this.lstUnit = response
        }
      })
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      this.router.navigate(['Login']);
      return false;
    }
  }
}
