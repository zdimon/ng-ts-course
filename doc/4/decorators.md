# Декораторы. 

## Декорация свойств.

Допустим у нас есть класс пользователя.


    class User {
     
        name: string;
        constructor(name: string){
            this.name = name;
        }
        print():void{
            console.log(this.name);
        }
    }

    const user = new User('Dima');
    user.print()

У класса помимо конструктора есть метод print().

Шаблон

    <!DOCTYPE html>
    <html>
        <head><title>Decorator</title></head>
        <body>
            <h2> Decorators  </h2>
            <script src="/user.js"></script> 

        </body>
    </html>

Задача заключается в том, чтобы изменить поведение метода динамически, не изменяя код самого метода.

Для этого используется конструкция декоратора.

    @format
    name: string;
    
При этом декорируется свойство класса.

Чтобы лучше понять работу декоратора необходимо упомянуть один встренный метод объекта defineProperty.
    
# Object.defineProperty(obj, prop, descriptor)    

Этот метод позволяет объявить свойство объекта и, что самое главное, тонко настроить его особые аспекты, которые никак иначе не изменить.

prop - имя свойства

descriptor - описатель (дескриптор) свойства. Объект, который описывает поведение свойства.
    
Чтобы избежать конфликта, запрещено одновременно указывать значение value и функции get/set. 
Либо значение, либо функции для его чтения-записи, одно из двух. 
Также запрещено и не имеет смысла указывать writable при наличии get/set-функций.    
       
Два таких вызова работают одинаково:
    
    var user = {};

    // 1. простое присваивание
    user.name = "Вася";

    // 2. указание значения через дескриптор
    Object.defineProperty(user, "name", { value: "Вася", configurable: true, writable: true, enumerable: true });

Для того, чтобы сделать свойство неизменяемым, изменим его флаги writable и configurable:

    Object.defineProperty(user, "name", {
      value: "Вася",
      writable: false, // запретить присвоение "user.name="
      configurable: false // запретить удаление "delete user.name"
    });

Создадим свойство fullName, которое на самом деле является функцией:

    Object.defineProperty(user, "fullName", {
      get: function() {
        return this.firstName + ' ' + this.surname;
      }
    });
    
Обратим внимание, снаружи fullName – это обычное свойство user.fullName. 
Но дескриптор указывает, что на самом деле его значение возвращается функцией.

Также можно указать функцию, которая используется для записи значения, при помощи дескриптора set.


Создадим функцию format, сигнатура которой соответствует декоратору.

    function MyPropertyDecorator(target: Object, propertyKey: string){
        // код декоратора
    }


Где первый параметр представляет конструктор класса, если свойство статическое, 
либо прототип класса, если свойство нестатическое. 

А второй параметр представляет имя свойства.


    function format(target: Object, propertyKey: string){
         
        let _val = this[propertyKey];   // получаем значение свойства
     
        // геттер
        var getter = function () {
            return "Mr./Ms." + _val;
        };
      
        // сеттер
        var setter = function (newVal: string) {
            _val = newVal;
        };
      
        // удаляем свойство
        if (delete this[propertyKey]) {
      
            // И создаем новое свойство с геттером и сеттером
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter
            });
        }
    }


Пример класса User с задекорированным свойством name.

    class User {
        @format
        name: string;
        constructor(name: string){
            this.name = name;
        }
        print():void{
            console.log(this.name);
        }
    }

При вызове метода print() обьекта получаем:

    const user = new User('Dima');
    user.print()

    >>> Mr./Ms.Dima


При возникновении такого предупреждения

    user.ts:30:5 - error TS1219: Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.

Пропишем в tsconfig.json следующие настройки. 

        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        


