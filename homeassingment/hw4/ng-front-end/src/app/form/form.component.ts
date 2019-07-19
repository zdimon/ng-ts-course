import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../model'
import { UserService  } from '../service.service'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() user: any;
  @Output() onAdded = new EventEmitter<any>();

  constructor(private http_service: UserService) { }

  ngOnInit() {
  }

  // Метод добавления пользователя
  // TODO: Вынести в сервисы?
  add() {
    const req = this.http_service.addUser(this.user).subscribe((rez)=>{
      req.unsubscribe();
      this.onAdded.emit(this.user);
      // TODO
      //this.clearUser();
      //this.getUsers();
    })

  }

}
