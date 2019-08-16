# Игра в очко. Авторизация.

Создадим компонент c формой авторизации.

    import { Component, OnInit } from '@angular/core';
    import {Router} from "@angular/router";

    @Component({
      selector: 'app-login-form',
      template: `
      <div class="mx-auto login_form">
        <h2 class="text-center">Log in</h2>
        <div class="form-group">
          <input #username type="text" class="form-control"  name="username" required="required">
        </div>
        <div class="form-group">
            <button type="submit" (click)="login(username.value)" class="btn btn-primary btn-block">Log in</button>
        </div>
      </div>

      `,
    })
    export class LoginComponent implements OnInit {
      username: string;
      is_auth: boolean = false;
      constructor(private router: Router){
      }

      ngOnInit(){
        if(localStorage.getItem('username')){
          this.router.navigate(['']);
        }
      }

      login(username){
        localStorage.setItem('username',username);
        this.router.navigate(['']);
      }



    }

В функции login устанавливаем username в localStorage.

Если при инициализации username уже установлен - то редиректим на главную.



Импортируем его в модуле.

    import { LoginComponent } from './login.component';

    ...
    
    declarations: [... LoginComponent],
         
    exports: [...LoginComponent]
    


Пропишем в нем роутинг.


    import { RouterModule, Routes } from '@angular/router';
    
    ...

    const routes: Routes = [
      { path: '', component: LoginComponent },
      { path: 'login',      component: LoginComponent },
    ]


    @NgModule({
      declarations: [DeckComponent, CardComponent],
      imports: [
        ...
        RouterModule.forRoot(routes)
      ],
      
Определим место вывода содержимого в корневом компоненте app.component.ts.

    <router-outlet></router-outlet>      

Создадим новый компонент с игровым столом table.component.ts.


    import { Component, OnInit } from '@angular/core';
    import {Router} from "@angular/router";

    @Component({
      selector: 'app-game-table',
      template: `
      Hello {{ username  }} <button (click)="unlogin()">Unlogin</button>
      <app-deck></app-deck>
      `,
    })
    export class TableComponent implements OnInit {
      username: string ='';
      constructor(private router: Router){
      }

      ngOnInit(){
        if(!localStorage.getItem('username')){
          this.router.navigate(['login']);
          console.log('unregisraered');
        } else {
          this.username = localStorage.getItem('username');
        }
      }

      unlogin(username){
        localStorage.removeItem('username');
        this.router.navigate(['login']);
      }

    }

Тут мы определяем кнопку для разлогинивания.

При инициализации перебрасываем на форму логина если в localStorage не установлен username.

В шаблоне выводим компонент колоды.

Теперь отправим в сокет имя пользователя из компонента login.component.ts.

    import { SocketService } from './socket.service';


    constructor(... private socket_service: SocketService){
    
    ....
    
      login(username){
        localStorage.setItem('username',username);
        this.router.navigate(['']);
      }    
      
Определим функцию login() в сервисе socket.service.ts.

    ...
    export class SocketService {
     ...

      login(username: string) {
        this.socket.emit('login',username);
      }


    }
       
На сервере заберем имя пользователя в событии login.

      socket.on("login", (username: string) => {
        console.log(username);
      });   
          
Далее нам необходимо создавать авторизированные комнаты пользователей на сервере.

Каждое сокет-соединение будет иметь уникальное имя, которое будем запрашивать у пользователя в процессе авторизации.

Однако чтобы обеспечить уникальность, необходимо разбить авторизацию на 2 этапа.

1. Проверка имени на существование на сервере.

2. Сама авторизация.

Определим новый класс UserManager для серверной части.

    export class UserManager {
      users: string[] = [];

      addUser(username: string): void {
          this.users.push(username);
      }

      deleteUser(username: string): void {
        for(let i=0; i<this.users.length; i++)
        {
            if(this.users[i]===username){
              this.users.splice(this.users.indexOf(username),1);
            }
        }
      }
      checkUser(username: string): boolean{
        for(let i=0; i<this.users.length; i++)
        {
            if(this.users[i]===username){return true;}
        }
        return false;
      }

      getUsers(): any{
        return this.users;
      }

    }


В этом классе мы определил 4 метода для управления списком пользователей.

В методе checkUser() мы проверяем на существование имени в списке users.

Задействуем функцию добавления пользователя в список в app.ts.

    import { UserManager } from './userManager.class';

    var UM = new UserManager();
    ...
    
    
      socket.on("login", (username: string) => {
        UM.addUser(username);
        socket.username = username;
      }); 
      
Кроме использования  UM.addUser(username) мы еще добавили username в наш сокет для того, 
чтобы иметь возможность удалять пользователя при разрыве соединения.  

      socket.on('disconnect', function () {
        UM.deleteUser(socket.username);
      });   
      
Также определим событие для проверки логина.

      //// Проверка на существование логина
      socket.on("checkLogin", (username: string) => {
        if(!UM.checkUser(username)){
          var answer = {'status': 0, message: 'Ok'}
        } else {
          var answer = {'status': 1, message: 'This user exists! Try another name plz!'}
        }
        socket.emit('action:checkLoginResult', answer);
      });   
      
Тут мы возвращаем объект answer в сокет в зависимости от результата проверки UM.checkUser(username).
          
Теперь переключимся в ангуляр и оформим компонент для логина.

    import { Component, OnInit } from '@angular/core';
    import {Router} from "@angular/router";
    import { SocketService } from './socket.service';

    @Component({
      selector: 'app-login-form',
      template: `
      <div class="mx-auto login_form">
        <h2 class="text-center">Log in</h2>
        <div class="form-group">
          <input #username type="text" class="form-control"  name="username" required="required">
        </div>
        <div class="form-group">
            <button type="submit" (click)="login(username.value)" class="btn btn-primary btn-block">Log in</button>
        </div>
      </div>

      `,
    })
    export class LoginComponent implements OnInit {
      username: string;
      is_auth: boolean = false;
      constructor(private router: Router, private socket_service: SocketService){
      }

      ngOnInit(){
        if(localStorage.getItem('username')){
          this.router.navigate(['']);
        }

        this.socket_service.checkLoginResult$.subscribe((data: any) => {
          if(data.status===1) {
            localStorage.removeItem('username');
            alert(data.message);
          } else {
           localStorage.setItem('username',this.username);
           this.router.navigate(['']);
          }

        });
      }

      login(username: string){
        this.username = username;
        this.socket_service.checkLogin(username);
      }

    }

В функции login(), срабатывающей после клика на кнопке мы через сервис генерируем событие на сервере this.socket_service.checkLogin(username), 
передавая на него логин пользователя.

Также в ngOnInit() мы подписываемся (this.socket_service.checkLoginResult$.subscribe) на ответ с сервера с результатми проверки. 

В случае положительной проверки редиректим пользователя на роутинг с компонентом table.component.ts, в котором и произойдет логин, 
взятый из localStorag-а.    

Осталось добавить  checkLoginResult$ и метод checkLogin() в сервис socket.service.ts.

    export class SocketService {
      ...
      checkLoginResult$ = this.socket.fromEvent<any>('action:checkLoginResult');

      ...

      checkLogin(username: string) {
        this.socket.emit('checkLogin',username);
      }


    
Более того, в случае если пользователь обновляет страницу, нам нужно автоматически его залогинить.

Теперь, после того как мы проверили логин на уникальность, можно вызвать событие авторизации (шаг 2). 

Это также даст возможность автоматически логинить пользователя при обновлении страницы. 
      
      ngOnInit(){
        if(!localStorage.getItem('username')){
          this.router.navigate(['login']);
        } else {
          this.username = localStorage.getItem('username');
          this.socket_service.login(this.username);
        }
      }      
      
При этом при логине через форму (login.component.ts) мы просто переправляем пользователя на страницу table.component.ts (this.router.navigate(['']);) и он уже залогинится по сокету сам.
      
Удалим username из localStorage при разлогинивании и оповестим об этом сервер.      
      
      unlogin(username){
        localStorage.removeItem('username');
        this.socket_service.unlogin(localStorage.getItem('username'));    
        this.router.navigate(['login']);
      }
   
Обработаем на сервере процесс дисконекта.

      socket.on("unlogin", (username: any) => {
        console.log(`Unlogin ${username}`)
        UM.deleteUser(username);
      });
      
Теперь при закрытии браузера или вкладки у нас комната автоматически удалится из массива rooms.
  
## Компонент пользователей онлайн.

Добавим в сокет-сервис метод получения пользователей онлайн и Observable объект для подписки на результат его вызова.

    ...
    export class SocketService {
      ...
      usersOnline$ = this.socket.fromEvent<any>('action:getUsersOnline');
      ...

      getUsersOnline() {
        this.socket.emit('getUsersOnline');
      }

    }

Создадим компонент users.online.component.ts.

    import { Component, OnInit } from '@angular/core';
    import {Router} from "@angular/router";
    import { SocketService } from './socket.service';

    @Component({
      selector: 'app-users-online',
      template: `

      <div>
      <h2> Users online</h2>
        <ul>
          <li *ngFor="let user of users_online"><a (click)="inviteUser(user)">{{ user }}</a></li>
        </ul>
      </div>
      `,
    })
    export class UsersOnlineComponent implements OnInit {
      users_online: any= [];

      constructor(private router: Router, private socket_service: SocketService){
      }

      ngOnInit(){
          this.socket_service.usersOnline$.subscribe((users_online: any) => {
            this.users_online = users_online;
          })
          this.socket_service.getUsersOnline();
      }

      inviteUser(roomId: string){
        console.log(`invite ${roomId}`)
      }

    }

В котором мы получаем пользователей онлайн вызывая ф-цию this.socket_service.getUsersOnline() в сокет-сервисе и подписываемся на его ответ.

Но нам не нужно чтобы в этом списке присутствовал текущий пользователь, а только те, с кем можно поиграть.

Поэтому список необходимо отфильтровать pipe-ом.

Примерно так.

    *ngFor="let user of users_online | removelogin:mylogin "

Создадим класс removelogin.pipe.ts.

    import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
        name: 'removelogin',
        pure: false
    })
    export class RemoveLoginPipe implements PipeTransform {
        transform(items: any[], filter: Object): any {

            return items.filter(item => item.indexOf(filter) === -1);
        }
    }
    
В функции transform мы получаем то. что приходит в ngFor плюс параметр фильтра mylogin (removelogin:mylogin).

Применяя функцию js списка filter() мы проходим колбэком по элементам списка и формируем новый, каждый элемент которого отвечает условию в колбэке.

Включим его в game.module.ts.

    import { RemoveLoginPipe } from './removelogin.pype';

    ...
    
      declarations: [... RemoveLoginPipe],
      
И далее применим этот фильтр.

    *ngFor="let user of users_online | removelogin:mylogin "
    
Перед этим объявив переменную класса mylogin.

    export class UsersOnlineComponent implements OnInit {
      ...
      mylogin: string;
      ...

      ngOnInit(){
          this.mylogin = localStorage.getItem('username');
          ...
      }

Осталось на сервере уведомить всех пользователей в моменты логина, разлогинивания и обрыва соединения.

      socket.on("login", (username: string) => {
        ...
        socket.broadcast.emit("action:getUsersOnline",UM.getUsers());
       ...
      });

      socket.on("unlogin", (username: any) => {
        ...
        socket.broadcast.emit("action:getUsersOnline",UM.getUsers());
        ...
      });

     
      socket.on('disconnect', function () {
        ...
        socket.broadcast.emit("action:getUsersOnline",UM.getUsers());
        ...
      });
      
Делаем это с помощью функции broadcast.  

     
      
        
