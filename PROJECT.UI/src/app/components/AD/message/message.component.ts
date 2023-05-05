import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_AD_MESSAGE } from 'src/app/models/AD/T_AD_MESSAGE.model';
import { MessageService } from 'src/app/services/AD/message.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  lstMessage: T_AD_MESSAGE[] = [];

  addItemRequest: T_AD_MESSAGE = {
    PKID: '',
    CODE: '',
    LANGUAGE: '',
    TYPE:'',
    MESSAGE_DETAIL:'',
    MESSAGE:'',
    ACTIVE: 'Y',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_AD_MESSAGE = {
    PKID: '',
    CODE: '',
    LANGUAGE: '',
    MESSAGE:'',
    ACTIVE: 'Y',
    TYPE:'',
    MESSAGE_DETAIL:'',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: MessageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListMessage()
      .subscribe({
        next: (response) => {
          this.lstMessage = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteMessage(code: string) {
    Swal.fire({
      title: 'Xoá Messaage?',
      text: "Bạn có chắc muốn xoá Message! Hành động này sẽ không được hoàn tác?",
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
        this._service.deleteMessage(code)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess("Xoá thành công message khỏi hệ thống!")
            }
          })
      } else {
        return;
      }
    })

  }

  createMessage() {
    this._service.createMessage(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới message thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailMessage(code: string) {
    if (code) {
      this._service.getDetailMessage(code)
        .subscribe({
          next: (response) => {
            this.itemDetail = response
          }
        })
    }
  }

  updateMessage() {
    this._service.updateMessage(this.itemDetail?.PKID, this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Message thành công!`);
        }
      })
  }

  searchMessage(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchMessage(key)
      .subscribe({
        next: (response) => {
          this.lstMessage = response
        }
      })
  }
}
