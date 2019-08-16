# HTTP запросы в Ангуляр.

Создаем и запускаем проект

    ng new ngprj
    cd ngprg
    ng serve
    
Для генерации запросов на сервер используется модуль HttpClientModule. 

Его необходимо импортировать и включить в главный модуль проекта в секцию imports.


    import { HttpClientModule } from '@angular/common/http';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    
После этого становится возможным внедрение HttpClient в конструктор компонента.

        
    import { Component } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
      title = 'ngapp';
      constructor(private http: HttpClient) { }
    }
    
    
Совершаем GET запрос.    

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8083').subscribe((res: any)=>{
        console.log(res);
    });
  }
    
Определим переменную и заполним ее данными из запроса.    
    
    
    export class AppComponent {
      users: any = [];
      constructor(private http: HttpClient) {
        this.http.get('http://localhost:8083').subscribe((res: any)=>{
            this.users = res.users;
        });
      }
    }
    
Выведем данные в шаблоне.    
    
    <ul>
      <li *ngFor="let user of users">
        <h2>{{ user.name  }}</h2>
      </li>
    </ul>    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
