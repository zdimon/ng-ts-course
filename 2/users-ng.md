# Работа со списком Angular.

Создаем приложение и запускаем сервер разработки.

    ng new user-ng
    cd user-ng
    ng serve    
        
Открываем src/app/app.components.ts

Определяем модель.        
   
    class User{
      username: string;
      email: string;
      id: number;
    }

Начальные данные.

    export class AppComponent {
      users: User[] = [{
        'username': 'Dima', 
        'email': 'zdimon77@gmail.com',
        'id': 1
      }];  
    }

Выводим данные в шаблоне.

    <table border=1>
      <tr>
        <td>Имя</td>
        <td>email</td>
        <td>Действия</td>
      </tr>
      <tr *ngFor="let user of users">
        <td>{{ user.username  }}</td>
        <td>{{ user.email  }}</td>
        <td><a href="#" (click)="delete(user.id)" >Удалить</a></td>
      </tr>
    </table>

Метод удаления.

      delete(user_id: number) {
        for (const user of this.users) {
          if (user.id === user_id) {
            const idx = this.users.indexOf(user);
            this.users.splice(idx, 1);
          }
        }
      }
  
Форма добавления.

  
  
  
  
  
  
  
  
  
  
  
  
