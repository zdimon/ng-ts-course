import { Icard } from './card.interface';

export class Card implements Icard {
  XBgPosition: number = 0;
  YBgPosition: number = 0;
  Ranck: number;
  Face: number;
  Width: number;
  Height: number;

  constructor(rank: number, face: number){
    this.Width = 69;
    this.Height = 94;
    this.Face = face;
    this.Ranck = rank;
  }

  faceUp(){
    this.XBgPosition = this.Ranck*this.Width;
    this.YBgPosition = this.Face*this.Height;
  }

  faceDown(){
    this.XBgPosition = 0;
    this.YBgPosition = 0;
  }

}
