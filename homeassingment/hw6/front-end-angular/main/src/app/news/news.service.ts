import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http_service: HttpClient) { }

  getAllNews(){
    return this.http_service.get('http://localhost:3000/news');
  }

  getDetail(id:any){
    return this.http_service.get('http://localhost:3000/news/'+id);
  }

  deleteNews(id:any){
    return this.http_service.delete('http://localhost:3000/news/'+id);
  }

  updateNews(id:any,data){
    return this.http_service.put('http://localhost:3000/news/'+id,data);
  }

  createNews(data:any){
    return this.http_service.post('http://localhost:3000/news/',data);
  }
}
