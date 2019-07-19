import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  getUsers = () => [
    { id: 1, name: 'dima' },
    { id: 2, name: 'timur' }
  ];
}
