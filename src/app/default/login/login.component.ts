// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Store } from '@ngxs/store';
// import { LogIn } from 'src/app/store/action/login.action';
// import { RequestionService } from 'src/app/shared/services/requests.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   form: FormGroup;

//   constructor(
//     private router: Router,
//     private store: Store,
//     private requestsService: RequestionService
//   ) {}

//   ngOnInit() {
//     this.form = new FormGroup({
//       userName: new FormControl('admin', [Validators.required, Validators.minLength(5)]),
//       password: new FormControl('000000', [Validators.required, Validators.minLength(5)])
//     });
//   }

//   logIn() {
//     this.requestsService.deleteAuthUser();
//     this.store.dispatch(new LogIn(this.form.value)).subscribe( res => {
//       if (!!res) {
//         this.router.navigate(['/system/userInfo']);
//       }
//     });



//     // setTimeout( () => {
//     //   this.router.navigate(['/system/userInfo']);
//     // }, 400);
//   }
// }













import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LogIn } from 'src/app/store/action/login.action';
import { RequestionService } from 'src/app/shared/services/requests.service';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private store: Store,
    private requestsService: RequestionService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      userName: new FormControl('admin', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('000000', [Validators.required, Validators.minLength(5)])
    });
  }

  logIn() {
    this.requestsService.deleteAuthUser();
    this.store.dispatch(new LogIn(this.form.value));


    setTimeout( () => {
      this.store.dispatch(new Navigate(['/system/userInfo']));
    }, 400);
    // this.store.dispatch(new Navigate(['/system/userInfo']));
  }
}