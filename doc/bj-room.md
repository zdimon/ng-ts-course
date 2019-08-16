# Комнаты.

Разберем формат json комнаты игры.


    {
      uuid: 'ece639b0-b399-11e9-b865-8f5ef5509099'
      deck: deck,
      bet: 10,
      current_player: 'Dima',
      status: 'active',
      users: [
         { 
            username: 'Dima', 
            account: 100, 
            points: 12,
            is_stoped: false,
            cards: [
                Card, Card
            ]
         },
         
         { 
            username: 'Vova', 
            account: 100, 
            points: 12,
            is_stoped: false,
            cards: [
                Card, Card
            ]
         }
                  
      ]
    }
    
**uuid** - идентификатор комнаты.    
    
**deck** - содержит калоду карт.

**users** - массив игроков.

**bet** - текущая ставка игры.

**current_player** - имя текущего игрока чей ход.

**status** - статус игры (active/finished).

**user.account** - деньги на счету.

**user.score** - сколько балов набрано.

**user.is_stoped** - признак того, что пользователь отказался брать карту.

### Объект Card


Отдадим сервером тестовую комнату в фабричном методе createRoom().


    import { Deck } from '../client-app/src/app/deck.class';
    import { Card } from '../client-app/src/app/game/card.class';


    export class RoomManager {
      users: any = [];
      deck: Deck;
      bet: number;
      current_player: string;
      status: string;

      public static createRoom(owner: string, opponent: string): RoomManager{
        const deck = new Deck();
        const card = new Card(2,2);
        return {
          deck: deck,
          bet: 10,
          current_player: 'Dima',
          status: 'active',
          users: [
             {'username': owner, account: 100, points: 12, cards: [card,card]},
             {'username': opponent, account: 100, points: 12, cards: [card,card]},
          ]
        }

      }
    }

Создадим роутинг на компонент table c uuid комнаты.

    { path: 'room/:uuid', component: TableComponent },

Сам компонент.

    ...
    @Component({
      selector: 'app-game-table',
      template: `
        {{ room | json  }}
      `,
    })
    export class TableComponent implements OnInit {
      username: string ='';
      room: any = {};
      constructor(
          private router: Router,
          private socket_service: SocketService,
          private activatedRoute: ActivatedRoute){
      }

      ngOnInit(){
        if(!localStorage.getItem('username')){
          this.router.navigate(['login']);
        } else {
          this.username = localStorage.getItem('username');
        }
        this.socket_service.getRoom$.subscribe((room: any) => {
            this.room = room;
        });
        let uuid = this.activatedRoute.snapshot.paramMap.get('uuid')
        this.socket_service.getRoom(uuid);
      }
    }

В функции ngOnInit мы первым делом проверяем пользователя на залогиненость и если он не авторизован перебрасываем на форму авторицации.

Далее мы достаем из роутинга параметр uuid в адресной строке и вызываем на сервере событие getRoom через сокет-сервис.

Перед чем подписываемся на ответ this.socket_service.getRoom$.subscribe.

В сервисе добавляем эти две сущности.

    getRoom$ = this.socket.fromEvent<string>('action:getRoom');
    
      createRoom(owner: string, opponent: string) {
        this.socket.emit('createRoom',{owner:owner, opponent: opponent});
      }

На сервере опишем два метода. 

      socket.on('createRoom', function (data: any) {
            let room = RoomManager.createRoom(data.owner,data.opponent);
            rooms[room.uuid] = room;
            var sockets = io.sockets.sockets;
            for(var socketId in sockets)
            {
              var s = sockets[socketId]; 
              for(let user of room.users){
                if (s.username===user.username){
                  console.log(`send invitation to ${user.username}`)
                  s.emit('action:createRoom',room);
                }
              }
              
            }
      });

      socket.on('getRoom', function (data: any) {
         console.log(`Getting room ${data.uuid} of ${socket.username}`)
         socket.emit('action:getRoom',rooms[data.uuid])
      })

Первый - создает новую тестовую комнату, добавляет ее в глобальный массив rooms и рассылает на сокеты тех пользователей, которые сидят в объекту room.

При этом мы в двух циклах пробегаем по всем текущим сокетам, доставая их var sockets = io.sockets.sockets, и по пользователям в room.users.

Событие getRoom не нуждается в пояснении.

Осталось на клиенте вызвать событие createRoom в компоненте users.online.ts при клике на логин пользователя.

    @Component({
      
          <li *ngFor="let user of users_online | removelogin:mylogin ">
            <a  (click)="inviteUser(user)">
              {{ user }}
            </a>
          </li>
        ...
      `
    })
    export class UsersOnlineComponent implements OnInit {
      users_online: any= [];
      room: any;
      mylogin: string;
      constructor(private router: Router, private socket_service: SocketService){
      }

      ngOnInit(){
          this.mylogin = localStorage.getItem('username');
          this.socket_service.usersOnline$.subscribe((users_online: any) => {
            this.users_online = users_online;
            console.log('Getting online users');
          })
          this.socket_service.createRoom$.subscribe((room: any) => {
            this.room = room;
            this.router.navigate(["room", room.uuid]);
          })
          this.socket_service.getUsersOnline();
      }

      inviteUser(username: string){
        console.log(`invite ${username}`);
        this.socket_service.createRoom(localStorage.getItem('username'),username);
      }

    }

Теперь, когда пользователи попадают в общую комнату, можно занятся выводом ее содержимого.

    import { Component, OnInit } from '@angular/core';
    import {Router, ActivatedRoute} from "@angular/router";
    import { SocketService } from './socket.service';

    @Component({
      selector: 'app-game-table',
      template: `

         <div *ngIf="other" [className]="room.current_player==other.username? 'active' : 'noactive'" >
            <h1> User {{ other.username  }}  </h1>
            <p> Balance: {{ other.account  }} </p>
            <p> Score: {{ other.points  }} </p>
            <ul>
              <li *ngFor="let card of other.cards"><app-card [card]="card"></app-card></li>
            </ul>
            <button *ngIf="room.current_player==other.username && room.current_player==me.username">Get card</button>
            <button *ngIf="room.current_player==other.username && room.current_player==me.username">Stop</button>
         </div>

         <div>
              <p>Game status: {{ room.status  }}</p>
              <p>The bet: {{ room.bet  }}</p>
         </div>

         <div *ngIf="me" [className]="room.current_player==me.username? 'active' : 'noactive'">
            <h1> User {{ me.username  }}  </h1>
            <p> Balance: {{ me.account  }} </p>
            <p> Score: {{ me.points  }} </p>
            <ul>
              <li *ngFor="let card of me.cards"><app-card [card]="card"></app-card></li>
            </ul>
            <button *ngIf="room.current_player==me.username && room.current_player==me.username">Get card</button>
            <button *ngIf="room.current_player==me.username && room.current_player==me.username">Stop</button>
         </div>

      `,
      styles: [
                'div {margin: 10px}',
                '.active {border: 1px solid green }',
                '.noactive {border: 1px solid silver }',
                'li { display: inline-block }'
              ]
    })
    export class TableComponent implements OnInit {
      username: string ='';
      room: any;
      me: any;
      other: any;
      constructor(
          private router: Router,
          private socket_service: SocketService,
          private activatedRoute: ActivatedRoute){
      }

      ngOnInit(){
        if(!localStorage.getItem('username')){
          this.router.navigate(['login']);
        } else {
          this.username = localStorage.getItem('username');
        }
        this.socket_service.getRoom$.subscribe((room: any) => {
            this.room = room;
            for(let u of room.users){
              if(u.username == this.username) {
                this.me = u;
              } else {
                this.other = u;
              }
            }
        });
        let uuid = this.activatedRoute.snapshot.paramMap.get('uuid')
        this.socket_service.getRoom(uuid);
      }
    }

