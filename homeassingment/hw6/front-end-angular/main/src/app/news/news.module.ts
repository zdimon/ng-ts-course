import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from "@angular/common/http";
import { NewsService } from "./news.service";
import {AppRoutingModule} from "../app-routing.module";
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [ListComponent, DetailComponent, FormComponent, MainComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers:[
    NewsService
  ]
})
export class NewsModule { }
