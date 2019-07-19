import { UserComponent } from './user.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { UserTestService } from './user.test.service';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleService } from './article.service';
import { AppParentComponent } from './app.parent.component';
import { AppChildComponent } from './app.child.component';
import { AppSiblingComponent } from './app.sibling.component';
import { DataService } from './data.service';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'user/:username', component: UserComponent },
  { path: 'articles',      component: ArticleComponent },
  { path: '', component: UserComponent },
  { path: 'test', component: AppParentComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ArticleComponent,
    AppParentComponent,
    AppChildComponent,
    AppSiblingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: UserService, useClass: UserTestService}, ArticleService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
