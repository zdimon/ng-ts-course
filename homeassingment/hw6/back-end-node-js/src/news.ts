import { Response, Request}  from "express";
import mongoose from "mongoose";


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

//Создаём интерфейс для модели
interface INews extends mongoose.Document{
    title: String;
    content: String;
    author: String;
}

//Создаём схему
export const NewsShema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true}
});

//Создаём экземляр класса
const News = mongoose.model<INews>('News', NewsShema);

//Метод все новости
export let AllNews = (req: Request, res: Response)=> {
    News.find((err, data:any)=>{
        if (err){
            res.send('Error!')
        }else {
            res.send(data)
        }
    })
};

//Метод для одной новости
export let OneNews = (req: Request, res: Response)=> {
    News.findById({_id:req.params.id}, (err:any, data:any)=>{
        if (err){
            res.send('Not found!')
        }else {
            res.send(data)
        }
    })
};

//Метод обновления новости
export let UpdateNews = (req: Request, res: Response)=> {
    News.findByIdAndUpdate({_id:req.params.id}, (err:any, data:any)=>{
        if (err){
            res.send('Not found!')
        }else {
            res.send(data)
        }
    })
};

//Метод удаления новости
export let DeleteNews = (req: Request, res: Response)=> {
    News.findByIdAndDelete({_id:req.params.id}, (err:any, data:any)=>{
        if (err){
            res.send('Not found!')
        }else {
            res.send(data)
        }
    })
};

//Метод создания новости
export let CreateNews = (req: Request, res: Response)=> {
    let news = new News(req.body);
    news.save((err:any)=>{
        if (err){
            res.send('Error!')
        }else{
            res.send(news)
        }
    })
};
