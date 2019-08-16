# MongoDB.

Документоориентированная система управления базами данных (СУБД) с открытым исходным кодом, не требующая описания схемы таблиц. 

Классифицирована как NoSQL, использует JSON-подобные документы и схему базы данных.

Система поддерживает запросы, которые могут возвращать конкретные поля документов и пользовательские JavaScript-функции. 

Поддерживается поиск по регулярным выражениям.

Система может быть использована в качестве файлового хранилища с балансировкой нагрузки и репликацией данных.


Поддерживается JavaScript в запросах, функциях агрегации.

MongoDB поддерживает коллекции с фиксированным размером. 

В  2018 году добавлена поддержка транзакций.

В качестве графической оболочки поставляется «MongoDB Compass».

База данных MongoDB подходит для следующих применений:

Хранение и регистрация событий;
Системы управления документами и контентом;
Электронная коммерция;
Игры;
Данные мониторинга, датчиков;
Мобильные приложения;
Хранилище операционных данных веб-страниц (например, хранение комментариев, рейтингов, профилей пользователей, сеансы пользователей).


## Установка

[качаем дистр](https://www.mongodb.com/download-center/community)

## Настройки

    sudo nano /etc/mongod.conf
    
## Коннект

    MongoDB not running on the provided host and port
    
    
    mongod
    
    2019-07-23T10:44:39.043+0300 I STORAGE  [initandlisten] exception in initAndListen: NonExistentPath: Data directory /data/db not found., terminating

Пробую установить через apt

    sudo apt install -y mongodb
    
        
    *********************************************************************
     ERROR: dbpath (/data/db) does not exist.
     Create this directory or give existing directory in --dbpath.
     See http://dochub.mongodb.org/core/startingandstoppingmongo
    *********************************************************************
        
    
    sudo mkdir -p /data/db
    
    sudo chown -R username:username /data/db
    
    mongod &
    
## Работа с базой 

    npm init
    npm install --save mongoose @types/mongoose    
    
    
    import mongoose from "mongoose";

    const uri: string = "mongodb://127.0.0.1:27017/local";

    mongoose.connect(uri, (err: any) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Succesfully Connected!");
        }
      });    
      
Вставка данных.


    var db = mongoose.connection;
    console.log('getting the connection');
    db.collection('mycollection').insertOne({"name": "Petya"});
    
## Использование схемы и модели.

    // Определяем схему
    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        name: String,
        age: Number
    });

    // Компилируем модель из схемы
    var UserModel = mongoose.model('UserModel', UserSchema );
    UserModel.create({name: 'Dima', age: 43});    
    
Чтобы создать запись, следует определить экземпляр модели и вызвать метод save().  

Но для соблюдения совместимости типов необходимо создать интерфейс, унаследовав от mongoose.Document. 


    interface BaseUserModel extends mongoose.Document {
        name: string;
        age: Number;
    }
    
Затем обозначить этот интерфейс при создании модели.    
    
    var UserModel = mongoose.model<BaseUserModel>('UserModel', UserSchema );
    
И далее можно создавать объект и сохранять его в базе.

    const user = new UserModel({name: 'Dimon', age: 32});
    user.save()
    
Вставка сразу нескольких записей.

    var arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
    Movies.insertMany(arr, function(error, docs) {});

    
Извлечение.

    UserModel.find({},(err,rec) => {
        console.log(rec);
    })

    const userFromDb = await UserModel.findOne({ name: 'Foo' });
    Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);

Редактирование.

Удаление.

      let book = Book.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Succesfully Deleted Book");
        }
      });    

Редактирование.    
    
      let book = Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, book: any) => {
          if (err) {
            res.send(err);
          } else {
            res.send("Succesfully updated book!");
          }
        }
      );    
      
    Tank.updateOne({ size: 'large' }, { name: 'T-90' }, function(err, res) {
      // Updated at most one doc, `res.modifiedCount` contains the number
      // of docs that MongoDB updated
    });
    
    
Отслеживание изменений.

      Person.watch().
    on('change', data => console.log(new Date(), data)); 
    
    
[ссылка на API модели](https://mongoosejs.com/docs/api/model.html)    
       
    
## Построение сервера REST API для для работы с БД     
    
Запросы.

- GET - /news # все новости
- GET - /news/{1} # новость с номером 1
- POST - /news # вставить новую новость
- DELETE - /news/{1} # удалить новость с ид 1
- PUT - /news/{1} # изменить новость с ид 1    
    
    
Структура проекта.

- src/
- - app.ts
- - news.ts
- tsconfig.json
- package.json
- node_modules/
- dist/ # откомпилированные файлы

  
    
## tsconfig.json

    {
        "compilerOptions": {
            "module": "commonjs",
            "esModuleInterop": true,
            "target": "es6",
            "noImplicitAny": true,
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
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
        
        
Установка express.

    npm install --save express @types/express        
    
Простейший сервер.

           
    import express from "express";

    // конфигурируем
    const app = express();
    app.set("port", process.env.PORT || 3000);

    // Точки входа
    app.get("/", (req: any, res: any) => res.send("hi"));

    // Цикл событий
    const server = app.listen(app.get("port"), () => {
      console.log("App is running on http://localhost:%d", app.get("port"));
    });       
        

Установка nodemon.

    npm install --save nodemon    
    
    
Старт сервера.

    ./node_modules/nodemon/bin/nodemon.js dist/app.js    
    
    
Определим набор функций, используемых в роутинге (файл news.ts).

        
    import { Request, Response } from "express";

    export let allNews = (req: Request, res: Response) => {
      res.send("Returns all News");
    };

    export let getNews = (req: Request, res: Response) => {
      res.send("Returns one news");
    };

    export let deleteNews = (req: Request, res: Response) => {
      res.send("Delete one news");
    };

    export let updateNews = (req: Request, res: Response) => {
      res.send("Update one news");
    };

    export let addNews = (req: Request, res: Response) => {
      res.send("Add one News");
    };    
 
Размапим эти функции по урлам роутинга в файле app.ts. 
 
    import * as news from './news'
    ...
    app.get('/news', news.allNews);
    app.get("/news/:id", news.getNews);
    app.post("/news/", news.addNews);
    app.put("/news/:id", news.updateNews);
    app.delete("/news/:id", news.deleteNews);  
            
Установим mongoose.

   npm install --save mongoose @types/mongoose
   
   
Соединимся с базой (файл news.ts).

    import mongoose from "mongoose";

    const uri: string = "mongodb://127.0.0.1:27017/local";

    mongoose.connect(uri, (err: any) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Succesfully Connected!");
      }
    });   
    
Экспортируем интерфейс, унаследовав его от mongoose.Document.

    export interface INews extends mongoose.Document {
        title: string;
        content: string;
        author: string;
    }    
    
Определим схему данных с валидацией.        

    export const NewsSchema = new mongoose.Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true }
    });

Создадим объект модели и экспортируем его.

    const News = mongoose.model<INews>("News",NewsSchema);
    export default News;

Создадим скрипт загрузки начальных данных load_data.ts.

    import News from './news';
    const data = [
        {
            title: 'Title 1', 
            content: 'Content content content', 
            author: 'Grigory'
        },
        {
            title: 'Title 2', 
            content: 'Content content content', 
            author: 'Grigory'
        },
        {
            title: 'Title 3', 
            content: 'Content content content', 
            author: 'Grigory'
        },
    ]
    News.insertMany(data,(err,docs) => {
        console.log(docs);
    })

Загрузим данные.

    node dist/load_data.js
    
Получение всех новостей.

    export let allNews = (req: Request, res: Response) => {
      let news = News.find((err: any, news: any) => {
        if(err) {
            res.send('Error!!!');
        } else {
            res.send(news);
        }
      })

    };
    
Получение одной новости.    
    
    export let getNews = (req: Request, res: Response) => {
      //res.send("Returns one news");
      let news = News.findById(req.params.id, (err: any, news: any) => {
          if(err) {
              res.send('Error');
          } else {
              res.send(news);
          }
      })
    };
    
Удаление новости.

    export let deleteNews = (req: Request, res: Response) => {
      let news = News.deleteOne({ _id: req.params.id },(err: any)=>{
            if(err){
                res.send('Error');
            } else {
                res.send('Deleted');
            }
      });
    };
    
Добавление новости.

    var news = new News(req.body);
    news.save((err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(news);
      }
    });
   
Разрешение запросов с другого домена и порта.

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });   
       
        
Ссылки.

https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/    
https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs/mongoose
https://habr.com/ru/post/322532/

    
