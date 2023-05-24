import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PasswordManagerComponent } from './password-manager/password-manager.component';

import { PasswordEditComponent } from './password-edit/password-edit.component';


const routes: Routes = [
    { path: '', redirectTo: '/password-manager', pathMatch: 'full' },
    { path: 'password-manager', component: PasswordManagerComponent },
    { path: 'passwords', component: PasswordManagerComponent },
    { path: 'password-edit', component: PasswordEditComponent },
    { path: 'password-edit/:id', component: PasswordEditComponent },
  ];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }