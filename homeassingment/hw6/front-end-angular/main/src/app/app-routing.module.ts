import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormComponent} from "./news/form/form.component";
import {ListComponent} from "./news/list/list.component";
import {DetailComponent} from "./news/detail/detail.component";
import {MainComponent} from "./news/main/main.component";

const routes: Routes = [
  {path:'news/create',component:FormComponent},
  {path:'news/edit/:id',component:FormComponent},
  {path:'news/list',component:ListComponent},
  {path:'news/detail/:id',component:DetailComponent},
  {path:'',component:MainComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
