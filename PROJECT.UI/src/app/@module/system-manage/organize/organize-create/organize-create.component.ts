import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { T_AD_ORGANIZE } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { TranferObject } from 'src/app/models/Common/tranfer-object.model';
import { T_AD_ORGANIZE_Service } from 'src/app/services/AD/T_AD_ORGANIZE.service';
declare function Message(response: TranferObject): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-organize-create',
  templateUrl: './organize-create.component.html'
})
export class OrganizeCreateComponent {
  constructor(private route: ActivatedRoute, private router: Router, private _service: T_AD_ORGANIZE_Service){}
  itemCreate: T_AD_ORGANIZE = {
    PKID: '',
    COMPANY_CODE: '',
    PARENT: '',
    NAME: '',
    TYPE: '',
    C_ORDER: 0,
    COST_CENTER_CODE: '',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  createOrganize(){
    ShowLoading();
    this._service.createOrganize(this.itemCreate)
      .subscribe({
        next: (response) => {
          Message(response)
          this.router.navigate(['SystemManage/Organize/List'])
        }
      })
  }
}
