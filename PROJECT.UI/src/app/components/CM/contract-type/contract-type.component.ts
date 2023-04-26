import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_CM_CONTRACT_TYPE } from 'src/app/models/CM/T_CM_CONTRACT_TYPE.model';
import { T_CM_CONTRACT_TYPE_Service } from 'src/app/services/CM/T_CM_CONTRACT_TYPE.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-contract-type',
  templateUrl: './contract-type.component.html',
  styleUrls: ['./contract-type.component.css']
})
export class ContractTypeComponent implements OnInit {
  lstContractType: T_CM_CONTRACT_TYPE[] = [];
  lstContractTypeSearch: T_CM_CONTRACT_TYPE[] = [];

  addItemRequest: T_CM_CONTRACT_TYPE = {
    CODE: '',
    NAME: '',
    IS_CUSTOMER: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_CM_CONTRACT_TYPE = {
    CODE: '',
    NAME: '',
    IS_CUSTOMER: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: T_CM_CONTRACT_TYPE_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListContractType()
      .subscribe({
        next: (response) => {
          this.lstContractType = response;
          this.lstContractTypeSearch = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteContractType(code: string) {
    Swal.fire({
      title: 'Xoá Loại hợp đồng?',
      text: "Bạn có chắc muốn xoá Loại hợp đồng! Hành động này sẽ không được hoàn tác?",
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
        this._service.deleteContractType(code)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess("Xoá thành công Loại hợp đồng khỏi hệ thống!")
            }
          })
      } else {
        return;
      }
    })

  }

  createContractType() {
    this._service.createContractType(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới Loại hợp đồng thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailContractType(code: string) {
    var detail = this.lstContractType.find(item => item.CODE == code);
    if (detail) {
      this.itemDetail = detail
    }
  }

  updateContractType() {
    this._service.updateContractType(this.itemDetail?.CODE, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Loại hợp đồng thành công!`);
        }
      })
  }

  searchContractType(event: any) {
    var key = event.target.value;
    if (!key) {
      this.lstContractTypeSearch = this.lstContractType;
    } else {
      var result = this.lstContractType.filter(x => x.CODE.toLowerCase().includes(key.toLowerCase()) || x.NAME.toLowerCase().includes(key.toLowerCase()))
      if (result) {
        this.lstContractTypeSearch = result;
      }
    }
  }
}
