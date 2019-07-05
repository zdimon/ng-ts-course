import express from "express";
import fs from "fs";
import bodyParser from 'body-parser';

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

        this.app.use(bodyParser.json());
        
        // лог запросов
        this.app.use((req: express.Request, res: express.Response, next: any) => {
            console.log(`${req.protocol} :${req.method} reguest`);
            next();
        });

        // включаем кросдоменный доступ
        this.app.use(function(req:any, res:any, next:any) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        }); 



        this.app.get( "/", ( req: express.Request, res: express.Response ) => {
            let rawdata = fs.readFileSync('db.json');
            let data = JSON.parse(rawdata.toString());
            res.send( data );            

        });

        this.app.post( "/", ( req: express.Request, res: express.Response ) => {
            console.log(req.body);
            res.send( {status: 'ok'} );            

        });        

    }

    

}
export default new App().app;   