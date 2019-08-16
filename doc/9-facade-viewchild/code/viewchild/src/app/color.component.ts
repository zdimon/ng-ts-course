import { Component } from '@angular/core';

@Component({
  selector: 'color',
  template: `
    <div >
    Color component
    </div>
  `,
  styles: []
})
export class ColorComponent {

  colorMethod(){
    console.log('color firing!!!')
  }


}

