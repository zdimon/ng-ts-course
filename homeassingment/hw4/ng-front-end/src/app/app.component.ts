import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './service.service';
import {User} from './model'
import { HOST, PORT  } from './settings'
// Определяем хост и порт




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
    //this.httpService.getUsers();
  }

  // Метод получения пользователей
  // TODO: Вынести в сервисы?
  getUsers() {
     const data = this.httpService.getUsers().subscribe((res: any) => {
        this.users = res;
        data.unsubscribe();
     });

  }

  refreshList(event){
    this.getUsers();
  }

  // Метод редактирования пользователя
  edit(user: User) {
    this.user = user;
  }

  // Метод сохранения данных формы
  // TODO: Вынести в сервисы?
   save(user: User) {
     const req = this.http.post(`${HOST}${PORT}`, this.user).subscribe((res: User) => {
       this.clearUser();
       req.unsubscribe();
     });
   }

   // Метод удаления пользователя
  // TODO: Вынести в сервисы? (используется путь /delete)
   delete(user: User) {
     const req = this.http.delete(`${HOST}${PORT}/${user.id}`).subscribe((res: User) => {
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
