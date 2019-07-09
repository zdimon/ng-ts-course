import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Определяем хост и порт
// const host = 'http://localhost:';
// const port = 8083;

class User {
  id: number;
  username: string;
  email: string;
  age: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // searchInput: string;
  users: User[] = [];
  user: User = {
    id: 0,
    username: 'null',
    email: 'null',
    age: 0
  };

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  getUsers() {
    // TODO: Не отрабатывает GET запрос!
    // Подставил переменные для хоста и порта
    // const data = this.http.get(`${host}${port}`).subscribe((res: any) => {
    const data = this.http.get('http://localhost:8083/').subscribe((res: any) => {
      this.users = res;
    });
    data.unsubscribe();
  }



  add() {
    const ID: number = this.users.length;
    this.users.push({
      id: this.user.id,
      username: this.user.username,
      email: this.user.email,
      age: this.user.age
    });
  }

  edit(user: User) {
    this.user = user;
  }

  // Метод сохранения данных формы
  // save(user: User) {
  //  Нужно отправить запрос на сервер с целью сохранения пользователя


  // delete(user: User) {
    // Реализовать метод удаления на сервере
  // }

//   search(emailSearch: string) {
//     this.users = [];
//     for (const user of this.users) {
//       const ID: number = this.users.length;
//       if ( user.email.indexOf(emailSearch) !== -1) {
//             // DO SOMETHING
//       }
//     }
//
//   }
  clear(): void {
    this.getUsers();
  }
}
