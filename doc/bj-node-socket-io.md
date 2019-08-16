# SocketIO

Устанавливаем глобально ts-node.

    sudo npm install -g ts-node

Устанавливаем express.

    npm install --save express@4.15.2
    
Создаем папку src/server.
    
Простейший сервер src/server/app.ts.

    var app = require('express')();
    var http = require('http').createServer(app);

    app.get('/', function(req, res){
      res.send('<h1>Hello world</h1>');
    });

    http.listen(3000, function(){
      console.log('listening on *:3000');
    });

Запуск.

    
    ts-node app.ts
    
    
    
    
    
    
Исключим servet/app.ts из процесса компиляции Ангуляр.

Поправим файл src/tsconfig.app.json.

    {
      "extends": "../tsconfig.json",
      "compilerOptions": {
        "outDir": "../out-tsc/app",
        "types": []
      },
      "exclude": [
        "test.ts",
        "**/*.spec.ts",
        "server/app.ts"
      ]
    }    
    
    
## Интеграция socket.io

    npm install --save socket.io
    
Включение в ангуляр.

Установка.

    npm i ngx-socket-io --save
    
Включение в модуль.

    import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

    const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };    
    
    ...
        
      imports: [
        ...
        SocketIoModule.forRoot(config)
      ],
    
Ошибка 

    is-buffer.js:4 Uncaught ReferenceError: global is not defined  
    
Иногда возникает эсли вы поместите проект серверной части внутрь папки с ангуляром.  
    
    
Но соединение не будет инициировано пока мы не создадим сервис, его использующий, и не включим его в конструктор компонента.    

Создадим такой сервис socket.service.ts.

    import { Injectable } from '@angular/core';
    import { Socket } from 'ngx-socket-io';
    import { Deck } from '../deck.class';

    @Injectable({
      providedIn: 'root'
    })
    export class SocketService {
      deck = this.socket.fromEvent<Deck>('deck');
      constructor(private socket: Socket) { }

      getNewDeck() {
        console.log('emmiting');
        this.socket.emit('getNewDeck');
      }
    }

Тут мы в переменную deck помещаем отслеживаемый обект.
Декоратором @Injectable мы делаем сервис способным к применению внутри компонентов. 
Функцией emit объекта socket мы передаем информацию на сервер. 

    deck = this.socket.fromEvent<Deck>('deck');
    
Далее мы будем подписываться на него в компоненте.

Подключим его в конструкторе компонента колоды карт.

    import { SocketService } from './../socket.service';

    ...
    
    constructor( private socket_service: SocketService) { }
    

      ngOnInit() {
        ...
        this.socket_service.getNewDeck();
      }    
      
      
Добавим кнопку получения новой колоды и привяжемся к клику функцией 

   

    @Component({
      selector: 'app-deck',
      template: `
        
        <button (click)="doGetNewDeck()">Get new deck</button>
      `,
      ...
    })
    export class DeckComponent implements OnInit {

      ....

      doGetNewDeck(){
        this.socket_service.getNewDeck();
      }

    }
          
Обработаем событие на сервере.

    io.on('connection', function(socket){
      console.log('a user connected');

      socket.on("action:getDeck", () => {
        console.log('Getting a new Deck of card!')
      });

    });   
          
Обращая внимание что мы работаем внутри колбэка соединения в который опускается объект socket текущего пользователя.

Мы используем этот объект для добавления реакций на приходящие emit-ы от Ангуляра.

Итак теперь можно попробавать импортировать класс колоды и задействовать его методы.

Выведем перемешанную колоду в консоль.


    import { Deck } from '../app/deck.class';
      
      
      socket.on("action:getDeck", () => {
        let deck = new Deck()
        deck.shuffleDeck(3);
        console.log(deck);
      });
      
      
![card game]({path-to-subject}/images/5.png)      
      
Отправим ее в Ангуляр.

    socket.emit("deck", deck);
    
Выловим в сервисе событие.

      constructor( private socket_service: SocketService) { }

      ngOnInit() {
        //this.deck = new Deck(); убираем колоду из клиента
        //this.deck.shuffleDeck(3);
        this.socket_service.deck.subscribe(deck => {
          this.deck = deck;
        });

      }
    
Но тут возникает проблема.

Через сокеты не передаются методы объектов, только атрибуты.

Поэтому пришлось добавить статический метод-фабрику в класс Deck.

      public static fabric(deck: Deck): Deck {
        const d = new Deck()
        var cards = [];
        for(let c of deck.cards){
          cards.push(new Card(c.Ranck, c.Face));
        }
        d.cards = cards;
        console.log(d);
        return d;
      }

Где я создаю колоду на стороне клиента по объекту колоды, которая приходит из сокета.

Далее я применяю эту фабрику в компоненте.

  ngOnInit() {
    this.socket_service.deck.subscribe((deck: any) => {
      this.deck = Deck.fabric(deck);
    });
  }

Теперь реализуем функцию взятия карты на сервере.

      socket.on("getCard", () => {
        let card = socket.deck.getCard();
        socket.emit("action:getCard", card);
      });
          
Предварительно добавив колоду в сокет.

      socket.on("getNewDeck", () => {
        let deck = new Deck();
        deck.shuffleDeck(3);
        socket.deck = deck;
        socket.emit("action:getDeck", deck);
      });      
 
Добавим в сервис подписчика и событие на взятие карты. 
 
     
    export class SocketService {
      deck = this.socket.fromEvent<Deck>('action:getDeck');
      card = this.socket.fromEvent<Card>('action:getCard');
      constructor(private socket: Socket) { }

      getNewDeck() {
        this.socket.emit('getNewDeck');
      }

      getCard() {
        this.socket.emit('getCard');
      } 
     
В компоненте подписываемся.

      ngOnInit() {
        this.socket_service.deck.subscribe((deck: any) => {
          this.deck = Deck.fabric(deck);
        });
        this.socket_service.card.subscribe((card: any) => {
          let c = new Card(card.Face,card.Ranck);
          c.faceUp();
          this.UserCards.push(c);
        });
      }
      
**Примечание** - подписываемые переменные лучше помечать знаком $ в конце имени переменной.

    deck$ = this.socket.fromEvent<Deck>('action:getDeck');

Теперь на сервере передадим вместе с картой и текущую колоду.

    socket.emit("action:getCard", {'card':card, 'deck': socket.deck});

Исправим компонент обновляя текущую колоду при подписке на card$ в Ангуляре.

    this.socket_service.card$.subscribe((data: any) => {
      let c = new Card(data.card.Face,data.card.Ranck);
      c.faceUp();
      this.UserCards.push(c);
      this.deck = Deck.fabric(data.deck);
    });




Добавим подсчет очков на сервере.

      socket.on("getNewDeck", () => {
        ...
        socket.score = 0;
        ...
      });

      socket.on("getCard", () => {
        ...
        socket.score = socket.score + card.Ranck;
        socket.emit("action:getCard", {'card':card, 'deck': socket.deck, 'score': socket.score});
      });
  
Выведем в компоненте.

    @Component({ `
        ...
          You get <strong>{{score}}</strong> points.
        ...
      `
    })
    export class DeckComponent implements OnInit {
     ...
      score: number = 0;
      ....
      ngOnInit() {
        
        this.socket_service.card$.subscribe((data: any) => {
          ...
         
          this.score = data.score;
        });
      }
          
Полный код компонента.

    import { SocketService } from './../socket.service';
    import { Component, OnInit } from '@angular/core';
    import { Observable, Subscription } from 'rxjs';
    import { Deck } from '../../deck.class';
    import { Card } from '../card.class';

    @Component({
      selector: 'app-deck',
      template: `
        <div id="deck" *ngIf="is_started">
            <ul> <li *ngFor="let c of deck?.cards"> <app-card [card]="c"></app-card> </li> </ul>
        </div>
        <div id="userCards" *ngIf="is_started">
          <button (click)="doGetCard()">Get one Card</button>
          You get <strong>{{score}}</strong> points.
          <div *ngFor="let uc of UserCards" id="UserCards">
            <ul>
              <li><app-card [card]="uc"></app-card></li>
            </ul>

          </div>
        </div>
        <button *ngIf="!is_started" (click)="start()">Start the game!</button>

      `,
      styleUrls: ['./deck.component.css']
    })
    export class DeckComponent implements OnInit {
      is_started: boolean = false;
      deck: Deck;
      score: number = 0;
      UserCards: Card[] = [];
      constructor( private socket_service: SocketService) { }

      ngOnInit() {
        this.socket_service.deck$.subscribe((deck: any) => {
          this.deck = Deck.fabric(deck);
        });
        this.socket_service.card$.subscribe((data: any) => {
          let c = new Card(data.card.Face,data.card.Ranck);
          c.faceUp();
          this.UserCards.push(c);
          this.deck = Deck.fabric(data.deck);
          this.score = data.score;
        });
      }

      doGetCard(){
        this.socket_service.getCard();
      }

      start(){
        this.socket_service.getNewDeck();
        this.is_started = true;
      }

    }


     
            
