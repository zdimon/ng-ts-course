import express from "express";
import * as News from "./news"


const app = express();
const port = 3000;

app.use(function (req:any,res:any,next:any) {
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers",'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})

//Определяем методы CRUD
app.get("/news/", News.AllNews);
app.get("/news/:id", News.OneNews);
app.delete("/news/:id", News.DeleteNews);
app.post("/news/", News.CreateNews);
app.put("/news/:id", News.UpdateNews);

//Запускаем сервер
const server = app.listen(port,()=>{
    console.log(`App is runnin at port: ${port}`);
});