import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "../news.service";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  news: any;

  constructor(private news_service: NewsService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params=>{
      console.log(params['id']);
      this.news_service.getDetail(params['id']).subscribe(data =>{
        this.news = data;
      })
    })
  }

}
