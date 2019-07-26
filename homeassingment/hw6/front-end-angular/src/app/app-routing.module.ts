import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {ListComponent} from "./news/list/list.component";
import {DetailComponent} from "./news/detail/detail.component";
import {FormComponent} from "./news/form/form.component";

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'add', component: FormComponent},
  {path: 'news', component: ListComponent},
  {path: 'detail', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
