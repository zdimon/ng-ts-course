import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { AppChildComponent } from './app.child.component';

@Component({
  selector: 'app-parent',
  template: '<div>' +
    'Parrent component' +
    '<p>Some text</p>' +
    '<span>Message from a child: {{ childMessage }}</span>' +
    '<p>Message from Event: "{{message}}"</p>' +
    // TODO: Ругается что 'recieve Message' не найден.
    '<app-child (messageEvent)="receiveMessage($event)" [childMessage]="parentMessage"></app-child>' +
    '</div>',
  styles: ['div{border:1px solid red; background-color: #ffccaa; padding: 5px;}']
})
  export class AppParentComponent implements AfterViewInit {
  message: any;
  childMessage: string;
  parentMessage = 'Parent message';

  // TODO: Начиная с Angular 8 добавился аргумент в 'ViewChild'
  @ViewChild(AppChildComponent) child;
  ngAfterViewInit(): void {

      this.childMessage = this.child.message;

    // TODO: Требует после () указать ';', ругается что '$event' не найдено, предлагает 'Event'

  }

  receiveMessage(Event){
    this.message = Event;
  }

}
