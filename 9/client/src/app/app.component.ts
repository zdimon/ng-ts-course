import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  is_logined: boolean = false;

  constructor(private socket_service: SocketService, private router: Router){}

  ngOnInit() {
    if(localStorage.getItem('username')){
      this.is_logined = true;
    } else {
      this.is_logined = false;
    }

    this.socket_service.login$.subscribe(()=>{
      console.log('login event in root component');
      this.is_logined = true;
      this.router.navigate(['/online']);
    });

  }

  doLogout(){
    localStorage.removeItem('username');
    this.is_logined = false;
  }

}
