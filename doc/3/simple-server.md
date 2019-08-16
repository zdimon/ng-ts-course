# Простой сервер.

## Установка библиотек.

    sudo npm install -g ts-node
    
    npm install --save @types/express express
    
    npm install --save nodemon
    
## tsconfig.json

    {
        "compilerOptions": {
            "module": "commonjs",
            "esModuleInterop": true,
            "target": "es6",
            "noImplicitAny": true,
            "moduleResolution": "node",
            "sourceMap": true,
            "outDir": "dist",
            "baseUrl": ".",
            "paths": {
                "*": [
                    "node_modules/*"
                ]
            }
        },
        "include": [
            "src/**/*"
        ],
        "exclude": [
            "node_modules"
        ]
    }    
 
### src/server.ts

 
    import express from "express";
    const app = express();
    const port = 8083; // порт
     
    // определение обработчика для домашней страницы

    app.get( "/", ( req: any, res: any ) => {
        res.send( "Hello world!" );
    } );

    // запуск сервера
    app.listen( port, () => {
        console.log( `server started at http://localhost:${ port }` );
    } );    
    
## Запуск сервера c отслеживанием изменений

    ./node_modules/nodemon/bin/nodemon.js ./dist/server.js
    
    
Разобьем код сервера на 2 файла app.ts и server.ts.

### server.ts

    import app from "./app";
    const port = 8083; // порт
    // запуск сервера
    app.listen( port, () => {
        console.log( `server started at http://localhost:${ port }` );
    } );    


### app.ts

    import express from "express";

    class App {
        // публичный параметр - приложение для экспорта
        public app: express.Application; 
        constructor() {
            this.app = express();
            this.config();        
        }
        private config(): void{
            // тут будут настройки приложения
            console.log('Настраиваю сервер');
            this.app.get( "/", ( req: any, res: any ) => {
                res.send( "Hello world!" );
            });
        }

        

    }
    export default new App().app;    
    
Вставим правильные типы.
    
    this.app.get( "/", ( req: express.Request, res: express.Response )    
    
Попробуем вернуть json объект.

    res.send( {status: 'ok'} );    
    
Создадим файл базы данных db.json.

    
    {
        "users": [
            {"name": "Dima"},
            {"name": "Denis"}
        ]
    }    
        
Изменим код приложения.


    
    import fs from "fs";

    class App {
        ...
        private config(): void{
            // тут будут настройки приложения
            console.log('Настраиваю сервер');
            this.app.get( "/", ( req: any, res: any ) => {
                // синхронно читаем файл в буфер
                let rawdata = fs.readFileSync('db.json');  
                // парсим данные преобразовав буфер в строку
                let data = JSON.parse(rawdata.toString());
                res.send( data );
     
    ...   
  
### Вставка данных. Обработка POST запроса.

Для того, чтобы отслеживать каждый запрос и выводить отладочную информацию добавим отладочный обработчик.

        // лог запросов
        this.app.use((req: express.Request, res: express.Response, next: any) => {
            console.log(`${req.protocol} :${req.method} reguest`);
            next();
        });
  
Для того, чтобы получать данные из тела POST запроса необходимо добавить специальный обработчик.

    import bodyParser from 'body-parser';  
        
    ...
    
    this.app.use(bodyParser.json());
    
Теперь можно выводить тело запроса в отладочном обработчике.

        // лог запросов
        this.app.use((req: express.Request, res: express.Response, next: any) => {
            console.log(`${req.protocol} :${req.method} reguest to ${req.originalUrl} status ${res.statusCode}`);
            console.log(`Request body`);
            console.log(req.body);
            next();
        });   

Установим библиотеку request.

    npm install --save @types/request request

Создадим тестовый скрипт, отправляющий POST запрос.

### src/test.ts

    import request from 'request';
    var port = 8083
    console.log('Sending POST request')

    request.post(
        `http://localhost:${port}/`,
        { json: { username: 'TestUser' } },
        function (error: any, response: request.Response, body: any) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log(`Error: status code: ${response.statusCode}`);
            }
        }
    );

Запуск.

    node ./dist/test.js  
  
   >>> Error: status code: 404
  
Примем данные на сервере.  
  
    this.app.post( "/", ( req: express.Request, res: express.Response ) => {
        console.log(req.body.username);
        res.send( {status: 'ok'} );
    })  
          
          
Пр поступлении запросов от браузера с домена или порта отличного от сервера мы 
получаем ошибку **No 'Access-Control-Allow-Origin' header is present on the requested resource.** 
          
Необходимо добавить обработчик.          
               
    // включаем кросдоменный доступ
    this.app.use(function(req:any, res:any, next:any) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });       
          
## Домашнее задание.

Заполнить обработку POST запроса и записать нового пользователя в файл базы данных.          
          
          
          
          
          
          
          
          
          
          
            
            
