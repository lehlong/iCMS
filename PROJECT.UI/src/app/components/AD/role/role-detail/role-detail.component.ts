import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { T_AD_ROLE } from 'src/app/models/AD/T_AD_ROLE.model';
import { T_AD_ROLE_Service } from 'src/app/services/AD/T_AD_ROLE.service';
import { environment } from 'src/environments/environment';

declare function MessageSuccess(response: string): any
declare function MessageDanger(response: string): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-Role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

  roleDetail: T_AD_ROLE = {
    CODE: '',
    NAME: '',
    NOTES: '',
    ACTIVE: '',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  constructor(private route: ActivatedRoute, private _service: T_AD_ROLE_Service) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const code = params.get('code');
        if (code) {
          this._service.getRoleDetail(code)
            .subscribe({
              next: (response) => {
                this.roleDetail = response;
                buildTree(response.CODE);
              }
            });
        }
      }
    })
  }

  updateRole() {
    ShowLoading();
    this._service.updateRole(this.roleDetail?.CODE, this.roleDetail)
      .subscribe({
        next: (response) => {
          HideLoading();
          MessageSuccess('Cập nhật thông tin Role thành công');
          this.ngOnInit();
        },
        error: (response) => {
          HideLoading();
          MessageDanger('Role chưa được cập nhật! Đã có lỗi xảy ra!')
        }
      })
  }

  updateRightOfRole(){
    updateRightOfRole(this.roleDetail.CODE);
  }
}

var setting = {
  check: {
    enable: true,
    chkboxType: { "Y": "ps", "N": "ps" }
  },
  view: {
    selectedMulti: false,
    nameIsHTML: true,
    showTitle: false
  },
  data: {
    simpleData: {
      enable: true
    }
  }
};

function buildTree(code: string) {
  $.ajax({
    type: 'GET',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Role/BuildTree/${code}`,
    success: function (data) {
      ($.fn as any).zTree.init($("#treeRight"), setting, data);
    }
  });
};

function updateRightOfRole(code: string) {
  ShowLoading();
  var zTree = ($.fn as any).zTree.getZTreeObj("treeRight");
  var nodeChecked = zTree.getCheckedNodes(true);
  var arr : any = [];
  $.each(nodeChecked, function (i, val) {
    arr.push(nodeChecked[i].id);
  });

  $.ajax({
    type: 'POST',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Role/UpdateRightOfRole/${code}/${JSON.stringify(arr)}`, 
    success: function (response) {
      HideLoading();
      MessageSuccess('Cập nhật thông tin thành công!')
    },
    error: function(response){
      HideLoading()
      MessageDanger('Đã có lỗi xảy ra!')
    }
  });
}