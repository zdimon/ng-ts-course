# Работа со списком пользователей на jQuery c классами


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


Создадим класс модели.

    class User{
      username: string;
      email: string;
      id: number;
    }

Теперь класс приложения, в котором определим свойство со списком пользователей, использующих модель User.

В свойстве user_list будем хранить html объект списка ul.

    class App{
      //начальные данные
      users: User[] = [{
        'username': 'Dima', 
        'email': 'zdimon77@gmail.com',
        'id': 1
      }];
      user_list: any;
    }

Определим конструктор, в котором заберем элемент ul по id и выполним медод update().


      constructor(){
        this.user_list = $('#user_list');
        this.update();
      }

Опишем метод update() заполнив список пользователями.

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
      }

После заполнения подцепим обработчик на клик по ссылке удаления.



    // подвешиваем событие
    this.user_list.find("a").on('click',(e) => {
      // тут будем удалять пользователя
      this.delete_user(parseInt($(e.target).attr('id')));
      
    })

Осталось определить метод delete_user().

      delete_user(user_id: number){
        for(let user of this.users){
          if (user.id == user_id){
            let idx = this.users.indexOf(user);
            this.users.splice(idx,1);
            this.update();
          } 
        }
      }

И создать объект приложения.

    var app = new App();
    
## Приемущества использования классов.

1. Не нужно следить за контекстом выполнения функций.

2. Не нужно явно инициализировать приложение а использовать конструктор.

3. Упрощено обьявление функций и свойств.

4. Использование класса модели дает контроль типов и потенциальных багов на этапе разработки







   
