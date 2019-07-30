import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private socket_service: SocketService){

  }

  ngOnInit(){
     this.socket_service.deck$.subscribe((data: any) => {
        console.log(data);
     });
  }


  doGetDeck(){
    this.socket_service.getNewDeck();
  }

}
