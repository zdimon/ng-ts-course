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
