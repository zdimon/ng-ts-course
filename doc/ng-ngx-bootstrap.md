# Библиотека ngx-bootstrap. Форма авторизации.

## Установка.

    npm install ngx-bootstrap bootstrap --save
    
## Конфигурация.

    "styles": [
       "../node_modules/bootstrap/dist/css/bootstrap.min.css",
       "styles.css"
    ],
    
После этого необходимо перегрузить сервер.

    ng serve -o
    
Альтернативный способ - использовать установщик.

    ng add ngx-bootstrap 
    ng add ngx-bootstrap  --component componentName
    
    ng add ngx-bootstrap  --component accordion
    ng add ngx-bootstrap  --component alerts
    
## Выпадающее меню.    
    
Подключим необходимый модуль bootstrap в главном модуле.

    import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
    ...

    @NgModule({
       ...
       imports: [BsDropdownModule.forRoot(), ... ],
        ...
    })
    
Используем в шаблоне.

    <div class="btn-group" dropdown>
      <button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">
        Button dropdown <span class="caret"></span>
      </button>
      <ul *dropdownMenu class="dropdown-menu" role="menu">
        <li role="menuitem"><a class="dropdown-item" href="#">Item 1</a></li>
        <li role="menuitem"><a class="dropdown-item" href="#">Item 2</a></li>
      </ul>
    </div>
    
![bootstrap]({path-to-subject}/images/b1.png)    

## Кнопки

    import { ButtonsModule } from 'ngx-bootstrap/buttons';
    ...
    ButtonsModule.forRoot(),

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button type="button" class="btn btn-primary">
        Single Button
      </button>
    </nav>
    
## Модальное окно.

    <button type="button" class="btn btn-primary" (click)="openModal(template)">Create template modal</button>
     
    <ng-template #template>
      <div class="modal-header">
        <h4 class="modal-title pull-left">Modal</h4>
        <button type="button" class="close pull-right" aria-label="Close" (click)="modalRef.hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        This is a modal.
      </div>
    </ng-template>

Компонент.

    import { Component, TemplateRef } from '@angular/core';

    import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
      title = 'prj';
      modalRef: BsModalRef;
      constructor(private modalService: BsModalService){

      }
      openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
      }
    }

**TemplateRef** - представляет встроенный шаблон (ng-template) для втстраивания его представления в документ.   
Он делает его доступным в компоненте.    

Используя #template в этом шаблоне мы создаем ссылку на него для передачи ее в другой участок документа.

В нашем случае мы передаем ее параметром к функции openModal().
        
В этой функции мы присваеваем переменной шаблона modalRef результат открытия модального диалога (ссылку на него).

    this.modalRef = this.modalService.show(template);
    
Это делается для того, чтобы в шаблоне иметь возможность его закрыть.

    <button type="button" class="close pull-right" aria-label="Close" (click)="modalRef.hide()">
    
![bootstrap]({path-to-subject}/images/b1.png)        


## Табы

    import { TabsModule } from 'ngx-bootstrap/tabs';

    TabsModule.forRoot()

    <div>
      <tabset>
        <tab heading="Basic title" id="tab1">Basic content</tab>
        <tab heading="Basic Title 1">Basic content 1</tab>
        <tab heading="Basic Title 2">Basic content 2</tab>
      </tabset>
    </div>

![bootstrap]({path-to-subject}/images/b4.png)     
    
##Компонент формы логина.

    import { Component, TemplateRef } from '@angular/core';


    @Component({
      selector: 'app-login-form',
      template: `
      <div class="mx-auto login_form">
        <h2 class="text-center">Log in</h2>
        <div class="form-group">
          <input #username type="text" class="form-control"  name="username" required="required">
        </div>
        <div class="form-group">
            <button type="submit" (click)="login(username.value)" class="btn btn-primary btn-block">Log in</button>
        </div>
    </div>
      `,
    })
    export class LoginComponent {
      username: string;
      constructor(){
      }

      login(username){
        console.log(username);
      }

    }
    
![bootstrap]({path-to-subject}/images/b2.png) 
    
    
