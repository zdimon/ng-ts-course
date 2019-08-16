## Модули

В ангуляре все приложения имеют модульную структуру.

Создается новый модуль командой

    ng g m modulename

Система модульности носит название NgModules.

Модули представляют собой контейнеры для связанных блоков кода, которые определены для отдельной области приложения или частей, связанных общим набором функциональностей.

Модули могут содержать компоненты, сервисы и другие элементы, которые могут импортировать функционал из других модулей на ряду с экспортированием.

Иными словами, модуль — это упаковка или инкапсуляция части функционала приложения. 

Модули можно проектировать с учетом многократного использования, т.е. не зависящие от конкретной реализации приложения.

Каждое ангуляр-приложение имеет как минимум один модуль - корневой.

Он по умолчанию имеет класс AppModule а файл называется app.module.ts.

Корневой модуль в приложении Angular используется в качестве точки входа.

Класс модуля объявляется с использованием декоратора @NgModule().

Корневой модуль для нового приложения.

    @NgModule({
      declarations: [AppComponent],
      imports: [BrowserModule],
      bootstrap: [AppComponent],
    })
    export class AppModule { }  
    
    
В качестве аргумента в декораторе @NgModule используется JavaScript объект.

## Declarations

В свойстве declarations мы объявляем компоненты, которые содержит наш модуль.

Мы можем сообщить нашему приложению о том, какой функционал мы хотим добавить (компоненты, директивы и пайпы) путем перечисления их в свойстве declarations объекта.

После объявления компонентов мы можем использовать их внутри других компонентов через их селектор, который указывается в описании компонента.

## Imports

В этой секции мы указываем модули, которые экспортируют классы, необходимые для работы шаблонов компонентов.

BrowserModule - отвечает за работу приложения в браузере. 

По сути это сервис, который взаимодействует с нашим кодом (например AppComponent) и API браузера. 

BrowserModule также включает в себя директивы NgIf и NgFor, который мы можем использовать в шаблонах компонентов.

Но что если мы хотим использовать функционал, который необходим для реализации форм, например ngModel и http? 

Решение просто — нам достаточно импортировать данные модули в AppModule:

    @NgModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ],

После того, как мы импортировали модуль FormsModule, мы можем использовать ngModel в шаблонах наших компонентов. 

А HttpModule позволяет нам отправлять или получать данные по HTTP протоколу.



## Bootstrap

Секция, содержащая главное представление приложения - корневой компонент. Только корневой модуль содержит данную секцию.

## Дополнительные секции.

    import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    @NgModule({
      imports:      [ BrowserModule ],
      providers:    [ Logger ],
      declarations: [ AppComponent ],
      exports:      [ AppComponent ],
      bootstrap:    [ AppComponent ]
    })
    export class AppModule { }

## Exports

Секция, содержащая список компонентов, которые должны быть видимыми для шаблонов компонентов других модулей.

## Providers

Секция, создающая сервисы, которые этот модуль распространяет в глобальном пространстве сервисов.

После этого эти сервисы становятся доступными из любой точки приложения.

Вы так же можете определить сервис на уровне компонента, что более предпочтительней.

Пример использования сервиса на уровне компонента.

## Сервис логирования.

    // logger.service.ts
    import { Injectable } from '@angular/core';

    @Injectable()
    export class LoggerService {  
      log = (msg: string) => {
        console.log(msg);
      };
    }

## Сервис пользователей

    import { Injectable } from '@angular/core';

    @Injectable()
    export class UserService {  
      getUsers = () => [
        { id: 1, name: 'dima' },
        { id: 2, name: 'timur' }
      ];
    }

## Компонент.

    import { Component } from '@angular/core';
    import { UserService } from './user.service';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css'],
      providers: [UserService]
    })
    export class AppComponent {
      users: any;
      constructor(private user_service: UserService){
        this.users = user_service.getUsers()
      }
    }


## Шаблон.

    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <ul>
        <li *ngFor="let user of users"> {{ user.name  }}</li>
      </ul>

    </div>

## Подмена класса провайдера.

    providers: [{ provide: UserService, useClass: UserTestService }]



