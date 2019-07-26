import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService} from "./news.service";
import { HttpClientModule } from "@angular/common/http";
import {ListComponent} from "./list/list.component";
import {DetailComponent} from "./detail/detail.component";
import {FormComponent} from "./form/form.component";

@NgModule({
  declarations: [ListComponent, DetailComponent, FormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ],
  providers: [
    NewsService
  ]
})
export class NewsModule { }
