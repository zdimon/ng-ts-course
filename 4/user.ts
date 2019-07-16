
function format(target: Object, propertyKey: string){
    let _val = this[propertyKey]; 
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

const user = new User('Dima');
user.print()
