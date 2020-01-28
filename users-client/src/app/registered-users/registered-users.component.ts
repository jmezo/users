import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit, OnDestroy{
  usersSub: Subscription;
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.fetchUsers().subscribe();
    this.usersSub = this.userService.usersChanged.subscribe(
      users => this.users = users
    );
    this.users = this.userService.getUsers();
  }

  // onFetch() {
  //   this.userService.fetchUsers().subscribe();
  // }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

}
