# ViewChild

ViewChild - это декоратор который возвращает первый элемент соответствующий переданому

- компоненту
- директиве
- шаблонной ссылке-селектору (#ref)

Если хотите получить несколько элементов, необходимо использовать ViewChildren вместо ViewChild.

Это самый широко-используемый декоратор.


Хорошая особенность это то, что если ссылка на элемент изменяется динамически на новый элемент, то ViewChild 
это учтет.

Так как ангуляр разработан как решение, которое может работать на различных платформах — в браузере, на мобильном устройстве и на сервере, — то прямая работа с DOM в нем не очень приветствуется, хотя и возможна. Например, следующий пример будет хорошо работать в браузере, но может перестать работать, если вы используете Web Worker или ваш код работает на мобильном устройстве.


    import { Component, AfterComponentInit, ViewChild } from '@angular/core';

    @Component({
       selector: 'some-component',
       template: '<input type="text" #input>'
    })
    export class SomeComponent implements AfterContentInit {
       @ViewChild('input') input;

       ngAfterContentInit() {
          this.input.nativeElement.focus();
       } 
    }
    
Вместо прямой работы с DOM-элементом Angular предоставляет нам следующие абстракции — Renderer, TemplateRef, ElementRef и ViewContainerRef.

## Render

**createElement(name: string, namespace?: string): any**

Позволяет создать элемент DOM и опционально указать для него пространство имен. 

Пространство имен используется, например, для вставки SVG-элементов. 

Элемент после создания не будет отображаться в DOM пока мы его туда не добавим. 


    let inputElement = this.renderer.createElement('input');
    
Добавление и удаление элементов.    
    
**appendChild(parent: any, newChild: any): void** 
**insertBefore(parent: any, newChild: any, refChild: any): void**
**removeChild(parent: any, oldChild: any): void**


    let inputElement = this.renderer.createElement('input');
    this.renderer.appendChild(parent, inputElement);


**setAttribute(el: any, name: string, value: string, namespace?: string): void**
**removeAttribute(el: any, name: string, namespace?: string): void**
**setProperty(el: any, name: string, value: any): void**


Используются для изменения атрибутов или параметров DOM-элемента, например, для установки значения checkbox.

## Отличие атрибутов от свойств.

Атрибуты задаются внутри тега и не изменяются.

Свойства образуются при создании визуальных элементов браузером, имеют то же название что и атрибут, но изменяются в процессе работы с ним пользователем.

Например.

    <input type=”text” value=”5">

После прорисовки, атрибут value будет 5 и свойство тоже, но если пользователь поменяет значение то свойство изменится но атрибут останется прежним.

    getAttribute('value') - даст 5
    
    getElementByTagName('input').value - даст 10




Интерполяция.

Мы можем присвоить свойству значение переменной интерполяцией.

    <img src=”{{imagePath}}”>
    
Связывание свойств.

Если мы хотим присвоить свойству не строковую переменную то нужно воспользоваться связыванием.

    <button [disabled]=’isDisabled’>Click</button>

Связывание аттрибутов.

Обычно в ангуляре пользуются связыванием свойств но иногда у атрибута нет соответствующего свойства (например coolspan).

И такой код вызовет ошибку:

    <th colspan=’{{colSpan}}’>
    
Такой не вызовет:

    <th [attr.colspan]=’colSpan’>    



    this.renderer.setAttribute(inputElement, 'value', 'Hello from renderer');
    this.renderer.setProperty(inputElement, 'checked', true);

**createText(value: string): any**

Создает текстовый DOM-элемент, который можно добавит как дочерний в нужный элемент.

    let buttonElement = this.renderer.createElement('button');
    const text = this.renderer.createText('Text');
    this.renderer.appendChild(buttonElement, text);
    
**addClass(el: any, name: string): void**
**removeClass(el: any, name: string): void**

Устанавливает или удаляет класс для DOM-элемента.

    this.renderer.addClass(buttonElement, 'btn-large');

Поиск элементов в компоненте.

    @ViewChild('[query params]', { read: [referenceType], descendants: boolean });

По селектору возвратит объект-абстракцию ElementRef которая содержит в себе ссылку на «нативный» DOM-элемент в свойстве nativeElement.

**query params** – элемент который ищем. Может быть, как имя шаблона, html элемент или компонент/директива.

**descendants** – определяет искать элемент только среди прямых потомков или смотреть глубже.

**read** — указание типа возвращаемого элемента. 
Обычно указание данного параметра не является необходимым, так как ангуляр довольно сообразителен и, если вы ищете шаблон, он вернет вам TemplateRef, 
если вы ищете html элемент, ангуляр вернет вам ElementRef.

Еще @ViewChild() называют Query-декораторами.

Пример поска и вставки кнопки.


    @Component({
       selector: 'some-component',
       template: '<div #elem>Element text</div>'
    })
    export class SomeComponent implements AfterViewInit {

       @ViewChild('elem') _elem: ElementRef;

       constructor(private _renderer: Renderer2) {}

       ngAfterViewInit() {
          const buttonElement = this._renderer.createElement('button');
          const text = this._renderer.createText('Text');

          this._renderer.appendChild(buttonElement, text);
          this._renderer.appendChild(this._elem.nativeElement, buttonElement);
       }
    }


## Шаблоны в Ангуляр.

При использовании template тега из HTML5 браузер создаст DOM-дерево для содержимого тега, но не будет вставлять его в DOM. 

Вот пример использования тега template в классическом, «нативном» JS:

    <template id="some_template">
       <div>Template contrent text</div>
    </template> 
    
    <div id="container"></div>        <script>
           let tpl = document.querySelector('#some_template'); 
           let container = document.querySelector('#container'); 
           insertAfter(container, tpl.content); 
   </script>    
    
В ангуляре для подобного используется тэг ng-template. 

    <ng-template #tpl1><span>Some template content 1</span></ng-template>    
    
Пример использования шаблона для вывода панели администратора в зависибости от логической переменной.

    import { Component } from '@angular/core';
    import { TemplateRef, ViewChild, ViewContainerRef, EmbeddedViewRef, Input} from '@angular/core';

    @Component({
      selector: 'panel',
      template: `
         <ng-template #tpladmin><span>Admin panel</span></ng-template>
      `,
      styles: []
    })
    export class PanelComponent {

      @ViewChild('tpladmin') _tpladmin: TemplateRef<any>;

      private view: EmbeddedViewRef<Object>;

      @Input() set isAdmin(value: boolean) {
        console.log();
        if (value) {
           this.view = this.viewContainerRef.createEmbeddedView(this._tpladmin);
        } else {
           this.view.destroy();
        }
      }

      constructor(private viewContainerRef: ViewContainerRef) {}
    }
    
Если у нас два варианта панели для пользователя и админа.

      @Input() set isAdmin(value: boolean) {

        if (value) {
           this.viewContainerRef.clear();
           this.view = this.viewContainerRef.createEmbeddedView(this._tpladmin);
        } else {
          this.viewContainerRef.clear();
          this.view = this.viewContainerRef.createEmbeddedView(this._tpluser);
        }
      }    
    

ViewContainerRef представляет собой ссылку на контейнер компонента или директивы и, кроме доступа к элементу, позволяет создавать два типа View — Host Views (View элементы, создаваемые на основе компонентов) и Embedded Views (View элементы, создаваемые на основе готовых шаблонов). 

Основные методы.

**createEmbeddedView(templateRef: TemplateRef, context?: C, index?: number): EmbeddedViewRef**

Позволяет создавать новые View-элементы на основе шаблонов и вставляет результат в DOM-контейнер. 
В качестве параметров можно также передать контекст, данные которые можно использовать в шаблоне, и индекс, по которому можно разместить создаваемый элемент.


**createComponent(componentFactory: ComponentFactory, index?: number, injector?: Injector, projectableNodes?: any[][], ngModule?: NgModuleRef): ComponentRef**

Создает View элемент на основе экземпляра компонента и вставляет его в DOM, возвращая нам указатель на созданный компонент. 

Для создания элемента необходимо сначала получить фабрику компонента и инжектор.


**clear(): void** Удаляет все View элементы в контейнере


**insert(viewRef: ViewRef, index?: number): ViewRef** - Вставляет View-элемент, в заданную позицию контейнера


**remove(index?: number): void** - Удаляет View-элемент по указанному индексу. Если индекс не задан, будет удален последний View-элемент.


**destroy (index?: number): ViewRef** - Удаляет контейнер.    
    

https://habr.com/ru/company/infowatch/blog/330030/
