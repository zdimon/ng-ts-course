import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../card.class';

@Component({
  selector: 'app-card',
  template: `
    <div (click)="flip()" [style.background-position-x.px]="card.XBgPosition" [style.background-position-y.px]="card.YBgPosition" ></div>
  `,
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  constructor() { }

  ngOnInit() {

  }

  flip(){
    if(this.card.XBgPosition == 0) {
      this.card.faceUp()
    } else {
      this.card.faceDown();
    }
  }
}
