import {some} from './export_lib'
import * as JQuery from "jquery";
const $ = JQuery.default;

// Определяем модель
let user:Object = {}

// Определяем конструктор
user['init'] = function init(){
  let user_list = $('#user_list')
  let row = `<tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${age}</td>
            </tr>`
  user_list.append(row)
}

// Определеяем массив
user['data'] = [{
  'id':1,
  'name':'Kevin',
  'email':'shindel@bk.ru',
  'age':33
}]

// Определяем добавление пользователя

// Запускаем инициализацию
user['init']()
