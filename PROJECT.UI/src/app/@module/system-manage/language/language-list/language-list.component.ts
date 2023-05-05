import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { T_AD_LANGUAGE_TRANSLATE } from 'src/app/models/AD/T_AD_LANGUAGE_TRANSLATE.model';
import { LanguageService } from 'src/app/services/AD/language.service';
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
})
export class LanguageListComponent implements OnInit {
  lstLanguageTranslate: T_AD_LANGUAGE_TRANSLATE[] = [];
  constructor(private _service: LanguageService, public translate: TranslateService) { }
  ngOnInit(): void {
    ShowLoading()
    this._service.getListLanguageTranslate()
      .subscribe(
        {
          next: (response) => { this.lstLanguageTranslate = response; HideLoading() },
          error: (response) => { console.log(response); HideLoading(); }
        })
  }
  pageSize = 15;
  page = this.lstLanguageTranslate.length / 15;
}
