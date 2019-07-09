import express  from "express";
import * as fs from "fs";

export class App {

    public app: express.Application;
    constructor(){
        this.app = express();
        this.config();
    }

    private config(): void{
        // settings
        console.log('Prepare server');

        this.app.use(function(request: express.Request, response:express.Response, next:any){
            response.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
            response.header("Access-Control-Allow-Origin", "*");
            next();
        });

        // Роутинг корневой страницы
        this.app.get('/', ( request: express.Request, response: express.Response) => {
            let rawdata:Buffer = fs.readFileSync('DB.json');
            let data:Buffer = JSON.parse(rawdata.toString());
            response.send(data);
        })
    }
}

export default new App().app
