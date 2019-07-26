import { Component, OnInit } from '@angular/core';
import {NewsService} from "../news.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  news:any;

  constructor(private news_service: NewsService) { }

  ngOnInit() {
    this.news_service.getAllNews().subscribe((data:any)=>{
      this.news = data;
    });
  }

}
