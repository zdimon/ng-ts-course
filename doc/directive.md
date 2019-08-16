# Директивы

Директива - это обычный класс на TS, к которому применяется декоратор Directive, соответственно нам надо импортировать эту директиву из "angular/core". 

Кроме того, здесь импортируется класс "ElementRef". Он представляет ссылку на элемент, к которому будет применяться директива.

Директивы должны включаться в секцию declarations модуля на равне с компонентами.

    import {Directive, ElementRef} from '@angular/core';
     
    @Directive({
        selector: '[bold]'
    })
    export class BoldDirective{
         
        constructor(private elementRef: ElementRef){
             
            this.elementRef.nativeElement.style.fontWeight = "bold";
        }

Примеры селекторов.

**element-name** - <element-name></element-name>.

**.classname** - <p class="classname"></p>.

**[attribute]** -  <p attribute></p>.

**[attribute=value]** - <p attribute=value></p>.

**:not(sub_selector)** - Выбирает все кто не совпадает с sub_selector.

**selector1, selector2** - Выбирает всех по принципу ИЛИ.

## Простая директива.

    import { Component } from '@angular/core';

    import { Directive, Renderer2, ElementRef, Input} from '@angular/core';

    @Component({
      selector: 'app-root',
      template: `<div mydirective>Hello</div>`,
      styles: []
    })
    export class AppComponent {

    }


    @Directive({
      selector: '[mydirective]'
    })
    export class MyDirective {
      constructor() {
        elementRef.nativeElement.style.backgroundColor = 'yellow';
      }
      
      
Тут мы просто изменяем фон.

Передадим параметр директиве.

    @Component({
      selector: 'app-root',
      template: `
         <input [(ngModel)]="filter" type="text" name="filter"  />
         <div mydirective [content]="filter"></div>
      `,
      styles: []
    })
    export class AppComponent {
      filter: string = 'Some text';

    }


Перехватим этот параметр внутри класса директивы и отреагируем на изменение.

    @Input() content: any;
    

    protected ngOnChanges() {
         console.log('inputTextFilter', this.inputTextFilter);
    }
    
Это можно сделать и через сетер.

  @Input() set content(value: string) {
    ...
  }     
  
Можно использовать псевдонимы при Input-е

    <div mydirective [aliasContent]="filter">This is directive</div>
    
    
    @Input('aliasContent') content: string;
  
   
      
Добавление новых dom элементов через ссылку elementRef и рендер.

      constructor(
         private renderer: Renderer2,
         private elementRef: ElementRef
     ) {}

    let buttonElement = this.renderer.createElement('button');
    const text = this.renderer.createText(value);
    this.renderer.appendChild(buttonElement, text);
    this.renderer.appendChild(this.elementRef.nativeElement, buttonElement);
      

### Реакция на действия.

Реализуется с помощью HostListener.


    import {HostListener} from '@angular/core';


    
      @HostListener('mouseenter') onMouseEnter() {
        this.alert();
      }

      alert(){
        alert(this.content);
      }  
      
Не стоит привязываться к событиям нативными методами js!     


Пример изменения фона директивы по радиобоксам.

    <input type="radio" name="colors" (click)="color='lightgreen'">Green
    <input type="radio" name="colors" (click)="color='yellow'">Yellow
    <input type="radio" name="colors" (click)="color='cyan'">Cyan
    <div mydirective [aliasContent]="color">This is directive</div> 
    
    export class AppComponent {
      color: string = 'red';
    }  
  ....
     
    @Directive({
      selector: '[mydirective]'
    })
    export class MyDirective {
    
      ...
          
      constructor(
         private renderer: Renderer2,
         private elementRef: ElementRef
      ) {}  
      
      ...    
      
      @HostListener('mouseenter') onMouseEnter() {
        this.elementRef.nativeElement.style.backgroundColor = this.content;
      }
      
      
      
Задание: Написать директиву, выводящую переданный текст по диоганали.   


## Получение дочерних компонентов изнутри родительского.

Задача вызвать метод дочернего компонента из родительского.

Например в таком шаблоне.

     <button (click)="doInChild()">Do in child</button>
     <panel [isAdmin]="is_admin"></panel>
  
Я хочу вызвать метод компонента panel по клику на кнопке.

Вначале импортируем 

    import { ViewChild, AfterViewInit } from '@angular/core'; 

ViewChild - Query-селектор которому скормим компонент.

AfterViewInit - Привязка к событию завершения генерации DOM.

Импортируем сам дочерний компонент.

    import { PanelComponent } from './panel.component';
    
Выберем его декоратором.    
    
    export class AppComponent implements AfterViewInit {
     
      @ViewChild(PanelComponent) childComponent: PanelComponent;   
      
Теперь можно вызывать его методы после инициализации и по кнопке.

      ngAfterViewInit(){
        this.childComponent.someMethod();
      }

      doInChild(){
        this.childComponent.someMethod();
      } 

Задача: попробовать вызвать метод в дочернем компоненте дочернего компонента.

ViewChild может оперировать только дочерними компонентами первого уровня.

При выборе HTML элемента вместо компонента мы используем якорь в шаблоне.

    <h2 #title>Choose Brand Colors:</h2>
    
И по нему достаем элемент указывая ElementRef его типом.

ElementRef  - это Ангуляровский врапер нативного HTML элемента.


  @ViewChild('title') title: ElementRef;
  
Затем можем его менять.

  ngAfterViewInit(){
    this.title.nativeElement.style.backgroundColor = 'red';
  }

Или добавлять к нему обработчики.

    this.title.nativeElement.addEventListener('click', () => {
      alert('Go');
    })
    
Альтернативный поиск элемента.    

    <a id="click_me">Click me</a>

    this.elementRef.nativeElement.querySelector('#click_me').addEventListener('click', this.onClick);

Привязка события и изменение элемента с помощью Render.

    constructor(private renderer: Renderer2) {}

    this.renderer.listen(this.title.nativeElement, 'click', () => {
       this.renderer.setStyle(this.title.nativeElement, 'color', 'green');
    });


Привязка события к компоненту при помощи декоратора HostListener.

@Component({
  selector: 'your-element'
})

export class YourElement {
  @HostListener('click', ['$event']) onClick(event) {
     console.log('component is clicked');
     console.log(event);
  }
}


    
    
Ссылки 

https://juristr.com/blog/2018/02/angular-permission-directive/












 
      
  
