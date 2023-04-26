import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizeRoutingModule } from './organize-routing.module';
import { OrganizeListComponent } from './organize-list/organize-list.component';
import { OrganizeCreateComponent } from './organize-create/organize-create.component';
import { OrganizeEditComponent } from './organize-edit/organize-edit.component';


@NgModule({
  declarations: [
    OrganizeListComponent,
    OrganizeCreateComponent,
    OrganizeEditComponent
  ],
  imports: [
    CommonModule,
    OrganizeRoutingModule
  ]
})
export class OrganizeModule { }
