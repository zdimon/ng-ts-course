import { Component, OnInit } from '@angular/core';
import { Deck } from '../pack.class';
import { Card } from '../card.class';

@Component({
  selector: 'app-deck',
  template: `
    <div id="desktop">
  <div id="deck">
  <ul> <li *ngFor="let c of deck.cards"> <app-card [card]="c"></app-card> </li> </ul>
  </div>
  <div id="getUserCards">
  <button (click)="doGetCard()">Get card</button>
  <div id="userCards">
     <div *ngFor="let uc of UserCards"> <app-card [card]="uc"></app-card>  </div>
  </div>
  </div>
    </div>
  `,
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  deck: Deck;
  UserCards: Card[] = [];
  constructor() { }

  ngOnInit() {
    this.deck = new Deck();
    this.deck.shuffleDeck(3);
  }

  doGetCard() {
    const card = this.deck.getCard();
    card.faceUp();
    this.UserCards.push(card);
  }

}
