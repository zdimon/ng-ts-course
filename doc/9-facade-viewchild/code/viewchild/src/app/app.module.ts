import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, MyDirective } from './app.component';
import {FormsModule} from '@angular/forms';
import { PanelComponent } from './panel.component';
import { ColorComponent } from './color.component';

@NgModule({
  declarations: [
    AppComponent,
    MyDirective,
    PanelComponent,
    ColorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
