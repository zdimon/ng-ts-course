import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() color: string;
  @Output() onChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  change(name: string){
    this.color = name;
    this.onChanged.emit(this.color);
  }

}
