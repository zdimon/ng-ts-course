import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private http_service: UserService) { }

  ngOnInit() {
  }

  // Метод добавления пользователя
  // TODO: Вынести в сервисы?
  add(user: User) {
    const req = this.http_service.addUser(user).subscribe((rez)=>{
      req.unsubscribe();
      // TODO
      //this.clearUser();
      //this.getUsers();
    })
    
  }

}
