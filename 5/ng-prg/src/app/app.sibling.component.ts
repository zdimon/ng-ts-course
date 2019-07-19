import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-sibling',
  template: `
  <div>
 <h1> Sibling</h1>
 message from service {{ message  }}
  </div>
  `,
  styles: ['div { border: 3px solid red; padding: 10px }']
})
export class AppSiblingComponent implements OnInit {
  message: string;
  constructor(private data_service: DataService){
    console.log(this.message);
  }

  ngOnInit(){
     this.data_service.currentMessage$.subscribe((message)=>{
       this.message = message;
     });
  }

}
