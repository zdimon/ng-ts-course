import {Directive, ElementRef, Input, Renderer2, HostListener} from '@angular/core';

@Directive({
    selector: 'color'
})
export class ColorDirective{



    constructor(private elementRef: ElementRef, private renderer: Renderer2){
      this.elementRef.nativeElement.style.backgroundColor = "blue";
    }

    @Input('myColor')
    set content(value: string){
      console.log(value);
      /*
      let btn = this.renderer.createElement('button');
      let txt = this.renderer.createText(value);
      this.renderer.appendChild(btn,txt);
      this.renderer.appendChild(this.elementRef.nativeElement,btn)

      */
      this.elementRef.nativeElement.style.backgroundColor = value;
    }




      /*
    protected ngOnChanges() {
      console.log('inputTextFilter', this.content);
    }
    */

}
