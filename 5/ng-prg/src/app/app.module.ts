import { AppParentComponent } from './app.parent.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppChildComponent } from './app.child.component';
import { AppSiblingComponent } from './app.sibling.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    AppParentComponent,
    AppChildComponent,
    AppSiblingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
