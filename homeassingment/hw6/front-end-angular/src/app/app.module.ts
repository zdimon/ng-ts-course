import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormComponent} from "./news/form/form.component";
import {ListComponent} from "./news/list/list.component";
import {DetailComponent} from "./news/detail/detail.component";
import {HttpClientModule} from "@angular/common/http";
import {  RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
