q## Установка транспилятора

    sudo npm install -g typescript

    
## Установка и обновление nodejs и npm.

    npm install npm@latest -g
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable

Проверка версии.

    node -v    
    
## Первая программа app.ts.

    function greeter(person) {
        return "Hello, " + person;
    }

    let user = "Jane User";

    document.body.innerHTML = greeter(user);


Компиляция.

    tsc app.ts

Стартовая страница

    <!DOCTYPE html>
    <html>
        <head><title>TypeScript Greeter</title></head>
        <body>
            <script src="app.js"></script>
        </body>
    </html>

Инициализация npm проекта.

    npm init

Добавление веб сервера.

    npm install lite-server --save
    
*Иногда возникает ошибка permission denied, mkdir '/home/user/.npm для устранения удалите папку .npm*

## Запуск веб сервера.

    ./node_modules/.bin/lite-server
    
## Создание конфигурационного файла tsconfig.json

В этом файле определяются:

- входная (корневая) директория проекта;

- выходная директория;

- опции компилятора;

- определяются какие файлы включать и выключать из компиляции.

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

**если вы указываете файл для компиляции явно то конфигурационный файл игнорируется!**

Перенесем app.ts файл в папку src.

### Запуск транспилятора в режиме отслеживания изменений (watch).

    tsc -w
    
## Исключение и включение каталогов из процесса слежения (tsconfig.json).    

    {
    "compilerOptions": {
        ....
    },
    "include": [
        "**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]}
        
При этом приняты следующие условные обозначения.

* - любое кол-во символов, исключая разделитель каталогов

? - один любой символ, исключая разделитель каталогов

**/ - все подкаталоги       
        

## Определение типа передаваемого значения.

    function greeter(person: string) {
    
## Попытка передать неверный тип.

    let user = [0, 1, 2];
    document.body.innerHTML = greeter(user);
    
    src/app.ts:7:35 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
  
## Определение типа возвращаемого значения.

    function greeter(person: string): number {
        return "Hello, " + person;
    }   
    src/app.ts:8:1 - error TS2322: Type 'number' is not assignable to type 'string'.
 
## Модульность

Определим библиотечную функцию src/lib.ts.

    export function sayHello( name ) {
        return `Hello {$name}`;
    };    
    
Импортируем ее в главном модуле app.js.

    import { sayHello } from "./lib";

Получаем ошибку в консоле.    
    
    app.js:2 Uncaught ReferenceError: exports is not defined
    
Это значит что js не знает конструкцию exports и для этого необходимо использовать загрузчик модулей, например SystemJS.


    
    
    




