import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: any[];
  constructor(private user_service: UserService){
    this.users = this.user_service.getUsers();
  }

}
