# Ангуляр. CRUD операции.

Создаем проект.

    ng new prj-crud
    cd prg-crud
    npm install
    
Добавляем bootstrap.

    npm install bootstrap --save
    
angular.json

    "styles": [
       "./node_modules/bootstrap/dist/css/bootstrap.min.css"
     ],
    
Создаем новый модуль для новостей.

    ng g m news
    
Создаем компоненты.

    ng g c news
    ng g c news/form
    ng g c news/detail
    ng g c news/list
    
Подключаем роутинг.


    import { ListComponent } from './news/list/list.component';
    import { DetailComponent } from './news/detail/detail.component';
    import { FormComponent } from './news/form/form.component';

    const routes: Routes = [
      {
        path: 'news/create',
        component: FormComponent
      },
      {
        path: 'news/edit/:id',
        component: FormComponent
      },
      {
        path: 'news/detail/:id',
        component: DetailComponent
      },
      {
        path: 'news/list',
        component: ListComponent
      }
    ];

Шаблон навигации.

    <nav class="navbar navbar-expand-sm bg-light">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a routerLink="news/create" class="nav-link" routerLinkActive="active">
              Create News
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="news/list" class="nav-link" routerLinkActive="active">
              News list
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
    
Подключаем модуль.


    import { NewsModule } from './news/news.module';    
    ...
      imports: [
        BrowserModule,
        AppRoutingModule,
        NewsModule
      ],
      
Создаем сервис для новостей.

    ng g s news/news --spec=false     
    
Подключаем HttpClientModule и NewsService в модуле новостей.

    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormComponent } from './form/form.component';
    import { DetailComponent } from './detail/detail.component';
    import { ListComponent } from './list/list.component';
    import { NewsComponent } from './news.component';
    import { HttpClientModule } from '@angular/common/http';
    import { NewsService } from './news.service';

    @NgModule({
      declarations: [FormComponent, DetailComponent, ListComponent, NewsComponent],
      imports: [
        CommonModule,
        HttpClientModule
      ],
      providers: [NewsService]
    })
    export class NewsModule { }


      
Определяем функцию забора всех новостей.  
      
          
      getAllNews(){
        return this.http.get('http://localhost:3000/news');
      }   
      
Задействуем этот метод в компоненте.

    import { Component, OnInit } from '@angular/core';
    import { NewsService } from '../news.service';

    @Component({
      selector: 'app-list',
      templateUrl: './list.component.html',
      styleUrls: ['./list.component.css']
    })
    export class ListComponent implements OnInit {

      news: any;

      constructor(private news_service: NewsService) { }

      ngOnInit() {
        this.news_service.getAllNews().subscribe((news: any) => {
          this.news = news;
        });
      }

    }

Шаблон.

    <table class="table">
      <tr *ngFor="let n of news">
        <td> {{ n.title  }}  </td>
        <td> {{ n.author  }}  </td>
      </tr>
    </table>    
    
    
Использование async.

        
    <table class="table">
      <tr *ngFor="let n of news | async">
        <td> {{ n.title  }}  </td>
        <td> {{ n.author  }}  </td>
      </tr>
    </table>    
   
  ngOnInit() {
    this.news = this.news_service.getAllNews();
  }    
    
## Компонент детальной информации.

Дорабатываем шаблон.

    <table class="table">
      <tr *ngFor="let n of news | async">
        <td> <a routerLink="/news/detail/{{ n.id }}"> {{ n.title  }} </a>  </td>
        <td> {{ n.author  }}  </td>
      </tr>
    </table>

Импортируем и добавляем роутинг в модуле новостей.

    import { AppRoutingModule } from '../app-routing.module';        
      
На сервере разрешаем запросы.

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
      
      
      
      
Компонент детальной информации.

    import { Component, OnInit } from '@angular/core';
    import { NewsService } from '../news.service';
    import { ActivatedRoute } from '@angular/router';

    @Component({
      selector: 'app-detail',
      templateUrl: './detail.component.html',
      styleUrls: ['./detail.component.css']
    })
    export class DetailComponent implements OnInit {
      news: any;
      constructor(private news_service: NewsService, private router: ActivatedRoute) { }

      ngOnInit() {
        this.router.params.subscribe(params => {
          this.news = this.news_service.getDetail(params['id']).subscribe((news: any) => {
            this.news = news;
          });

       });
      }

    }


Сервис.

    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    @Injectable({
      providedIn: 'root'
    })
    export class NewsService {

      constructor(private http: HttpClient) { }

      getAllNews(){
        return this.http.get('http://localhost:3000/news');
      }

      getDetail(id: string){
        return this.http.get('http://localhost:3000/news/'+id);
      }

    }


Шаблон.

    <p>
      {{ news.title }}
    </p>
    <p>
      {{ news.content }}
    </p>
    <p>
      {{ news.author }}
    </p>
          
Форма редактирования/добавления.          
      
      
      
