import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable()
export class DataService{
  // TODO: Тут было прописано "Default message"
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(){}

    changeMessage(message: string){
    this.messageSource.next(message);
    }
}

