import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { PasswordManagerComponent } from './password-manager/password-manager.component';
import { PasswordCategoryPipe } from './pipes/password-category.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PasswordService } from './password-store.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    PasswordEditComponent,
    PasswordManagerComponent,
    PasswordCategoryPipe

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule 
    
  ],
  providers: [PasswordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
