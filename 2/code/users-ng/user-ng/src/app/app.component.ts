import { Component } from '@angular/core';

class User{
  username: string;
  email: string;
  id: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [{
    'username': 'Dima',
    'email': 'zdimon77@gmail.com',
    'id': 1
  }];
  username: string;
  email: string;

  delete(user_id: number) {
    for (const user of this.users) {
      if (user.id === user_id) {
        const idx = this.users.indexOf(user);
        this.users.splice(idx, 1);
      }
    }
  }

  add() {
    console.log(this.username);

  }


}
