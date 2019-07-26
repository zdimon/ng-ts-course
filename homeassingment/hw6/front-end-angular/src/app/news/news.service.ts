import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http_service: HttpClient) { }

  getAllNews(){
    return this.http_service.get('http://localhost:3000/news')
  }
}
