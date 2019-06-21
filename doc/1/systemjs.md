## Загрузчик модулей SystemJS.

Установка 


Это универсальный динамический загрузчик модулей по принципам CommonJs или AMD.
Он работает на стороне клиента и может динамически загружать модули из файлов по требованию.

Установка.

    npm install systemjs@0.19.22 --save
    
Для транспиляции на лету установим typescript.

    npm install typescript --save
    
Подключение на странице. Транспиляция на лету.

    <!DOCTYPE html>
    <html>
        <head><title>TypeScript Learning</title></head>
        <body>
            <script src="/node_modules/systemjs/dist/system.js"></script>
            <script src="/node_modules/typescript/lib/typescript.js"></script>
            <script>
                System.config({
                  transpiler: 'typescript'
                });
                System
                  .import('src/app.ts')
                  .then(null, console.error.bind(console));
            </script>
        </body>
    </html>
    
При обычной компиляции.

    SystemJS.config({
        defaultJSExtensions: true
    });
    SystemJS.import('built/main.js');
    
Настройки компилятора tsconfig.json. 

    
    {
        "compilerOptions": {
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "module": "commonjs",
            "target": "ES5",
            "outDir": "built",
            "rootDir": "src"
        }
    }    
    
Проверка.

    // main.ts
    import { sayhello } from './mylib';
    var myname = 'Dima';
    console.log(sayhello(myname));    
    
    
    // mylib.ts
    export function sayhello(name: string){
        return(`Hello  ${name}`);
    }   
    
    

