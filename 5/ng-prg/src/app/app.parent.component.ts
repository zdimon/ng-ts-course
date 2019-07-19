import { AppChildComponent } from './app.child.component';
import { Component, AfterViewInit, ViewChild  } from '@angular/core';



@Component({
  selector: 'app-parent',
  template: `
  <div>
  parent component
  message from child is "{{ childMessage  }}"

  <p>Message from event is "{{ message  }}"</p>

    <app-child (messageEvent)="receiveMessage($event)" [childMessage]="parentMessage" ></app-child>
  </div>
  `,
  styles: ['div { border: 3px solid silver; padding: 10px }']
})
export class AppParentComponent {
  parentMessage = 'Message from parent';
  childMessage: string;
  message: string;
  @ViewChild(AppChildComponent) child;
  /*
  ngAfterViewInit(){
    this.childMessage = this.child.message;
  }
  */

  receiveMessage($event) {
    this.message = $event;
  }

}
