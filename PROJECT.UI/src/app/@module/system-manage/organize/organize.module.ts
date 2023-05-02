import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizeRoutingModule } from './organize-routing.module';
import { OrganizeListComponent } from './organize-list/organize-list.component';
import { OrganizeCreateComponent } from './organize-create/organize-create.component';
import { OrganizeEditComponent } from './organize-edit/organize-edit.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { LanguageRoutingModule } from '../language/language-routing.module';


@NgModule({
  declarations: [
    OrganizeListComponent,
    OrganizeCreateComponent,
    OrganizeEditComponent
  ],
  imports: [
    CommonModule,
    OrganizeRoutingModule,
    LanguageRoutingModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NgSelectModule,
    TranslateModule
  ]
})
export class OrganizeModule { }
