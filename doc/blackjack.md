# Игра в очко.

Задача создать карточную игру BlackJack.

Игрок играет с дилером (казино).

Где игроку предлагается поочередно брать карты и набирать очки.

Каждая карта дает ему от 1 до 11 балов в зависимоти от типа карты.

В любой момент игрок может остановится и дать возможность диллеру брать карты.

Дилер набирает до тех пор, пока не наберет 18 и выше (меньше 21), после чего игра останавливается и определяется победитель.

Проигрывает тот кто набирает больше 21 либо меньшее количество очков чем у соперника.


Создадим проект и запустим компиляцию.

    ng new game
    cd game
    ng serve -o
    
Добавляем новый модуль.

    ng g module game
    
Генерируем два компонента.

    ng g c game/deck
    ng g c game/card
    
Экспортируем компоненты DeckComponent и CardComponent из модуля GameModule.

    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { DeckComponent } from './deck/deck.component';
    import { CardComponent } from './card/card.component';

    @NgModule({
      declarations: [DeckComponent, CardComponent],
      imports: [
        CommonModule
      ],
      exports: [DeckComponent, CardComponent]
    })
    export class GameModule { }

        
Вставим селекторы в шаблон.

    <app-card></app-card>
    
Положим картинку с картами в assets.

![card game]({path-to-subject}/images/cards.png)

Установим стили для дива карточки.

    div {
      background: url('/assets/cards.png');
      width: 69px;
      height: 94px;
      background-position-y: 0;
      background-position-x: 0;
    }
    
Мы определяем блок фиксированной ширины и высоты, подставляя фоном изображение-карту со всеми видами карт.

Далее, в зависимости от типа карты мы будем изменять css свойства background-position-y и background-position-x, перемещая фон в нужную позицию.

Выведем тестовую карту в шаблоне компонента.

        import { Component, OnInit } from '@angular/core';

        @Component({
          selector: 'app-card',
          template: `
               <div></div>
               `,
          styleUrls: ['./card.component.css']
        })
        export class CardComponent implements OnInit {

          constructor() { }

          ngOnInit() {
          }

        }
        

Теперь создадим интерфейс и класс для карты.

    export interface Icard {
      XBgPosition: number;
      YBgPosition: number;
      Ranck: number;
      Face: number;
      Width: number;
      Height: number;
    }


    import { Icard } from './card-interface';

    export class Card implements Icard {
      XBgPosition: number;
      YBgPosition: number;
      Ranck: number;
      Face: string;
      Width: number;
      Height: number;

      constructor(){
        this.Width = 69;
        this.Height = 94;
      }

    }

В свойствах XBgPosition и YBgPosition мы храним положение фона.

Свойство Ranck будет использоваться для определения смещения по оси x в зависомости от типа карты.

Свойство Face будет хранить масть карты и определять смещение по оси y.

Width и Height соответственно высота и ширина блока карты, которое задается в конструкторе.


Изменим компонент с использованием нашего класса.

    import { Component, OnInit } from '@angular/core';
    import { Card } from '../card.class';

    @Component({
      selector: 'app-card',
      template: `
           <div [style.background-position-x.px]="card.XBgPosition" [style.background-position-y.px]="card.YBgPosition"></div>
           <input type="text" name="x" [(ngModel)] = "x" />
           <input type="text" name="y" [(ngModel)] = "y" />
           `,
      styleUrls: ['./card.component.css']
    })
    export class CardComponent implements OnInit {

      card: Card;
      constructor() {
        
      }

      ngOnInit() {
        this.card = new Card();
      }

    }
    
При этом привяжем свойства css background-position-x и background-position-y к переменным компонента.

![card game]({path-to-subject}/images/1.png)  

Видим что при изменении переменных через input меняется положение фоновой картинки.

Добавим в интерфейс карты методы переворота карты и имплементируем их в классе.

    export interface Icard {
      XBgPosition: number;
      YBgPosition: number;
      Ranck: number;
      Face: number;
      Width: number;
      Height: number;
      faceDown(): void;
      faceUp(): void;
    }

    import { Icard } from './card-interface';

    export class Card implements Icard {
      XBgPosition: number;
      YBgPosition: number;
      Ranck: number;
      Face: number;
      Width: number;
      Height: number;

      constructor(rank: number, face: number){
        this.Width = 69;
        this.Height = 94;
        this.Ranck = rank;
        this.Face = face;
        this.init();
      }

      init(){
        this.faceDown();
      }

      faceDown(): void{
        this.XBgPosition = 0;
        this.YBgPosition = 0;
      }

      faceUp(): void{
        this.XBgPosition = this.Ranck*this.Width
        this.YBgPosition = this.Face*this.Height
      }

    }

Теперь можно отработать клик на карте в компоненте.

    <div (click)="flip()" [style.background-position-x.px]="card.XBgPosition" [style.background-position-y.px]="card.YBgPosition"></div>
    
    ...
    
      doFaceDown(){
        this.card.faceDown();
      }

      doFaceUp(){
        this.card.faceUp();
      }

      flip(){
        if(this.card.XBgPosition==0){
          this.card.faceUp();
        } else {
          this.card.faceDown();
        }
      }    

Далее приступим к разработке класса колоды.

Пока его интерфейс и класс выглядит так:

import { Card } from './game/card.class';

    interface IDeck {
      faces: number[];
      ranks: number[];
      cards: Card[];
      create(): void;
    }

    export class Deck implements IDeck{
       faces: number[];
       ranks: number[];
       cards: Card[] = [];
       constructor(){
        this.ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13];
        this.faces = [1,2,3,4];
        this.create();
       }
       create(){
          for(let f of this.faces){
            for(let r of this.ranks){
              this.cards.push(new Card(r, f));
            }
          }
       }
    }

Мы определили массив ranks c 13 видами карт и массив с мастями.

Далее в методе create мы двумя вложенными циклами заполнили массив cards.

Хотя можно было сделать проще.

    for (var i = 1; i < 14; i++) {}

Компонент колоды будет таким.

    import { Component, OnInit } from '@angular/core';
    import { Deck } from '../../deck.class';

    @Component({
      selector: 'app-deck',
      template: `
        <ul> <li *ngFor="let c of deck.cards"> <app-card [card]="c"></app-card> </li> </ul>
      `,
      styleUrls: ['./deck.component.css']
    })
    export class DeckComponent implements OnInit {

      deck: Deck;
      constructor() { }

      ngOnInit() {
        this.deck = new Deck()
      }

    }

Где в цикле ngFor мы подключаем компонент карты, передавая ему объект карты в ввиде входного параметра.

Для того, чтобы компонент карты принял входной параметр, его нужно задекорировать Input-ом.

    @Input() card: Card;

Полный код card.component.ts

    import { Component, OnInit, Input } from '@angular/core';
    import { Card } from '../card.class';

    @Component({
      selector: 'app-card',
      template: `
           <div (click)="flip()" [style.background-position-x.px]="card.XBgPosition" [style.background-position-y.px]="card.YBgPosition"></div>

           `,
      styleUrls: ['./card.component.css']
    })
    export class CardComponent implements OnInit {

      @Input() card: Card;
      constructor() {

      }

      ngOnInit() {
      }

      doFaceDown(){
        this.card.faceDown();
      }

      doFaceUp(){
        this.card.faceUp();
      }

      flip(){
        if(this.card.XBgPosition==0){
          this.card.faceUp();
        } else {
          this.card.faceDown();
        }
      }

    }

При клике на карту срабатывает метод flip который по параметру this.card.XBgPosition определяет лежит ли карта рубахой вверх или вниз
и соответственно переворачивает ее, вызывая faceUp() или faceDown() методы объекта карты.


Результат работы.


![card game]({path-to-subject}/images/2.png) 

Соберем все карты в кучку css-ом.

    li {
        display: inline-block;
        position: absolute;
    }

Добавим метод вытаскивания карты в интерфейс колоды и иплементируем ее в класе.

    interface IDeck {
      faces: number[];
      ranks: number[];
      cards: Card[];
      create(): void;
      getCard(): Card;
    }
    
На этот раз метод будет возвращать объект карты, удаляя ее из колоды. 

   getCard(): Card {
    if (this.cards.length == 0) {
        throw new Error('No Cards In Deck');
    }
    return this.cards.shift();
  }

Попутно поднимая исключение, если карты закончились.

Вызовим этот метод в компоненте колоды deck.component.ts.


      <button (click)="doGetCard()">Get one Card</button>
      <div *ngFor="let uc of UserCards">
        <app-card [card]="uc"></app-card>
      </div>
      
      ....
      
      UserCards: Card[] = [];
      constructor() { }

      ....

      doGetCard(){
        const card = this.deck.getCard();
        card.faceUp();
        this.UserCards.push(card);
      }      

Мы определили новый список вытянутых пользователем карт в атрибуте UserCards и добавляем в него карты  this.UserCards.push(card), предварительно переворачивая ее.

Выводим этот список разворачивая в цикле компонент карт передавая в него карты из массива UserCards.

      <div *ngFor="let uc of UserCards">
        <app-card [card]="uc"></app-card>
      </div>

Добавим метод перемешивания колоды.

  shuffleDeck(times: number): void {
    var j, x, i, t;
    for (t = 0; t < times; t++) {
        for (i = this.cards.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = this.cards[i - 1];
            this.cards[i - 1] = this.cards[j];
            this.cards[j] = x;
        }
    }
  }
  
И вызовем его в компоненте при инициализации.

      ngOnInit() {
        this.deck = new Deck();
        this.deck.shuffleDeck(3);
      }  

Диаграмма наших классов, получаемая командой.

    shell>tsuml --glob './src/app/game/**/*.ts'
    Matched files:
    ./src/app/game/card-interface.ts
    ./src/app/game/card.class.ts
    ./src/app/game/card/card.component.ts
    ./src/app/game/deck/deck.component.ts
    ./src/app/game/game.module.ts
    ./src/app/game/user.class.ts

![card game]({path-to-subject}/images/1.svg) 

Создадим класс игрока.

    export class Player {
      name: string;
      money: number;
      bet: number;
    }









