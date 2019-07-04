npm install lite-server --save
-----
Can not find module jquery
npm install --save-dev @types/jquery
-----
'app' is declared but its value is never read.ts(6133)
Cannot redeclare block-scoped variable 'app'.ts(
----

Type '({ 'id': number; 'username': string; 'email': string; 'age': number; } | { 'id': number; 'username': string; 'email': string; 'age': string; })[]' is missing the following properties from type 'User': id, username, email, age

users: User  => users: User[] || users: Array<User>

---
',' expected.ts
  {
    'id': 2,
    'username': 'Dima',
    'email': 'zdimon77@gmail.com',!!!!!!!
    'age': '40'
  },

----

Type 'string' is not assignable to type 'number'

  {
    'id': 2,
    'username': 'Dima',
    'email': 'zdimon77@gmail.com',
    'age': '40' what the fuck!!!
  },

----

Argument of type 'string | number | string[]' is not assignable to parameter of type 'string'.

    this.add_user.on('click', (e) => {
      let username: string = <string>$('#username').val();
      let email: string = <string>$('#email').val();
      let age: number = <number>$('#age').val();
      this.add(username,email,age);
      //this.add(<string>$('#username').val(), <string>$('#email').val(), <number>$('#age').val());
    });

---

'(' expected.ts(1005)

if user_id == user.id { => if (user_id == user.id) {


---
Property 'name' does not exist on type 'User'.ts(2339
<td>${user.name}</td> => <td>${user.username}</td>
---

---
Unexpected token. A constructor, method, accessor, or property was expected.ts(1068)

let app = new App(); => const app = new App();

---

(SystemJS) $ is not a function

import $ from "jquery";
//const $ = JQuery.default;


По логике

События добавления  и поиска вынести в конструктор.

Поиск по подстроке а не по полному совпадению

 if (user.email.indexOf(email) > -1) { // ну то такое..
