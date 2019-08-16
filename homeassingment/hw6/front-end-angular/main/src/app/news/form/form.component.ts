import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "../news.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  news:any;
  edit = false;
  create = false;

  constructor(private news_service: NewsService, private router: ActivatedRoute) { }

  ngOnInit() {
    //TODO: Сделать метод редактирования новости
    // this.router.params.subscribe(params=>{
    //   this.news_service.getDetail(params['id']).subscribe(data =>{
    //     this.news = data;
    //   })
    // });

    this.news = {
      title: 'title',
      content: 'content',
      author: 'author'
    };

  this.edit = this.news === 0;

    if (!this.news) {
      this.create = true;
      }
  }
    //TODO: Не работает метод.
    createNews(){
      this.news_service.createNews(this.news).subscribe(()=>{
        })
    };
}
