import { Component } from '@angular/core';

class User {
  id: number;
  username: string;
  email: string;
  age: number;
}



const DB = [{
  id: 0,
  username: 'Admin',
  email: 'admin@gmail.com',
  age: 30
},
  {
    id: 1,
    username: 'Kevin',
    email: 'shindel@bk.ru',
    age: 33
  },
  {
    id: 2,
    username: 'Dima',
    email: 'zdimon77@gmail.com',
    age: 40
  },
  {
    id: 3,
    username: 'Username',
    email: 'some@email.com',
    age: 99
  }];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  users: User[] = Object.assign([], DB);

  username: string;
  email: string;
  age: number;
  searchInput: string;


  delete(userId: number) {
    for (const user of this.users) {
      if (userId === user.id) {
        const idx = this.users.indexOf(user);
        this.users.splice(idx, 1);
      }
    }
  }

  add() {
    const ID: number = this.users.length;
    this.users.push({ id: ID, username: this.username, email: this.email, age: this.age });
  }

  // TODO: Как реализовать поиск?
  search(emailSearch: string) {
    this.users = [];
    for (const user of DB) {
      const ID: number = this.users.length;
      if ( user.email.indexOf(emailSearch) != -1) {
            // DO SOMETHING
            let index: number = DB.indexOf(user);
            this.users.push(DB[index]);
      }
    }

  }
  // TODO: Как реализовать очистку поиска?
  clear(): void {
    this.users = Object.assign([], DB);
  }
}
