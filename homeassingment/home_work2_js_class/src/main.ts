import { some } from './export_lib'
import $ from "jquery";
//const $ = JQuery.default;

// Определяем модель
//let app: any = {}

// Определяем класс пользователя
class User{
  id: number;
  username: string;
  email: string;
  age: number;
}

// Определяем класс приложения
class App {
  users: Array<User> = [{
    'id':0,
    'username':'Dima',
    'email':'zdimon77@gmail.com',
    'age':33
  },
  {
    'id': 1,
    'username': 'Kevin',
    'email': 'shindel@bk.ru',
    'age': 33
  },
  {
    'id': 2,
    'username': 'Dima',
    'email': 'zdimon77@gmail.com',
    'age': 40
  },
  {
    'id': 3,
    'username': 'Username',
    'email': 'some@email.com',
    'age': 99
  }]

  // инициализация свойств конструктора
  user_list:any;
  add_user:any;
  search_user:any;
  clear_search:any;

  // Определяем конструктор
  constructor(){
    this.user_list = $('#user_list');
    this.add_user = $('#add_btn');
    this.search_user = $('#search_btn');
    this.clear_search = $('#clean_btn');
    this.update();

  // Создаём события

  this.add_user.on('click', (e) => {
    let username: string = <string>$('#username').val();
    let email: string = <string>$('#email').val();
    let age: number = <number>$('#age').val();
    this.add(username,email,age);
    //this.add(<string>$('#username').val(), <string>$('#email').val(), <number>$('#age').val());
  });

  this.search_user.on('click', (e) => {
    this.search($('#search_input').val())
  });

  this.clear_search.on('click', (e) => {
    this.update()
  });

  }

  // Определяем прорисовку приложения
  update(){
    this.user_list.empty()
    for (let user of this.users) {
      let row = `<tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>
                      <button id='${user.id}' class='btn btn-warning'>Delete</button>
                    </td>
                  </tr>`

      this.user_list .append(row)
  }
  // цепляем событие на удаление
  this.user_list.find('button').on('click', (e) => {
    this.delete(parseInt($(e.target).attr('id')));
  });
}

// Удаление пользователя
delete(user_id:number) {
  for (let user of this.users) {
    if (user_id == user.id) {
      let idx = this.users.indexOf(user)
      this.users.splice(idx, 1);
      this.update();
    }
  }
};

// Создаём метод добавления пользователей
// TODO:  Что то пошло не так, задваивает пользователей
add(username:string, email:string, age:number){
  let id:number = this.users.length;
  this.users.push({ 'id': id, 'username': username, 'email': email, 'age': age })
  this.update();
};

// Создаём метод поиска пользователя
search(email) {
  this.user_list.empty()
  for (let user of this.users) {
    if (user.email.indexOf(email) > -1) {
      let row = `<tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>
                      <button id='${user.id}' class='btn btn-warning'>Delete</button>
                    </td>
                  </tr>`

      this.user_list.append(row)
      alert(`User found! ${user.username}`)
    }
  }
 }
}
// Создаём экземпляр класса
const app = new App();
