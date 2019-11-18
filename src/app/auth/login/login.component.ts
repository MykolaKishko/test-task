import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { LogIn } from 'src/app/store/action/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  users = null;
  message = '';



  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private store: Store
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      userName: new FormControl('admin', [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl('000000', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }


  // logIn() {
  //   this.store.dispatch(new LogIn(this.form.value));
  // }


  logIn() {
    this.http.get('http://localhost:3000/users').subscribe( users => {
      this.users = users;
      if (!!this.users) {
        this.users.map((user) => {
          if (user.userName !== this.form.controls.userName.value) {
            this.message = 'Wrong login!';
          }
          if (user.password !== this.form.controls.password.value) {
            this.message = 'Wrong password!';
          }
          if (
            user.password === this.form.controls.password.value &&
            user.userName === this.form.controls.userName.value
          ) {
            window.localStorage.setItem('User', JSON.stringify(user));
            this.authService.log();
            this.router.navigate(['/system/userInfo']);
          }
        });
      }
    });
  }
}
