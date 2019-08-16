import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorDirective } from './directives/color.directive';

import { FormsModule  } from '@angular/forms';
import { MyformComponent } from './form.component';
import { PanelComponent } from './panel.component';


@NgModule({
  declarations: [
    AppComponent,
    ColorDirective,
    MyformComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
