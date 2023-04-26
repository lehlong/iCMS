import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { LanguageTranslateComponent } from './components/AD/language-translate/language-translate.component';
import { MessageComponent } from './components/AD/message/message.component';
import { OrganizeGridComponent } from './components/AD/organize/organize-grid/organize-grid.component';
import { OrganizeComponent } from './components/AD/organize/organize.component';
import { RightComponent } from './components/AD/right/right.component';
import { RoleDetailComponent } from './components/AD/role/role-detail/role-detail.component';
import { RoleComponent } from './components/AD/role/role.component';
import { UserGroupDetailComponent } from './components/AD/user-group/user-group-detail/user-group-detail.component';
import { UserGroupComponent } from './components/AD/user-group/user-group/user-group.component';
import { UserDetailComponent } from './components/AD/user/user-detail/user-detail.component';
import { UserComponent } from './components/AD/user/user/user.component';
import { AreaCreateComponent } from './components/MD/area/area-create/area-create.component';
import { AreaComponent } from './components/MD/area/area.component';
import { ContractTypeComponent } from './components/CM/contract-type/contract-type.component';
import { CustomerComponent } from './components/MD/customer/customer.component';
import { NumberRangeComponent } from './components/MD/number-range/number-range.component';
import { ProjectLevelComponent } from './components/MD/project-level/project-level.component';
import { ProjectProfileComponent } from './components/MD/project-profile/project-profile.component';
import { ProjectTypeComponent } from './components/MD/project-type/project-type.component';
import { ProjectUserTypeComponent } from './components/MD/project-user-type/project-user-type.component';
import { TitleComponent } from './components/MD/title/title.component';
import { UnitComponent } from './components/MD/unit/unit.component';
import { VendorComponent } from './components/MD/vendor/vendor.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TemplateContractComponent } from './components/CM/template-contract/template-contract.component';
import { HistoryLoginComponent } from './components/AD/history-login/history-login.component';
import { UserOnlineComponent } from './components/AD/user-online/user-online.component';
import { ConfigTextElementComponent } from './components/AD/config-text-element/config-text-element.component';

const routes: Routes = [
  { path: '', redirectTo: 'Upload', pathMatch: 'full' },
  { path: 'TemplateContract', component: TemplateContractComponent },
  { path: 'Home', component: HomePageComponent },
  { path: 'Login', component: LoginComponent},
  { 
    path: 'Unit', 
    component: UnitComponent
  },
  { path: 'Message', component: MessageComponent },
  { path: 'Area', component: AreaComponent },
  { path: 'Vendor', component: VendorComponent},
  { path: 'Customer', component: CustomerComponent},
  { path: 'Title', component: TitleComponent },
  { path: 'NumberRange', component: NumberRangeComponent },
  { path: 'ProjectProfile', component: ProjectProfileComponent },
  { path: 'ProjectUserType', component: ProjectUserTypeComponent },
  { path: 'ProjectType', component: ProjectTypeComponent },
  { path: 'ProjectLevel', component: ProjectLevelComponent },
  { path: 'ContractType', component: ContractTypeComponent },
  { path: 'Organize', component: OrganizeComponent, data: { reuse: true }},
  { path: 'Organize/ViewGrid', component: OrganizeGridComponent },
  { path: 'Role', component: RoleComponent },
  { path: 'Role/Detail/:code', component: RoleDetailComponent },
  { path: 'Right', component: RightComponent },
  { path: 'User', component: UserComponent, data: { reuse: true } },
  { path: 'LanguageTranslate', component: LanguageTranslateComponent },
  { path: 'ConfigTextElement', component: ConfigTextElementComponent},

  { path: 'User/UserDetail/:username', component: UserDetailComponent },
  { path: 'Area/Create', component: AreaCreateComponent },
  { path: 'UserGroup', component: UserGroupComponent},
  { path: 'UserGroup/Detail/:code', component: UserGroupDetailComponent },
  { path: 'HistoryLogin', component: HistoryLoginComponent},
  { path: 'UserOnline', component: UserOnlineComponent},
  { path: 'SystemManage', loadChildren: () => import('./@module/system-manage/system-manage.module').then(m => m.SystemManageModule) },
  { path: 'MasterData', loadChildren: () => import('./@module/master-data/master-data.module').then(m => m.MasterDataModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
