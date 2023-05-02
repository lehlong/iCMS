import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { T_AD_ORGANIZE } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { TranferObject } from 'src/app/models/Common/tranfer-object.model';
import { T_AD_ORGANIZE_Service } from 'src/app/services/AD/T_AD_ORGANIZE.service';

declare function Message(response: TranferObject): any
declare function ShowLoading(): any
declare function HideLoading(): any
@Component({
  selector: 'app-organize-edit',
  templateUrl: './organize-edit.component.html'
})
export class OrganizeEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private _service: T_AD_ORGANIZE_Service) { }
  itemDetail: T_AD_ORGANIZE = {
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
  ngOnInit(): void {
    ShowLoading();
    this.route.paramMap.subscribe({
      next: (params) => {
        console.log(params)
        const id = params.get('code');
        if (id) {
          this._service.getDetailOrganize(id)
            .subscribe({
              next: (response) => { this.itemDetail = response; HideLoading(); },
              error: (response) => { console.log(response); HideLoading(); }
            });
        }
      }
    })
  }
  updateOrganize() {
    ShowLoading();
    this._service.updateOrganize(this.itemDetail)
      .subscribe({
        next: (response) => {
          Message(response)
          this.router.navigate(['SystemManage/Organize/List'])
        }
      })
  }
}
