import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }, 
  { path: 'Organize', loadChildren: () => import('./organize/organize.module').then(m => m.OrganizeModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemManageRoutingModule { }
