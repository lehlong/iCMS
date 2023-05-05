import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_AD_LANGUAGE_TRANSLATE } from 'src/app/models/AD/T_AD_LANGUAGE_TRANSLATE.model';
import { LanguageService } from 'src/app/services/AD/language.service';
import * as jQuery from 'jquery';
import { TranslateService } from '@ngx-translate/core';

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-language-translate',
  templateUrl: './language-translate.component.html',
  styleUrls: ['./language-translate.component.css']
})
export class LanguageTranslateComponent implements OnInit {
  
  lstLanguageTranslate: T_AD_LANGUAGE_TRANSLATE[] = [];
  lstLanguageTranslateSearch: T_AD_LANGUAGE_TRANSLATE[] = [];

  addItemRequest: T_AD_LANGUAGE_TRANSLATE = {
    ID: '00000000-0000-0000-0000-000000000000',
    KEY: '',
    LANGUAGE: '',
    CONTENT:'',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  itemDetail: T_AD_LANGUAGE_TRANSLATE = {
    ID: '00000000-0000-0000-0000-000000000000',
    KEY: '',
    LANGUAGE: '',
    CONTENT:'',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private _service: LanguageService, private router: Router, private route: ActivatedRoute, public translate: TranslateService) { }

  ngOnInit(): void {
    this._service.getListLanguageTranslate()
      .subscribe({
        next: (response) => {
          this.lstLanguageTranslate = response;  
          this.lstLanguageTranslateSearch = response;       
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  pageSize = 15;
  page = this.lstLanguageTranslateSearch.length / 15;

  createLanguageTranslate() {
    this._service.createLanguageTranslate(this.addItemRequest)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess("Thêm mới thông tin thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }

  getDetailLanguageTranslate(code: string) {
    var detail = this.lstLanguageTranslate.find(item => item.ID == code);
    if (detail) {
      this.itemDetail = detail
    }
  }

  updateLanguageTranslate() {
    this._service.updateLanguageTranslate(this.itemDetail)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật thông tin thành công!`);
        }
      })
  }

  searchLanguageTranslate(event: any) {
    var key = event.target.value;
    if (!key) {
      this.lstLanguageTranslateSearch = this.lstLanguageTranslate;
    } else {
      var result = this.lstLanguageTranslate.filter(x => x.KEY.toLowerCase().includes(key.toLowerCase()) || x.CONTENT.toLowerCase().includes(key.toLowerCase()) || x.LANGUAGE.toLocaleLowerCase().includes(key.toLocaleLowerCase()))
      if (result) {
        this.lstLanguageTranslateSearch = result;
      }
    }
  }
}
