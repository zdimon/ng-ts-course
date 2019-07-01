import { some } from './export_lib'
import * as JQuery from "jquery";
const $ = JQuery.default;

// Определяем модель
let app: any = {}

// Определеяем массив
app.data = [{
  'id': 1,
  'name': 'Kevin',
  'email': 'shindel@bk.ru',
  'age': 33
},
{
  'id': 2,
  'name': 'Dima',
  'email': 'zdimon77@gmail.com'
    'age': '40'
},
{
  'id': 3,
  'name': 'Username',
  'email': 'some@email.com',
  'age': 99
}]

// Определяем конструктор
app.init = function() {
  this.user_list = $('#user_list');
  this.add_user = $('#add_btn');
  this.search_user = $('#search_btn');
  this.clear_search = $('#clean_btn');
  this.update();
}

// Метод обновления списка
app.update = function(): void {
  this.user_list.empty()
  for (let user of this.data) {
    let row = `<tr>
                  <td>${user.id}</td>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>${user.age}</td>
                  <td>
                    <button id='${user.id}' class='btn btn-warning'>Delete</button>
                  </td>
                </tr>`

    this.user_list.append(row)
  }

  this.user_list.find('button').on('click', (e) => {
    this.delete.call(this, $(e.target).attr('id'));
  });

  this.add_user.on('click', (e) => {
    this.add.call(this, $('#username').val(), $('#email').val(), $('#age').val())
  });

  this.search_user.on('click', (e) => {
    this.search.call(this, $('#search_input').val())
  });

  this.clear_search.on('click', (e) => {
    this.update.call(this)
  });

}

// Удаление пользователя
app.delete = function(user_id) {
  // var that = this;
  for (let user of this.data) {
    if user_id == user.id {
      let idx = this.data.indexOf(user;)
      this.data.splice(idx, 1);
      this.update();
    }
  }
};

// Определяем добавление пользователя
// Что то пошло не так! ))))

app.add = function(username, email, age) {
  let id = this.data.length;
  this.data.push({ 'id': id, 'username': username, 'email': email, 'age': age })
  this.update();
};

// Поиск пользователя
app.search = function(email) {
  this.user_list.empty()
  for (let user of this.data) {
    if email == user.email {
      let row = `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>
                      <button id='${user.id}' class='btn btn-warning'>Delete</button>
                    </td>
                  </tr>`

      this.user_list.append(row)
      alert(`User found! ${user.name}`)
    }
  }
}

// Запускаем инициализацию
app.init()
