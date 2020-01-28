import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    console.log(username, password, this.isLoginMode);
    
    let authObservable: Observable<any>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(username, password);
    } else {
      authObservable = this.authService.register(username, password);
    }

    authObservable.subscribe(resData => {
      console.log(resData);
      this.router.navigate(['/registered-users']);
    }, error => {
      console.log(error);
    });

    if (this.isLoginMode) {

    }
  }

  ngOnInit() {
  }

}
