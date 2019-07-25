import mongoose from "mongoose";

//Покдлючаемся к БД
const url: string = "mongodb://127.0.0.1:27017/local";

//Что бы избежать предупреждения ' DeprecationWarning: current URL string parser is deprecated' нужно добавить аргумент
// ' { useNewUrlParser: true } ' в опции к коннекту.
mongoose.connect(url, { useNewUrlParser: true },(err:any)=>{
    if (err) {
        console.log(err.message);
    }else {
        console.log(`Node connected to ${url}`);
    }
});

//Работаем в ORM для MongoDB
//let db = mongoose.connection;
//db.collection('new').insertOne({title:'Test',content:'Some content',author:'Admin'});

//Создаём схему модели
let Shema = mongoose.Schema;

//Определяем типы данных
let NewsShema = new Shema({
    title: String,
    content: String,
    author: String
});

//Создаём интерфейс для модели
interface BaseNewModel extends mongoose.Document{
    title: String,
    content: String,
    author: String
}


let NewsModel = mongoose.model<BaseNewModel>('NewsModel', NewsShema);

let news_list = [
    {title:'News 1', content:'Content 1',author: 'Admin'},
    {title:'News 2', content:'Content 2',author: 'Admin'},
    {title:'News 3', content:'Content 3',author: 'Admin'},
    {title:'News 4', content:'Content 4',author: 'Admin'}
    ]

NewsModel.insertMany(news_list,(err,docs)=>{
    if (err) {
        console.log(err)
    }else {
        console.log(docs)
    }
});
