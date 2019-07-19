import { Injectable } from '@angular/core';

@Injectable()
export class UserTestService {
  getUsers = () => [
    { id: 1, name: 'dima test' },
    { id: 2, name: 'timur test' }
  ];
}
