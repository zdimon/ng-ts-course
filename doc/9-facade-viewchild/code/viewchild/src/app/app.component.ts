import { Component } from '@angular/core';

import { Directive, Renderer2, ElementRef, Input} from '@angular/core';

import {HostListener} from '@angular/core';

import { ViewChild, AfterViewInit } from '@angular/core';
import { PanelComponent } from './panel.component';
import { ColorComponent } from './color.component';


@Component({
  selector: 'app-root',
  template: `
     <h2 #title>Choose Brand Colors:</h2>
     <input [(ngModel)]="filter" type="text" name="filter"  />
     <input type="radio" name="colors" (click)="color='lightgreen'">Green
     <input type="radio" name="colors" (click)="color='yellow'">Yellow
     <input type="radio" name="colors" (click)="color='cyan'">Cyan
     <div mydirective [aliasContent]="color">This is directive</div>
     <input type="checkbox" name="is_admin" [(ngModel)]="is_admin">
     <button (click)="doInChild()">Do in child</button>
     <button (click)="doInColor()">Do in color</button>
     <panel [isAdmin]="is_admin"></panel>
     <a id="click_me">Click me</a>



  `,
  styles: []
})
export class AppComponent implements AfterViewInit {
  filter: string = 'Some text';
  color: string = 'red';
  is_admin: boolean = true;

  @HostListener('click', ['$event']) Component(event) {
    console.log('component is clicked');
    console.log(event);
  }

  constructor(private elementRef:ElementRef, private renderer: Renderer2) {}

  @ViewChild(PanelComponent) childComponent: PanelComponent;
  @ViewChild(ColorComponent) colorComponent: ColorComponent;

  @ViewChild('title') title: ElementRef;

  ngAfterViewInit(){
    this.childComponent.someMethod();

    this.title.nativeElement.style.backgroundColor = 'red';
    this.title.nativeElement.addEventListener('click', () => {
      alert('Go');
    })

    this.renderer.listen(this.title.nativeElement, 'click', () => {
       this.renderer.setStyle(this.title.nativeElement, 'color', 'green');
    });

    //this.elementRef.nativeElement.querySelector('#click_me').addEventListener('click', this.onClick);

  }

  onClick(event) {
    console.log(event);
  }

  doInChild(){
    this.childComponent.someMethod();
  }

  doInColor(){
    this.colorComponent.colorMethod();
  }

}


@Directive({
  selector: '[mydirective]'
})
export class MyDirective {
  constructor(
     private renderer: Renderer2,
     private elementRef: ElementRef
  ) {}

  /*
    protected ngOnChanges() {
         console.log('inputTextFilter', this.inputTextFilter);
    }
  */

  @Input('aliasContent') content: string;


  /*
  @Input() set content(value: string) {
    let buttonElement = this.renderer.createElement('button');
    const text = this.renderer.createText(value);
    this.renderer.appendChild(buttonElement, text);
    this.renderer.appendChild(this.elementRef.nativeElement, buttonElement);
  }
  */

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.backgroundColor = this.content;
  }

  alert(){
    alert(this.content);
  }




}
