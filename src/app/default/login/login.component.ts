import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LogIn } from 'src/app/store/action/login.action';
import { Navigate } from '@ngxs/router-plugin';
import { Users } from 'src/app/shared/models/users';
import { AddAllUsers } from 'src/app/store/action/users.action';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      userName: new FormControl('admin', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('000000', [Validators.required, Validators.minLength(5)])
    });
    this.store.dispatch(new AddAllUsers());
  }

  logIn() {
    let users: Users[];
    this.store.subscribe( data => users = data.Users.users);
    users = users.filter( user => user.userName === this.form.value.userName && user.password === this.form.value.password);
    users.map( user => {
      if (user.userName === this.form.value.userName && user.password === this.form.value.password) {
        this.store.dispatch(new LogIn(user));
        this.store.dispatch(new Navigate(['/system/userInfo']));
      }
    });
    if (users[0] === undefined) {
      this.snackBar.open( 'WRONG DATA', '  CLOSE', {
        duration: 3000,
      });
    }
  }
}


