import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { ParentsChildComponent } from './parents.child.component';

@Component({
  selector: 'app-parents',
  template: '<div>' +
    'Parrent component' +
    '<p>Some text</p>' +
    '<span>Message from a child: {{ childMessage }}</span>' +
    '<p>Message from Event: "{{message}}"</p>' +
    '<app-child (messageEvent)="receiveMessage($event)" [childMessage]="parentMessage"></app-child>' +
    '</div>',
  styles: ['div{border:1px solid red; background-color: #ffccaa; padding: 5px;}']
})
  export class ParentsComponent implements AfterViewInit {
  message: any;
  childMessage: string;
  parentMessage = 'Parent message';

  @ViewChild(ParentsChildComponent, {static: false}) child;
  ngAfterViewInit(): void {
    this.childMessage = this.child.message;
  }
  receiveMessage(Event){
    this.message = Event;
  }
}
