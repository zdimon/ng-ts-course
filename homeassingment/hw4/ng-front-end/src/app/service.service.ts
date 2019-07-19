import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HOST, PORT  } from './settings'
import {Observable} from 'rxjs';
import { User } from './model'

const HOST = 'http://localhost:';
const PORT = 8083;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

    console.log(HOST);
  }

  getUsers() {
    return this.http.get(`${HOST}${PORT}`);
  }

  addUser(user: User){
      return this.http.put(`${HOST}${PORT}`, user);
  }

  // getUsersPromise() {
  //   return this.http.get('http://localhost:8083/').toPromise();
  // }


}
