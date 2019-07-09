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
            next();
        });

        // Роутинг корневой страницы
        this.app.get('/', ( request: express.Request, response: express.Response) => {
            fs.readFile('DB.json','utf8',(err,res)=>{             
                let data = JSON.parse(res);
                response.send(data);
            });
        })

        this.app.post('/', ( request: express.Request, response: express.Response) => {
            //console.log(request.body);
            this.saveUser(request.body);
            response.send({status: 'ok'});
        })


    }

    saveDB(data: any){
        fs.writeFileSync('DB.json',JSON.stringify(data));
    }

    saveUser(user: any){
        fs.readFile('DB.json','utf8',(err,res)=>{             
            let data = JSON.parse(res);
            //console.log(res);
            for (let u of data){
               if(u.id==user.id){
                console.log(u);
                let idx = data.indexOf(u);
                
                data.splice(idx,1);
                data.push(user);
               }
               
            }
            this.saveDB(data);
        });        
    }

}

export default new App().app
