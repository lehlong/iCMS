import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { T_AD_LANGUAGE_TRANSLATE } from 'src/app/models/AD/T_AD_LANGUAGE_TRANSLATE.model';
import { Select } from 'src/app/models/Common/select.model';
import { LanguageService } from 'src/app/services/AD/language.service';

@Component({
  selector: 'app-language-create',
  templateUrl: './language-create.component.html'
})
export class LanguageCreateComponent {
  constructor(private router: Router, private _service: LanguageService) { }
  itemCreate: T_AD_LANGUAGE_TRANSLATE = {
    ID: '00000000-0000-0000-0000-000000000000',
    KEY: '',
    LANGUAGE: '',
    CONTENT: '',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  selectLanguage: Select[] = [
    {
      id: 'vi',
      name: 'vi',
    },
    {
      id: 'en',
      name: 'en',
    }
  ]

  createLanguage() {
    this._service.createLanguageTranslate(this.itemCreate)
      .subscribe({
        next: (response) => {
          this.router.navigate(['SystemManage/Language/List'])
        }
      })
  }
}
