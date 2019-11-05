import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/global.service'; 
import { Router } from '@angular/router';
import {
  passwordValidator,
  phoneNumberValidator,
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  cityValidator,
  codeValidator
} from './validator';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;
  firstForm: FormGroup;

  newUser = this.globalService.newUser;
  mainInfo = true;
  addressInfo = false;
  main: boolean;
  address: boolean;
  info: boolean;

  users = this.globalService.users;
  userInfo = [];
  countries: any;
  new = true;

  constructor(
    private globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit( ) {
    this.main = true;
    this.info = false;
    this.addressInfo = false;
    this.getCountry();
    this.userInfo = [];

    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, firstNameValidator]),
      lastName: new FormControl('', [Validators.required,  lastNameValidator]),
      userName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, emailValidator]),
      phone: new FormControl('', [Validators.required,  phoneNumberValidator]),
      password1: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(5), passwordValidator])
    });

    this.firstForm = new FormGroup({
      select: new FormControl('', [Validators.required]),
      country: new FormControl('',  [Validators.required]),
      city: new FormControl('', [Validators.required, cityValidator]),
      code: new FormControl('', [Validators.required, codeValidator])
    });
  }

  nextStep() {
    console.log(this.form.controls);
    this.newUser.push({
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      userName: this.form.controls.userName.value,
      phone: this.form.controls.phone.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password2.value,
      address: []
    });
    console.log(this.newUser);
    // this.router.navigate(['/system', 'createAddress']);
    this.main = false;
    this.address = true;
  }

  getCountry(): void{
    this.globalService.getCountries().subscribe(
       countries => this.countries = countries,
       err => err
     );
   }

addNewAddress() {
  this.firstForm = new FormGroup({
    select: new FormControl('', [Validators.required]),
    country: new FormControl('',  [Validators.required]),
    city: new FormControl('', [Validators.required, cityValidator]),
    code: new FormControl('', [Validators.required, codeValidator])
  });
  this.new = true;
}

 next() {
   if(this.new === true) {
    if(this.firstForm.valid) {
      if(this.firstForm.controls.select.value === 'hAddress') {
        this.newUser[0].address.push({
          type: 'Home address',
          country: this.firstForm.controls.country.value,
          city: this.firstForm.controls.city.value,
          code: this.firstForm.controls.code.value,
          id: this.newUser[0].address.length + 1
        });
      }
      if(this.firstForm.controls.select.value === 'sAddress') {
        this.newUser[0].address.push({
          type: 'Shipping address',
          country: this.firstForm.controls.country.value,
          city: this.firstForm.controls.city.value,
          code: this.firstForm.controls.code.value,
          id: this.newUser[0].address.length + 1
        });
      }
      if(this.firstForm.controls.select.value === 'bAddress') {
        this.newUser[0].address.push({
          type: 'Billing address',
          country: this.firstForm.controls.country.value,
          city: this.firstForm.controls.city.value,
          code: this.firstForm.controls.code.value,
          id: this.newUser[0].address.length + 1
        });
      }
    }
    console.log(this.newUser);
    this.userInfo.shift();
    this.userInfo.push(this.newUser[0]);
    this.info = true;
    this.new = false;
    }
  }

  cancel() {
    this.info = false;
    console.log(this.users);
  }

  save() {
    const obj = this.newUser[0];
    this.users.push(obj);
    console.log(this.users);
    this.router.navigate(['/system', 'userInfo']);
    this.userInfo = [];
  }

  backToMain() {
    this.address = !this.address;
    this.main = !this.main;
  }
}
