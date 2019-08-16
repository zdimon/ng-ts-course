# 4 Способа передачи данных между компонентами.

Мы имеем главный компонент app.component.ts.


    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {


    }

Его шаблон, в котором подключаем родительский (parent) компонент.


    <div>
    <h1> Main component </h1>
    <app-parent></app-parent>
    </div>


## Передача данных parent=>child с помощью декоратора @Input().

Это самый простой и распространенный способ.

В шаблоне родительского компонента передача выглядит так:


    <div>
      <h1> Parent component </h1>
      <app-child [childMessage]="parentMessage"></app-child>
    </div>    
    
При этом parentMessage - это свойство класса родительского, а childMessage дочернего компонентов.

Родительский компонент.

    import { Component } from '@angular/core';

    @Component({
      selector: 'app-parent',
      templateUrl: './app.parent.component.html',
      styleUrls: ['./app.parent.component.css']
    })
    export class AppParentComponent {
      parentMessage = 'message from parent'

    }
    
Дочерний компонент.

    import { Component, Input } from '@angular/core';

    @Component({
      selector: 'app-child',
      templateUrl: './app.child.component.html',
      styleUrls: ['./app.child.component.css']
    })
    export class AppChildComponent {
      @Input() childMessage: string;

    }
    
Так как в дочернем компоненте свойство childMessage заходит в шаблоне родительского с использованием квадратных скобок,
то это свойство необходимо задекорировать декоратором @Input().

Вывод свойства в шаблоне дочернего компонента.


    <div>
    <h1> Child component </h1>

    message is "{{ childMessage  }}"

    </div>
        
Результат.

![angular input decorator]({path-to-subject}/images/1.png)          
        
## Передача данных child=>parent с помощью декоратора @ViewChild().       
        
Декоратор ViewChild() позволяет внедрить дочерний компонент в родительский внутри его класса, а не с помощью шаблона как при использовании
декоратора Input. 

При этом родительский компонент получает доступ ко всем функциям и переменным дочернего компонента.

Однако при таком подходе необходимо помнить то, что дочерний компонент станет доступным только после полной инициализации представления. 

Это означает, что мы должны использовать (переопределить) метод AfterViewInit жизненного цикла компонента.

## Жизненный цикл компонентов Angular

В процессе работы Ангуляр постоянно создает, рендерит, обновляет и удаляет компоненты и их потомки.

Этот процесс состоит из ряда этапов (методов или хуков). 

Разработчик может переопределять и вмешиваться в этот процесс на разных его стадиях.

### ngOnChanges()

Установка значений изменяющихся свойств, которые связаны механизмом привязки. 
Данный метод в качестве параметра принимает объект класса SimpleChanges, который содержит предыдущие и текущие значения свойства.	

Вызывается перед методом ngOnInit() при начальной установке свойств и каждый раз когда какое-то свойство изменяется.

### ngOnInit()	

Инициализирует компонент или директиву после того, как Ангуляр отображает связанные данные и устанавливает входящие свойства компонента, 
выполняя его инициализацию.

Вызывается один раз после первого вызова метода ngOnChanges().



### ngDoCheck()	

Метод, с помощью которого можно отследить изменения того, что Ангуляр отследить не в силах.

Вызывается каждый раз, когда связанные данные изменяются, сразу же после ngOnChanges() и ngOnInit(). 

### ngAfterContentInit()	

Вызывается один раз после метода ngDoCheck() после вставки содержимого в представление компонента кода html.

### ngAfterContentChecked()	

Вызывается фреймворком Angular при проверке изменений содержимого, которое добавляется в представление компонента. 

Вызывается после метода ngAfterContentInit() и после каждого последующего вызова метода ngDoCheck().

### ngAfterViewInit()	

Вызывается фреймворком Angular после инициализации представления компонента, а также представлений дочерних компонентов. 

Вызывается только один раз сразу после первого вызова метода ngAfterContentChecked()


### ngAfterViewChecked()	

Вызывается фреймворком Angular после проверки на изменения в представлении компонента, а также проверки представлений дочерних компонентов. 
Вызывается после первого вызова метода ngAfterViewInit() и после каждого последующего вызова ngAfterContentChecked()


### ngOnDestroy()	

Вызывается перед тем, как фреймворк Angular удалит компонент.


[ссылка на документацию](https://metanit.com/web/angular2/2.8.php)


Определим переменную message в дочернем компоненте.



    import { Component, Input } from '@angular/core';

    @Component({
      selector: 'app-child',
      templateUrl: './app.child.component.html',
      styleUrls: ['./app.child.component.css']
    })
    export class AppChildComponent {
     
      message = 'Hello from child';

    }

Класс родительского компонента должен имплементировать интерфейс AfterViewInit и импортировать дочерний.
        
          
    import { ... AfterViewInit, ViewChild  } from '@angular/core';
    import { AppChildComponent  } from './app.child.component'

    export class AppParentComponent implements AfterViewInit {
      ....

    }    
        
Получаем объект дочернего компонента.

    @ViewChild(AppChildComponent) child;
    
    
Переопределяем метод ngAfterViewInit().


      ngAfterViewInit() {
        this.message = this.child.message;
      }  
      
Полный код.

    import { Component, AfterViewInit, ViewChild  } from '@angular/core';
    import { AppChildComponent  } from './app.child.component'

    @Component({
      selector: 'app-parent',
      templateUrl: './app.parent.component.html',
      styleUrls: ['./app.parent.component.css']
    })
    export class AppParentComponent implements AfterViewInit {
      parentMessage = 'message from parent'
      @ViewChild(AppChildComponent) child;
      message: string;
      ngAfterViewInit() {
        this.message = this.child.message;
      }

    }
    
Ошибка 

    ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'null: undefined'. Current value: 'null: Hello from child'.
    
    
Решение для 8 Ангуляра

    @ViewChild(AppChildComponent, {static: false}) child;    
    
Для 7 и ниже

    setTimeout(() => {
      this.childMessage = this.child.message;
    });
      
Вывод переменной в шаблоне.

    <div>
      <h1> Parent component </h1>
      Message from child: "{{ message  }}"
    </div>


## Передача данных child=>parent используя декоратор @Output() и генератор событий EventEmitter.

Еще одним способом передачи данных между дочерним и родительским компонентом - это сгенерировать событие в дочернем элементе 
и в нем передать данные родительскому.

Этот подход наиболее подходит в тех случаях, когда мы передаем данные, изменяющиеся по клику на кнопке или сабмиту формы.

В родительском компоненте мы создаем функцию (метод), принимающую событие (переданные данные из дочернего компонента).

  receiveMessage($event) {
    this.message = $event
  }

В дочернем мы создаем переменную messageEvent и декорируем его декоратором @Output() и присваиваем новому объекту типа EventEmitter.

    @Output() messageEvent = new EventEmitter<string>();

Затем создаем метод sendMessage в котором вызываем метод emit объекта messageEvent.

Этот метод сгенерирует событие и передаст информацию родительскому компоненту.

И наконец создаем кнопку, привязывая ее к методу sendMessage.

    <button (click)="sendMessage()">Send Message</button>


В шаблоне родительского компонента определим передачу события из дочернего компонента.

    <app-child (messageEvent)="receiveMessage($event)"></app-child>

После этого родительский компонент становиться подписан на это событие.


## Передача данных между несвязанными компонентами.




 


        
    
