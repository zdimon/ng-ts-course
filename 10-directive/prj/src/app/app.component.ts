import { Component, HostListener, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { MyformComponent } from './form.component';


@Component({
  selector: 'app-root',
  template: `
    <div>
       <h1 #title> Root component </h1>
       <my-form></my-form>
       <button (click)="doClick()">Do</button>
       <panel [isAdmin]="is_admin"></panel>
    </div>
  `,
  styles: [
    'div {border: 1px solid red}',
    'div { width: 100% }'
    ]
})
export class AppComponent implements AfterViewInit {

  is_admin: boolean= true;
  constructor(private rnd: Renderer2){
  }

  filter: string = 'green';

  @ViewChild(MyformComponent) myform: MyformComponent;

  @ViewChild('title') title: ElementRef;

  doClick(){
      this.is_admin = !this.is_admin;
  }

  ngAfterViewInit(){
    this.title.nativeElement.style.backgroundColor = 'black';
    this.rnd.listen(this.title.nativeElement, 'click', () => {
      alert('Hello');
    })
  }


}
