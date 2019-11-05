import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/global.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  users = this.globalService.users;
  message = '';

  constructor(
    private globalService: GlobalService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      userName: new FormControl('admin', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('000000', [Validators.required, Validators.minLength(5)]),
    });
  }

  logIn() {
    this.users.forEach((e, i) => {
      if (e.userName !== this.form.controls.userName.value) {
        this.message = 'Wrong login! ';
      }
      if (e.password !== this.form.controls.password.value) {
        this.message = 'Wrong password! ';
      }
      if (e.password === this.form.controls.password.value && e.userName === this.form.controls.userName.value) {
        window.localStorage.setItem('User', JSON.stringify(e));
        this.authService.login();
        this.router.navigate(['/system/userInfo']);
      }
    });
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}
