import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { T_AD_ORGANIZE } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';
import { T_AD_USER_GROUP } from 'src/app/models/AD/T_AD_USER_GROUP.model';
import { Select } from 'src/app/models/Common/select.model';
import { OrganizeService } from 'src/app/services/AD/organize.service';
import { UserService } from 'src/app/services/AD/user.service';
import { T_AD_USER_GROUP_Service } from 'src/app/services/AD/T_AD_USER_GROUP.service';
import { T_AD_USER_USER_GROUP_Service } from 'src/app/services/AD/T_AD_USER_USER_GROUP.service';
import { T_MD_TITLE_Service } from 'src/app/services/MD/T_MD_TITLE.service';
import { T_MD_VENDOR_Service } from 'src/app/services/MD/T_MD_VENDOR.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

declare function MessageSuccess(response: string): any
declare function MessageDanger(response: string): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userDetail: T_AD_USER = {
    USER_NAME: '',
    PASSWORD: '',
    ACCOUNT_AD: '',
    FULL_NAME: '',
    EMAIL: '',
    ADDRESS: '',
    PHONE: '',
    NOTES: '',
    ACTIVE: 'Y',
    OTP_VERIFY: '',
    USER_TYPE: '',
    TITLE_CODE: '',
    COMPANY_ID: '',
    IS_MODIFY_RIGHT: '',
    VENDOR_CODE: '',
    USER_SAP: '',
    PASSWORD_SAP: '',
    LAST_CHANGE_PASS_DATE: new Date(),
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  lstUserGroup : T_AD_USER_GROUP[] = [];
  lstUserGroupForAdd : T_AD_USER_GROUP[] = [];

  dataTitle: Select[] = [];
  dataVendor: Select[] = [];
  dataCP: Select[] = [];
  dataBP: Select[] = [];

  organizeId: string = '';

  constructor(private route: ActivatedRoute, private _service: UserService,
    private _serviceTitle: T_MD_TITLE_Service, private _serviceVendor: T_MD_VENDOR_Service,
    private _serviceOrganize: OrganizeService, private _serviceUserUserGroup : T_AD_USER_USER_GROUP_Service,
    private _serviceUserGroup : T_AD_USER_GROUP_Service) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const username = params.get('username');
        if (username) {
          this._service.getDetailUser(username)
            .subscribe({
              next: (response) => {
                this.userDetail = response;
              }
            });
          this._serviceTitle.getListTitle()
            .subscribe({
              next: (response) => {
                for (let i in response) {
                  this.dataTitle.push({
                    id: response[i]?.CODE,
                    name: response[i]?.NAME
                  })
                }
              }
            });
          this._serviceVendor.getListVendor()
            .subscribe({
              next: (response) => {
                for (let i in response) {
                  this.dataVendor.push({
                    id: response[i]?.CODE,
                    name: response[i]?.NAME
                  })
                }
              }
            });
          this._serviceOrganize.getListCP()
            .subscribe({
              next: (response) => {
                for (let i in response) {
                  this.dataCP.push({
                    id: response[i]?.PKID,
                    name: response[i]?.NAME
                  })
                }
                console.log(this.dataCP)
              }
            });
          this._serviceOrganize.getListBP()
            .subscribe({
              next: (response) => {
                for (let i in response) {
                  this.dataBP.push({
                    id: response[i]?.PKID,
                    name: response[i]?.NAME
                  })
                }
              }
            })
          this._serviceOrganize.getDataTable()
            .subscribe({
              next: (response) => {
                this.organizeId = response.find(x => x.PKID == this.userDetail.COMPANY_ID)?.PARENT ?? '';
              }
            });
            this._service.getTreeRightUser(username)
            .subscribe({
              next: (response) => {
                buildTreeRight(response)
              }
            });
            this._serviceUserUserGroup.getListUserUserGroupDetail(username)
            .subscribe({
              next: (response) => {
                this.lstUserGroup = response;
              }
            });
        }
      }
    })
  }

  getListUserGroupForAdd(){
    this._serviceUserGroup.getListUserGroupForAdd(this.lstUserGroup)
      .subscribe({
        next: (response) => {
          this.lstUserGroupForAdd = response
        },      
      })
  }

  addUserGroupToUser(username: string, userGroupCode: string) {
    this._service.addUserGroupToUser(username, userGroupCode)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          jQuery(".btn-close").click();
          MessageSuccess('Thêm thành công!')
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  deleteUserGroup(username: string, userGroupCode: string) {
    Swal.fire({
      title: 'Rời khỏi nhóm người dùng?',
      text: "Bạn có chắc muốn xoá Khu vực! Hành động này sẽ không được hoàn tác?",
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
        this._service.deleteUserGroupToUser(username, userGroupCode)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              MessageSuccess('Xoá thành công!')
            },
            error: (response) => {
              console.log(response)
            }
          })
      } else {
        return;
      }
    })
  }

  resetPassword() {
    Swal.fire({
      title: 'Reset Password?',
      text: "Bạn có chắc muốn reset lại password! Hành động này sẽ không được hoàn tác?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Reset',
      cancelButtonText: 'Huỷ',
      focusConfirm: false,
      focusCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        ShowLoading();
        this._service.resetPassword(this.userDetail?.USER_NAME)
          .subscribe({
            next: (response) => {
              HideLoading();
              MessageSuccess('Reset mật khẩu thành công!');
              this.ngOnInit();
            },
            error: (response) => {
              HideLoading();
              MessageDanger('Không reset được mật khẩu! Đã có lỗi xảy ra!')
            }
          })
      } else {
        return;
      }
    })
  }

  updateUser() {
    ShowLoading();
    this._service.updateUser(this.userDetail?.USER_NAME, this.userDetail)
      .subscribe({
        next: (response) => {
          HideLoading();
          MessageSuccess('Cập nhật thông tin user thành công');
          this.ngOnInit();
        },
        error: (response) => {
          HideLoading();
          MessageDanger('User chưa được cập nhật! Đã có lỗi xảy ra!')
        }
      })
  }

  updateRightUser(){
    updateRightUser(this.userDetail?.USER_NAME)
  }

  lockAccount() {
    Swal.fire({
      title: 'Lock account?',
      text: "Bạn có chắc muốn khoá account này! Hành động này sẽ không được hoàn tác?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Khoá',
      cancelButtonText: 'Huỷ',
      focusConfirm: false,
      focusCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        ShowLoading();
        this._service.lockAccount(this.userDetail?.USER_NAME)
          .subscribe({
            next: (response) => {
              HideLoading();
              MessageSuccess('Cập nhật thông tin user thành công');
              this.ngOnInit();
            },
            error: (response) => {
              HideLoading();
              MessageDanger('User chưa được cập nhật! Đã có lỗi xảy ra!')
            }
          })
      } else {
        return;
      }
    })
  }

  activeAccount() {
    Swal.fire({
      title: 'Active account?',
      text: "Bạn có chắc muốn mở lại tài khoản này! Hành động này sẽ không được hoàn tác?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Active',
      cancelButtonText: 'Huỷ',
      focusConfirm: false,
      focusCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        ShowLoading();
        this._service.activeAccount(this.userDetail?.USER_NAME)
          .subscribe({
            next: (response) => {
              HideLoading();
              MessageSuccess('Cập nhật thông tin user thành công');
              this.ngOnInit();
            },
            error: (response) => {
              HideLoading();
              MessageDanger('User chưa được cập nhật! Đã có lỗi xảy ra!')
            }
          })
      } else {
        return;
      }
    })
  }

  restoreDefaultRight() {
    Swal.fire({
      title: 'Lock account?',
      text: "Bạn có chắc muốn khoá account này! Hành động này sẽ không được hoàn tác?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Khoá',
      cancelButtonText: 'Huỷ',
      focusConfirm: false,
      focusCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        ShowLoading();
        this._service.restoreDefaultRight(this.userDetail?.USER_NAME)
          .subscribe({
            next: (response) => {
              HideLoading();
              MessageSuccess('Cập nhật thông tin user thành công');
              this.ngOnInit();
            },
            error: (response) => {
              HideLoading();
              MessageDanger('User chưa được cập nhật! Đã có lỗi xảy ra!')
            }
          })
      } else {
        return;
      }
    })
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
    showTitle: false,
    fontCss: GetFont
  },
  data: {
    simpleData: {
      enable: true
    }
  }
};

function GetFont(treeId: any, node: any) {
  if (node.isRemove == "1") {
    return { color: "red" };
  }
  else if (node.isAdd == "1") {
    return { color: "blue" };
  } else {
    return null
  }
}

function buildTreeRight(dataTree: any){
  ($.fn as any).zTree.init($("#treeRight"), setting, dataTree);
}

function updateRightUser(username: string){
  var zTree = ($.fn as any).zTree.getZTreeObj("treeRight");
  var nodeChange = zTree.getChangeCheckedNodes(true);
  var arrRight: any[] = [];
  var arrStatus: any[] = [];
  $.each(nodeChange, function (i, val) {
      arrRight.push(nodeChange[i].id);
      arrStatus.push(nodeChange[i].checked);
  });

  $.ajax({
    type: 'POST',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/User/UpdateRightOfUser/${username}/${JSON.stringify(arrRight)}/${JSON.stringify(arrStatus)}`,
    success: function (response) {
      MessageSuccess('Cập nhật quyền thành công!');
      HideLoading();
    },
    error: function(response){
      MessageDanger('Cập nhật thất bại! Đã có lỗi xảy ra!');
      console.log(response)
      HideLoading();
    }
  });
}