import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() user: any;

  constructor() { }

  ngOnInit() {
  }

}
