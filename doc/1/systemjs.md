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
                    transpiler: 'typescript',
                    packages: {
                    src: {
                          defaultExtension: 'ts'
                        }
                    }
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
    
    
Первое что делает SystemJS - это нормализирует путь к файлу, который вы пытаетесь импортировать.

Это может быть абсолютный, относительный либо псевдонимный путь.

Есть ряд параметров настроек, которыми можно повлиять на этот процесс нормализации.
    
Далее SystemJS проверяет свой внутренний реестр на наличие в нем этого загруженного модуля и возвращает его если находит, 
если нет то генерирует запрос на сервер, пытаясь его загрузить через URL.

Далее содержимое загруженного модуля передается системе трансляции, которая может дополнительно модифицировать модуль при необходимости.   
 
И наконец транслированный модуль передается функции инициализации, которая исполняет модуль, добавляет его в реестр и вызывает промис, в который передает модуль.   
    

        System
          .import('src/main.ts')
          .then(function(m){
              console.log(m);
              // можем что то сделать с модулем m
          }, console.error.bind(console));
                  
Строка console.error.bind(console) служит для того чтобы вернуть контекст window.console в промис т.к. за счет асинхронности    
он будет потерян и установлен в windows.
Ведь метод console.error() требует чтобы переменная this была установлена в window.console.
    
    
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
    
    

