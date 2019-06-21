# Использование jquery.

Установка jquery.

    npm install jquery --save

Установка типов.

    npm install --save-dev @types/jquery
    
Эта команда создаст папку с описанием типов в node_modules/@types/jquery.

Теперь можно получить глобальный объект jquery из любого ts файла.

    import * as $ from "jquery";

Если используется загрузчик SystemJS то нужно добавить путь к библиотеке.

    SystemJS.config({
        defaultJSExtensions: true,
        paths: {
            'jquery' :'./node_modules/jquery/dist/jquery.min.js',
            },
    });
    SystemJS.import('built/main.js');
    
Пример.

    <html>
        <head>
        </head>
        <body>
            <script
            src="./node_modules/systemjs/dist/system.js">
            </script>
            <script src="./SystemConfig.js"></script>
            <input id="myInput" />
            <button id="myButton">Say hello</button>
        </body>
    </html>
    
    
    import * as $ from "jquery";
    export function sayhello(name: string){
        let button = $('#myButton');
        let input = $('#myInput');
        button.on('click',() => {
            alert(`hello ${input.val()}`)
        })
    }
        
