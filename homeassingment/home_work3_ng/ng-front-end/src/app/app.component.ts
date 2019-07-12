import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './service.service';

// Определяем хост и порт
const host = 'http://localhost:';
const port = 8083;

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
  searchInput: string;
  users: User[] = [];
  user: User;

  clearUser() {
    this.user = {
      id: 0,
      username: '',
      email: '',
      age: 0
    };
  }

  constructor(private http: HttpClient, private httpService: UserService) {
    this.clearUser();
    this.getUsers();
    this.httpService.getUsers();
  }

  // Метод получения пользователей
  // TODO: Вынести в сервисы?
  getUsers() {
    const data = this.http.get(`${host}${port}`).subscribe((res: any) => {
      this.users = res;
      data.unsubscribe();
    });
  }

  // Метод добавления пользователя
  // TODO: Вынести в сервисы?
  add(user: User) {
    this.user.id = this.users.length;
    const req = this.http.put(`${host}${port}`, this.user).subscribe((res: User) => {
      req.unsubscribe();
      this.clearUser();
      this.getUsers();
    });
  }

  // Метод редактирования пользователя
  edit(user: User) {
    this.user = user;
  }

  // Метод сохранения данных формы
  // TODO: Вынести в сервисы?
   save(user: User) {
     const req = this.http.post(`${host}${port}`, this.user).subscribe((res: User) => {
       this.clearUser();
       req.unsubscribe();
     });
   }

   // Метод удаления пользователя
  // TODO: Вынести в сервисы? (используется путь /delete)
   delete(user: User) {
     const req = this.http.post(`${host}${port}/delete`, user).subscribe((res: User) => {
       req.unsubscribe();
       this.getUsers();
     });

  }

  // TODO: Как определить модель списка?

  // Метод поиска по емейлу
//   search(emailSearch: string) {
//     this.users = [];
//     for (const user of this.users) {
//       const ID: number = this.users.length;
//       if ( user.email.indexOf(emailSearch) !== -1) {
//             // DO SOMETHING
//       }
//     }
//   }

  clear(): void {
    this.getUsers();
  }
}
