import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-child',
  template: `
  <div>
     child component
     message is "{{ childMessage  }}"
     <button (click)="onClick()">Click me</button>
  </div>
  `,
  styles: ['div { border: 1px solid silver; padding: 10px }']
})
export class AppChildComponent {
  @Input() childMessage: string;

  @Output() messageEvent = new EventEmitter<string>();

  message = 'Hello from child';

  constructor(private data_service: DataService ){

  }

  onClick(){
    this.messageEvent.emit('Hello from childs event');
    this.data_service.changeMessage('Button is fired');
  }

}
