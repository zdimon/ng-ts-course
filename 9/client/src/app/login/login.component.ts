import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  is_logined: boolean = false;
  constructor(private socket_service: SocketService) { }

  ngOnInit() {
  }

  doLogin(){
    console.log(this.login);
    this.socket_service.sockLogin(this.login);
    localStorage.setItem('username',this.login);
    this.is_logined = true;
  }



}
