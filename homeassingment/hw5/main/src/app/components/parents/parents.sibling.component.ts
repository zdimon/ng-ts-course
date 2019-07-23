import {Component, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-sibling',
  template: '<div>' +
    'Sibling component' +
    '<p>Some text</p>' +
    '</div>',
  styles: ['div{border:1px solid green; background-color: #ffccaa; padding: 5px; margin-top: 10px;}']
})
  export class ParentsSiblingComponent implements OnInit{
  constructor(private dataService: DataService){}

  ngOnInit(): void {
    let rez = this.dataService.currentMessage;
    rez.subscribe(() => {
      });
  }
}
