import { Component, OnInit } from '@angular/core';
import { SocketService } from './../socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  constructor(private socket_service: SocketService) { }

  ngOnInit() {
  }

  doLogin(){
    this.socket_service.sockLogin(this.login);
  }

}
