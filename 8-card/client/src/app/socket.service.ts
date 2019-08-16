import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  sockLogin(login: string) {
    console.log(`emmiting login ${login} to server`);
    this.socket.emit('LoginEvent', {data: login});
  }
}
