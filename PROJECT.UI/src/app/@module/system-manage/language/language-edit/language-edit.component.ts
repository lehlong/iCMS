import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { T_AD_LANGUAGE_TRANSLATE } from 'src/app/models/AD/T_AD_LANGUAGE_TRANSLATE.model';
import { TranferObject } from 'src/app/models/Common/tranfer-object.model';
import { LanguageService } from 'src/app/services/AD/language.service';
declare function Message(response: TranferObject): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-language-edit',
  templateUrl: './language-edit.component.html',
})
export class LanguageEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private _service: LanguageService) { }
  itemDetail: T_AD_LANGUAGE_TRANSLATE = {
    ID: '00000000-0000-0000-0000-000000000000',
    KEY: '',
    LANGUAGE: '',
    CONTENT: '',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  ngOnInit(): void {
    ShowLoading();
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this._service.getLanguageTranslateDetail(id)
            .subscribe({
              next: (response) => { this.itemDetail = response; HideLoading(); },
              error: (response) => { console.log(response); HideLoading(); }
            });
        }
      }
    })
  }
  updateLanguageTranslate() {
    ShowLoading();
    this._service.updateLanguageTranslate(this.itemDetail)
      .subscribe({
        next: (response) => {
          Message(response)
          this.router.navigate(['SystemManage/Language/List'])
        }
      })
  }
}
