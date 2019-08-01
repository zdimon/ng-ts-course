import { Component, OnInit } from '@angular/core';
import {NewsService} from "../news.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  news:any;

  constructor(private news_service: NewsService , private router: ActivatedRoute){ }

  ngOnInit() {
    this.news_service.getAllNews().subscribe((data:any)=>{
      this.news = data;
    });
  }

  deleteNews(id: any){
    this.news_service.deleteNews(id).subscribe(()=>{
      this.news_service.getAllNews().subscribe((data:any)=>{
        this.news = data;
      });
    })
  }
}
