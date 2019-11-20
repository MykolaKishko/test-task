import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RequestionService } from 'src/app/shared/services/requests.service';
import { LogIn } from 'src/app/store/action/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private requestService: RequestionService,
    private router: Router,
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
    this.requestService.getUsers().subscribe( users => {
      if (!!users) {
        users.map((user) => {
          console.log(user);
          if (user.password === this.form.controls.password.value && user.userName === this.form.controls.userName.value) {
            window.localStorage.setItem('User', JSON.stringify(user));
            this.authService.log();
            this.router.navigate(['/system/userInfo']);
          }
        });
      }
    });
  }
}
