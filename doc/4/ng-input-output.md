# Ангуляр декораторы @Input @Output.

Создадим новый проект

    ng new ng-prj
    
И в нем новый компонент

    ng g c myform
    
Подключим этот компонент в шаблоне app.component.html

    {{ title }}
    <app-myform></app-myform>

Определим новое свойство color в главном компоненте.

    export class AppComponent {
      title = 'ng-prj';
      color = 'red';
    }

Обьявим в компоненте формы это свойство с декораторм Input.


    import { Component, OnInit, Input } from '@angular/core';

    @Component({
      selector: 'app-myform',
      templateUrl: './myform.component.html',
      styleUrls: ['./myform.component.css']
    })
    export class MyformComponent implements OnInit {
      @Input() color: string;
      constructor() { }

      ngOnInit() {
      }

    }

Теперь можно передать это свойство в шаблоне из родительского компонента в дочерний.


    <app-myform [color]="color"></app-myform>


И вывести в шаблоне дочернего компонента.

    <p>
      myform works!

      color is {{ color  }}
    </p>

## Декоратор @Output

Еще одной формой взаимодействия между компонентами является представляет привязка к событиям дочернего компонента. 


Добавим кнопку, генерирующую событие.

    <p>
      myform works!

      color is {{ color  }}
      <button (click)="change('blue')">Изменить цвет</button>
    </p>
    
Импортируем элементы EventEmitter  и Output.        
    
    import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';    
    
Добавим новое свойство, задекорированное @Output-ом, которое представляет собой объект класса EventEmitter.    
    
    @Output() onChanged = new EventEmitter<string>();

Если мы должны передавать его родительскому компоненту, то для этого нам надо использовать свойство типа EventEmitter, коим здесь является свойство onChanged.    
 
Фактически свойство onChanged будет представлять собой событие, которое вызывается в методе change() по клику на кнопку и передается главному компоненту.

Функция клика.

      change(increased:any) {
        this.color = 'blue';
        this.onChanged.emit(this.color);
      }

Теперь в шаблоне родителя привяжем метод onChanged к этому событию.

    <app-myform [color]="color" (onChanged)="onChanged($event)"></app-myform>
    
И опишем метод onChanged родительского компонента.

      onChanged(event){
        console.log(event);
      }
    
    
    


