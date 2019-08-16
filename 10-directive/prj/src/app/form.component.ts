import { Component } from '@angular/core';

@Component({
  selector: 'my-form',
  template: `
    <div>
       <h1> My form </h1>

    </div>
  `
})
export class MyformComponent {

  doForm(){
    alert('Go');
  }

}
