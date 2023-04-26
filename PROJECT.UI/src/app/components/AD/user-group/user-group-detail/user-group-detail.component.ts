import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { T_AD_ROLE } from 'src/app/models/AD/T_AD_ROLE.model';
import { T_AD_USER } from 'src/app/models/AD/T_AD_USER.model';
import { T_AD_USER_GROUP } from 'src/app/models/AD/T_AD_USER_GROUP.model';
import { T_AD_USER_GROUP_ROLE } from 'src/app/models/AD/T_AD_USER_GROUP_ROLE.model';
import { T_AD_USER_USER_GROUP } from 'src/app/models/AD/T_AD_USER_USER_GROUP.model';
import { T_AD_USER_Service } from 'src/app/services/AD/T_AD_USER.service';
import { T_AD_USER_GROUP_Service } from 'src/app/services/AD/T_AD_USER_GROUP.service';
import { T_AD_USER_GROUP_ROLE_Service } from 'src/app/services/AD/T_AD_USER_GROUP_ROLE.service';
import { T_AD_USER_USER_GROUP_Service } from 'src/app/services/AD/T_AD_USER_USER_GROUP.service';
import Swal from 'sweetalert2'

declare function MessageSuccess(response: string): any
declare function MessageDanger(response: string): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-user-group-detail',
  templateUrl: './user-group-detail.component.html',
  styleUrls: ['./user-group-detail.component.css']
})
export class UserGroupDetailComponent implements OnInit {

  userGroupDetail: T_AD_USER_GROUP = {
    CODE: '',
    NAME: '',
    NOTES: '',
    ACTIVE: '',
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }

  userGroupRole: T_AD_USER_GROUP_ROLE[] = []
  userGroupRoleForAdd: T_AD_ROLE[] = []
  userOfGroup: T_AD_USER[] = []
  lstUserForAdd: T_AD_USER[] = []
  lstUserForAddFilter: T_AD_USER[] = this.lstUserForAdd;

  constructor(private route: ActivatedRoute, private _service: T_AD_USER_GROUP_Service,
    private _serviceUserGroupRole: T_AD_USER_GROUP_ROLE_Service,
    private _serviceUserUserGroup: T_AD_USER_USER_GROUP_Service,
    private _serviceUser: T_AD_USER_Service) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const code = params.get('code');
        if (code) {
          this._service.getUserGroupDetail(code)
            .subscribe({
              next: (response) => {
                this.userGroupDetail = response;
              }
            });
          this._serviceUserGroupRole.getListUserGroupRole(code)
            .subscribe({
              next: (response) => {
                this.userGroupRole = response;
              }
            });
          this._serviceUserUserGroup.getListUserUserGroup(code)
            .subscribe({
              next: (response) => {
                this.userOfGroup = response;
              }
            });
          this._serviceUserUserGroup.getListUserForAdd(code)
            .subscribe({
              next: (response) => {
                this.lstUserForAdd = response;
                this.lstUserForAddFilter = response;
              }
            });
        }
      }
    });
  }

  searchUserForAdd(event : any){
    var key = event.target.value;
    if(!key){
      this.lstUserForAddFilter = this.lstUserForAdd
    }else{
      this.lstUserForAddFilter = this.lstUserForAdd.filter(x => x.USER_NAME.includes(key) || x.FULL_NAME.includes(key))
    }
  }

  updateUserGroup() {
    ShowLoading();
    this._service.updateUserGroup(this.userGroupDetail?.CODE, this.userGroupDetail)
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

  getListUserGroupRoleForAdd() {
    this._serviceUserGroupRole.getListUserGroupRoleForAdd(this.userGroupRole)
      .subscribe({
        next: (response) => {
          this.userGroupRoleForAdd = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  addRoleToUserGroup(userGroupUser: string, roleCode: string) {
    this._serviceUserGroupRole.addRoleToUserGroup(userGroupUser, roleCode)
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

  addUserToUserGroup(userGroupUser: string, username: string) {
    this._serviceUserUserGroup.addUserToUserGroup(userGroupUser, username)
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

  deleteRoleToUserGroup(userGroupUser: string, roleCode: string) {
    Swal.fire({
      title: 'Xoá Khu vực?',
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
        this._serviceUserGroupRole.deleteRoleToUserGroup(userGroupUser, roleCode)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              jQuery(".btn-close").click();
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

  deleteUserToUserGroup(userGroupUser: string, username: string) {
    Swal.fire({
      title: 'Xoá Khu vực?',
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
        this._serviceUserUserGroup.deleteUserUserGroup(userGroupUser, username)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              jQuery(".btn-close").click();
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
}
