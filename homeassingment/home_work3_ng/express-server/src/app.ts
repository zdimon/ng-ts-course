import express  from "express";
import * as fs from "fs";
import bodyParser from 'body-parser';

export class App {

    public app: express.Application;
    constructor(){
        this.app = express();
        this.config();
    }

    private config(): void{
        // settings
        console.log('Prepare server');
        this.app.use(bodyParser.json());
        this.app.use(function(request: express.Request, response:express.Response, next:any){
            response.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
            response.header("Access-Control-Allow-Origin", "*");

            // Добавляем методы для обхода CORS
            response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
            next();
        });


        // Прослушка пути для отдачи пользователей
        this.app.get('/', ( request: express.Request, response: express.Response) => {
            fs.readFile('DB.json','utf8',(err,res)=>{             
                let data = JSON.parse(res);
                response.send(data);
            });
        })

        this.app.put('/', ( request: express.Request, response: express.Response) => {
            this.addUser(request.body);
            fs.readFile('DB.json','utf8',(err,res)=>{
                let data = JSON.parse(res);
                response.send(data);
            });
        })

        // Прослушка пути для сохранения
        this.app.post('/', ( request: express.Request, response: express.Response) => {
            this.saveUser(request.body);
            response.send({status: 'ok'});
        })

        // Прослушка пути для удаления
        this.app.post('/delete', ( request: express.Request, response: express.Response) => {
            this.deleteUser(request.body);
            response.send({status: 'ok'});
        })


    }

    static saveDB(data: any){
        fs.writeFileSync('DB.json',JSON.stringify(data));
    }

    // Метод сохранения в БД
    saveUser(user: any){
        fs.readFile('DB.json','utf8',(err,res)=>{             
            let data = JSON.parse(res);
            for (let u of data){
               if(u.id==user.id){
                console.log(u);
                let idx = data.indexOf(u);
                data.splice(idx,1);
                data.push(user);
               }
            }
            App.saveDB(data);
        });        
    }

    // Метод добавления в БД
    addUser(user: any){
        fs.readFile('DB.json','utf8',(err,res)=>{
            let data = JSON.parse(res);
            data.push(user);
            App.saveDB(data);
        });
    }

    // Метод удаления из ДБ
    deleteUser(user: any){
        fs.readFile('DB.json','utf8',(err,res)=>{
            let data = JSON.parse(res);
            for (let u of data){
                if(u.id==user.id){
                    console.log(u);
                    let idx = data.indexOf(u);
                    data.splice(idx,1);
                }
            }
            App.saveDB(data);
        });
    }
}

export default new App().app
