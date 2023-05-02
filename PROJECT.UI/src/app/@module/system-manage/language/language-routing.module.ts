import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageListComponent } from './language-list/language-list.component';
import { LanguageEditComponent } from './language-edit/language-edit.component';
import { LanguageCreateComponent } from './language-create/language-create.component';

const routes: Routes = [
  {
    path:'', redirectTo:'List', pathMatch:'full'
  },
  {
    path: 'List', component: LanguageListComponent
  },
  {
    path: 'Edit/:id', component: LanguageEditComponent
  },
  {
    path: 'Create', component: LanguageCreateComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageRoutingModule { }
