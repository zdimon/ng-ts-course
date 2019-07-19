import { Injectable } from '@angular/core';

@Injectable()
export class ArticleService {
  getArticle = () => [
    { id: 1, title: 'Article 1' },
    { id: 2, title: 'Article 2' }
  ];
}
