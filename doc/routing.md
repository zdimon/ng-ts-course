## Routing

Система роутинга позволяет производить навигацию между представлениями.

Навигация может быть вызвана 3-мя событиями.

- ввод url в строку навигации браузера

- клик на ссылке

- нажание на кнопку "назад"


Cистема роутинга отслеживает эти события и принимает решение какой компонент задействовать в соответствии с url.

Вы можете привязать ссылку к маршруту, а так же перейти на нужный маршрут императивно внутри кода (не только при клике на ссылку).


## <base href>

Элемент в секции head, который используется в качестве отправной точки для роутинга.

    <base href="/">

Значение по умолчанию.


Роутинг не является частью ядра Angular и импортируется отдельно.

    import { RouterModule, Routes } from '@angular/router';
    
При определении роутинга мы фактически связываем компонент с шаблоном url адреса.

    const appRoutes: Routes = [
          { path: 'crisis-center', component: CrisisListComponent },
          { path: 'hero/:id',      component: HeroDetailComponent }
      ]

Создадим два сервиса получения пользователей и статей.


    import { Injectable } from '@angular/core';

    @Injectable()
    export class ArticleService {
      getArticles = () => [
        { id: 1, title: 'article 1' },
        { id: 2, title: 'article 2' }
      ];
    }


    import { Injectable } from '@angular/core';

    @Injectable()
    export class UserService {
      getUsers = () => [
        { id: 1, name: 'dima' },
        { id: 2, name: 'timur' }
      ];
    }


И два компонента для отображения списков пользователей и статей.


    import { Component } from '@angular/core';
    import { UserService } from './user.service';

    @Component({
      selector: 'app-user',
      template: `
        <h1> Пользователи </h1>
        <ul><li *ngFor="let user of users">{{ user.name  }}</ul>
      `,
      providers: [UserService]
    })
    export class UserComponent {
      users: any;
      constructor(private user_service: UserService){
        this.users = user_service.getUsers()
      }
    }



    import { Component } from '@angular/core';
    import { ArticleService } from './article.service';

    @Component({
      selector: 'app-article',
      template: `
        <h1> Статьи </h1>
        <ul><li *ngFor="let article of articles">{{ article.title  }}</ul>
      `,
      providers: [ArticleService]
    })
    export class ArticleComponent {
      articles: any;
      constructor(private article_service: ArticleService){
        this.articles = article_service.getArticles()
      }
    }

Определим роутинг в корневом модуле.


    import { RouterModule, Routes } from '@angular/router';


    const routes: Routes = [
      { path: 'users', component: UserComponent },
      { path: 'articles',      component: ArticleComponent }
    ]

Подключим роутинг.

      imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
      ],
  
  
Вставляем директиву для вывода выхлопа от роутинга в шаблоне корневого компонента.  
    
    <router-outlet></router-outlet>   
  
  
### Определение корневого роутинга.

    { path: '', component: UserComponent },  


### Ссылки на маршруты роутинга.

    <a routerLink="/users" routerLinkActive="active">Пользователи</a>
    <a routerLink="/articles" routerLinkActive="active">Статьи</a>    
    
## Параметры роутинга      
      
   { path: 'user/:name', component: UserComponent }, 
   
Ссылка

    <a routerLink="/user/dima" routerLinkActive="active">Пользователь</a>  


Чтобы получить значение параметров внутри компонента нам понадобиться класс ActivatedRoute.


    import { ActivatedRoute } from '@angular/router';
    
Получаем параметр подпиской на объект роутинга.

    this.route.params.subscribe(
      params => {
        this.username = params['name'];
        console.log(this.username);
      }
    )    
  
## Переход на нужный роутинг.    

    import {Router} from "@angular/router";
    
    this.router.navigate(['articles']);
    
    
C использованием параметра.

    this.router.navigate(['user','timur']);
    
    
    
    
