import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ParentsComponent} from "./components/parents/parents.component";
import {ParentsSiblingComponent} from "./components/parents/parents.sibling.component";
import {ParentsChildComponent} from "./components/parents/parents.child.component";
import {DataService} from "./services/data.service";
import {UsersComponent} from './components/users/users.component';
import {Routes, RouterModule} from "@angular/router";
import { AddComponent } from './components/add/add.component';

const appRoutes: Routes = [
  {path:'',component:UsersComponent},
  {path: 'parent', component: ParentsComponent}
  // TODO: Добавить страницу добавления пользователей.
  //{path:'add-form',component: AddUserCimponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ParentsComponent,
    ParentsSiblingComponent,
    ParentsChildComponent,
    UsersComponent,
    AddComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
