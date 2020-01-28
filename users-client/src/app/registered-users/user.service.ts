import { Injectable } from '@angular/core';

import { User } from './user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class UserService {
  usersChanged = new Subject<User[]>();
  private users: User[] = [];

  constructor(private http: HttpClient) { }

  fetchUsers() {
    return this.http.get<User[]>('http://localhost:8080/api/users')
    .pipe(
      tap(users => {
        console.log(users, typeof users);
        this.setUsers(users);
        console.log(this.users);
      })
    );
  }

  setUsers(users: User[]) {
    this.users = users.slice();
    this.usersChanged.next(this.users.slice());
  }

  getUsers() {
    return this.users.slice();
  }

}