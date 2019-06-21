import $ from "jquery";
import { say } from './mylib';


class User{
  username: string;
  email: string;
  id: number;
}

class App{
  //начальные данные
  users: User[] = [{
    'username': 'Dima', 
    'email': 'zdimon77@gmail.com',
    'id': 1
  }];
  user_list: any;
  // инициализация
  constructor(){
    this.user_list = $('#user_list');
    this.update();
  }

  // прорисовка
  update() {
    this.user_list.empty();
    for(let user of this.users){
      //добавим элементы в список
      let el = `<li>${user.username}:${user.email}
      <a id='${user.id}' href="#">Delete</a>
      </li>`;
      this.user_list.append(el)
      
    }
    // подвешиваем событие
    this.user_list.find("a").on('click',(e) => {
      // тут будем удалять пользователя
      this.delete_user(parseInt($(e.target).attr('id')));
      
    })

  }
  delete_user(user_id: number){
    for(let user of this.users){
      if (user.id == user_id){
        let idx = this.users.indexOf(user);
        this.users.splice(idx,1);
        this.update();
      } 
    }
  }

}

var app = new App();
