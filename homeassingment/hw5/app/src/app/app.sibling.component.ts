import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';



@Component({
  selector: 'app-sibling',
  template: '<div>' +
    'Sibling component' +
    '<p>Some text</p>' +
    '</div>',
  styles: ['div{border:1px solid green; background-color: #ffccaa; padding: 5px; margin-top: 10px;}']
})
  export class AppSiblingComponent implements OnInit{
  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(() => {
      console.log('');
      // TODO: Как отписатся?
      this.dataService.currentMessage.unsubscribe();
      });
  }
}
