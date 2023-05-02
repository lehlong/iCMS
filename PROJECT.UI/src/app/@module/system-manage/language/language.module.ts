import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageRoutingModule } from './language-routing.module';
import { LanguageListComponent } from './language-list/language-list.component';
import { LanguageCreateComponent } from './language-create/language-create.component';
import { LanguageEditComponent } from './language-edit/language-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    LanguageListComponent,
    LanguageCreateComponent,
    LanguageEditComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    LanguageRoutingModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NgSelectModule,
    TranslateModule
  ]
})
export class LanguageModule { }
