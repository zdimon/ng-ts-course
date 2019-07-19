import { Component } from '@angular/core';
import { ArticleService } from './article.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
  <h1>Article component</h1>
  <ul>
    <li *ngFor="let article of articles">{{ article.title  }}</li>
  </ul>
  <button (click)="goToUsers()">Go to users</button>
  `
})
export class ArticleComponent {
  articles: any[];
  constructor(private article_service: ArticleService, private router: Router){
    this.articles = this.article_service.getArticle();
  }

  goToUsers(){
    this.router.navigate(['user','dima'])
  }

}
