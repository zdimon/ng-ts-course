import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class User {
  id: number;
  username: string;
  email: string;
  age: number;
}





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  users: User[] = [];

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  getUsers(){
    let ff = this.http.get('http://localhost:8083/').subscribe((res: any)=>{
      this.users = res;
   })
   ff.unsubscribe();
  }

  //username: string;
  //email: string;
  //age: number;
  user: User = {
    id: 0,
    username: 'null',
    email: 'null',
    age: 0
  }

  searchInput: string;


  delete(userId: number) {
    for (const user of this.users) {
      if (userId === user.id) {
        const idx = this.users.indexOf(user);
        this.users.splice(idx, 1);
      }
    }
  }

  add() {
    const ID: number = this.users.length;
    this.users.push({
      id: this.user.id,
      username: this.user.username,
      email: this.user.email,
      age: this.user.age
    });
  }

  edit(user: User){
    this.user= user;
  }

  // TODO: Как реализовать поиск?
  search(emailSearch: string) {
    this.users = [];
    for (const user of this.users) {
      const ID: number = this.users.length;
      if ( user.email.indexOf(emailSearch) != -1) {
            // DO SOMETHING
            //let index: number = DB.indexOf(user);
            //this.users.push(DB[index]);
      }
    }

  }
  // TODO: Как реализовать очистку поиска?
  clear(): void {
    this.getUsers();
  }
}
