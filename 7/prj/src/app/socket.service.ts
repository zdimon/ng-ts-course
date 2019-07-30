import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Deck } from './pack.class';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  deck$ = this.socket.fromEvent<Deck>('getDeck');
  constructor(private socket: Socket) { }

  getNewDeck() {
    console.log('emmiting');
    this.socket.emit('action:getDeck',{hello:'hello'});
  }
}
