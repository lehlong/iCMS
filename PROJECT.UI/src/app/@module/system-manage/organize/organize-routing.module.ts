import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizeCreateComponent } from './organize-create/organize-create.component';
import { OrganizeEditComponent } from './organize-edit/organize-edit.component';
import { OrganizeListComponent } from './organize-list/organize-list.component';

const routes: Routes = [
  { path: '', redirectTo:'List', pathMatch:'full' },
  { path: 'Create', component: OrganizeCreateComponent },
  { path: 'Edit/:code', component: OrganizeEditComponent },
  { path: 'List', component: OrganizeListComponent, data: { reuse: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizeRoutingModule { }
