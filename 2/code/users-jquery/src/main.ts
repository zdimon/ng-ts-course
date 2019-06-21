import $ from "jquery";

// Определим объект приложения 

var app: any = {}

// добавим данные 

app.data = [
  {'id':1, 'username': 'Dima', 'email': 'zdimon77@gmail.com' },
  {'id':2, 'username': 'Vova', 'email': 'vova@gmail.com' },
  {'id':3, 'username': 'Petro', 'email': 'petro@gmail.com' }
]

// метод инициализации
app.init = function(){
  this.user_list = $('#user_list');
  this.update();
}

//метод удаления пользователя
app.delete_user = function(user_id: number){
  console.log(this);
  var that = this;
  for(let user of this.data){
    if (user.id == user_id){
      let idx = this.data.indexOf(user);
      this.data.splice(idx,1);
      console.log(idx);
      this.update();
    } 
  }
}


// метод прорисовки списка
app.update = function():void{
  this.user_list.empty();
  for(let user of this.data){
    //добавим элементы в список
    let el = `<li>${user.username}:${user.email}
    <a id='${user.id}' href="#">Delete</a>
    </li>`;
    this.user_list.append(el)
    
  }
  // подвешиваем событие
  this.user_list.find("a").on('click',(e) => {
    alert($(e.target).attr('id'));
    // тут будем удалять пользователя
    this.delete_user.call(this,$(e.target).attr('id'));
    
  })
}
app.init();
