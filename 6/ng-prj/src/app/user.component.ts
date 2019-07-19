import { Component } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <h1>User component</h1>
  <ul>
    <li *ngFor="let user of users">{{ user.name  }}</li>
  </ul>
  `
})
export class UserComponent {
  users: any[];
  constructor(private user_service: UserService, private route: ActivatedRoute){
    this.users = this.user_service.getUsers();

    this.route.params.subscribe((params)=>{
        console.log(params['username']);
    });


  }

}
