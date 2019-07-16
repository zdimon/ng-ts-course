import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-prj';
  parent_color = 'red';

  parentChange(event: string){
    this.parent_color = event;
  }

}
