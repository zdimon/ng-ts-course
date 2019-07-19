import {Component, Input, EventEmitter, Output} from '@angular/core';
import {DataService} from './data.service';


@Component({
  selector: 'app-child',
  template: '<div>' +
    '<span>{{message}}</span>' +
    '<p>Message from a parent: {{childMessage}}</p>' +
    '<p><button type="button" (click)="Click()">Event</button></p>' +
    '</div>',
  styles: ['div{border:2px solid yellow; background-color: mediumaquamarine; padding: 8px;}']
})
export class AppChildComponent {
  constructor(private dataService: DataService){

  }
  @Input() childMessage: string;

  message = 'This is a child component';
  @Output()  messageEvent = new EventEmitter<string>();

  Click(){
    this.messageEvent.emit(this.message);
    this.dataService.changeMessage(this.message);
  }
}
