import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MessageCreateComponent } from './message-create/message-create.component';
import { MessageEditComponent } from './message-edit/message-edit.component';
import { MessageListComponent } from './message-list/message-list.component';


@NgModule({
  declarations: [
    MessageCreateComponent,
    MessageEditComponent,
    MessageListComponent
  ],
  imports: [
    MessageRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NgSelectModule,
    TranslateModule
  ]
})
export class MessageModule { }
