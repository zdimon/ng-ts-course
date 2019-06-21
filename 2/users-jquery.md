# Работа со списком пользователей на jQuery


Шаблон приложения.

    <!DOCTYPE html>
    <html>
        <head><title>User list</title></head>
        <body>


           <!--Место вывода списка -->
           <ul id="user_list"></ul>

            <script src="/node_modules/systemjs/dist/system.js"></script>
            <script src="/node_modules/typescript/lib/typescript.js"></script>
            <script>

                System.config({
                    defaultJSExtensions: true,
                    paths: {
                        'jquery' :'./node_modules/jquery/dist/jquery.min.js',
                    }
                });
                System
                  .import('built/main.js')
                  .then(null, console.error.bind(console));       
            </script>
        </body>
    </html>


Файл настроек typescript.


    {
        "compilerOptions": {
            "allowSyntheticDefaultImports": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "module": "system",
            "target": "ES5",
            "outDir": "built",
            "rootDir": "src"
        },
        "include": [
            "**/*"
        ],
        "exclude": [
            "node_modules",
            "**/*.spec.ts"
        ]    
    }


Файл приложения main.ts.

Импортируем jquery

    import $ from "jquery";


Создадим пустое приложение (объект).


    var app: any = {}
    
Добавим в него данные 

    app.data = [
      {'id':1, 'username': 'Dima', 'email': 'zdimon77@gmail.com' },
      {'id':2, 'username': 'Vova', 'email': 'vova@gmail.com' },
      {'id':3, 'username': 'Petro', 'email': 'petro@gmail.com' }
    ]    
    
    
Определим метод инициализации

    app.init = function(){
      this.user_list = $('#user_list');
      this.update();
    }    
        
        
Метод прорисовки списка.

app.update = function():void{
  this.user_list.empty();
  for(let user of this.data){
        //добавим элементы в список
        let el = `<li>${user.username}:${user.email}
        <a id='${user.id}' href="#">Delete</a>
        </li>`;
        this.user_list.append(el) 
    }
  }    
    
После прорисовки навесим событие на ссылку Delete.    
    
  this.user_list.find("a").on('click',(e) => {
    alert($(e.target).attr('id'));
    // тут будем удалять пользователя
    
  })    
    
    
Метод удаления пользователя.

    app.delete_user = function(user_id: number){
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

Не всегда стрелочная функция помогает сохранить контекст.

Она работает только при определении колбека.    

В других случаях используется такой костыль.

    var that = this;

Либо вызов функции с передачей контекста.

    this.delete_user.call(this,$(e.target).attr('id'));
    
    
    
    

