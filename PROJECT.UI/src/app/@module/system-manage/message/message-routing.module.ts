import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageCreateComponent } from './message-create/message-create.component';
import { MessageEditComponent } from './message-edit/message-edit.component';
import { MessageListComponent } from './message-list/message-list.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'List', pathMatch: 'full'
  },
  {
    path: 'List', component: MessageListComponent
  },
  {
    path: 'Edit/:id', component: MessageEditComponent
  },
  {
    path: 'Create', component: MessageCreateComponent
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
