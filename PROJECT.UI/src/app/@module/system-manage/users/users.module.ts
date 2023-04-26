import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
       UserCreateComponent,
       UserEditComponent,
       UserListComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbModule,
    NgxPaginationModule,
  ]
})
export class UsersModule { }
