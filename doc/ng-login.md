## Проверка на авторизованность. Защита роутинга.


В начале необходимо создать сервис для проверки флага авторизации, который будем хранить в localStorage.
Если этого флага нет, то редиректим на роутинг с авторизационной формой и возвращаем false.

    // src/app/auth/auth-guard.service.ts
    import { Injectable } from '@angular/core';
    import { Router, CanActivate } from '@angular/router';
    @Injectable()
    export class AuthGuardService implements CanActivate {
      constructor(public router: Router) {}
      canActivate(): boolean {
          return false;
      }
    }

## Редирект в Ангуляре.

Усложним логику проверкой флага авторизации.

    import { Injectable } from '@angular/core';
    import { Router, CanActivate } from '@angular/router';
    @Injectable()
    export class AuthGuardService implements CanActivate {
      constructor(public router: Router) {}
      canActivate(): boolean {
          if(localStorage.getItem('is_active') == undefined) {
            this.router.navigate(['reg']);
            return false;
          } else {
            return true;
          }
      }
    }


Выставим этот флаг хардкодом (пока) при сабмите формы для проверки.

Для этого определим методы в шаблоне, вызываемый по клику на кнопки.


    <button (click)="runLogin(e)" class="btn btn-primary">Login</button>
    <button (click)="runUnLogin(e)" class="btn btn-primary">Unlogin</button>
    
Далее определим методы в классе компонента.

      ....
      
      constructor() { }

      ngOnInit() {
      }

      runLogin = (e) => {
        console.log('Loging!!!');
        localStorage.setItem('is_active','true');
      }

      runUnLogin = (e) => {
        console.log('UNLoging!!!');
        localStorage.setItem('is_active','false');
      }

    }


## Использование сервиса в роутинге.

    { path: 'documents', component: DocumentComponent, canActivate: [AuthGuardService] },



### Установка флага авторизованности формой.


Создадим компонент формы логина, которая устанавливает поле username в localsrotage.

В зависимости от того есть ли эта переменная или нет на момент создания компонента принимается решение отображать форму или кнопку разлогиниться.

Для этого в компоненте создадим логическую переменную is_auth.



    import { Component, TemplateRef, OnInit } from '@angular/core';


        @Component({
          selector: 'app-login-form',
          template: `
          <div *ngIf="!is_auth" class="mx-auto login_form">
            <h2 class="text-center">Log in</h2>
            <div class="form-group">
              <input #username type="text" class="form-control"  name="username" required="required">
            </div>
            <div class="form-group">
                <button type="submit" (click)="login(username.value)" class="btn btn-primary btn-block">Log in</button>

            </div>
          </div>
          <button *ngIf="is_auth" type="submit" (click)="unlogin()" class="btn btn-primary btn-block">Unlogin</button>
          `,
        })
        export class LoginComponent implements OnInit {
          username: string;
          is_auth: boolean = false;
          constructor(){
          }

          ngOnInit(){
            if(localStorage.getItem('username')){
              this.is_auth = true;
            }
          }

          login(username){
            localStorage.setItem('username',username);
            this.is_auth = true;
          }

          unlogin(username){
            localStorage.removeItem('username');
            this.is_auth = false;
          }

        }



![routing angular]({path-to-subject}/images/b5.png)  

[Источник](https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3)



