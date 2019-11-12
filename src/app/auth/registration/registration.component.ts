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
} from '../../shared/validators/validator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.newUser = [];
    this.main = true;
    this.info = false;
    this.addressInfo = false;
    this.getCountry();
    this.userInfo = [];
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, firstNameValidator]),
      lastName: new FormControl('', [Validators.required, lastNameValidator]),
      userName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, emailValidator]),
      phone: new FormControl('', [Validators.required, phoneNumberValidator]),
      password1: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(5), passwordValidator])
    });
    this.firstForm = new FormGroup({
      select: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, cityValidator]),
      code: new FormControl('', [Validators.required, codeValidator])
    });
  }

  next() {
    let form = this.form.value;
    this.newUser.push({
      firstName: form.firstName,
      lastName: form.lastName,
      userName: form.userName,
      phone: form.phone,
      email: form.email,
      password: form.password2,
      address: []
    });
    this.main = false;
    this.address = true;
  }
  getCountry(): void {
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
      err => err
    );
  }
  addNewAddress() {
    this.firstForm.reset();
    this.new = true;
  }
  preview() {
    if (this.new === true) {
      if (this.firstForm.valid) {
        let form = this.firstForm.value;
        let obj = {
          type: '',
          country: form.country,
          city: form.city,
          code: form.code,
          id: this.newUser[0].address.length + 1
        };
        if (form.select === 'hAddress') {
          obj.type = 'Home address';
          this.newUser[0].address.push(obj);
        }
        if (form.select === 'sAddress') {
          obj.type = 'Shipping address';
          this.newUser[0].address.push(obj);
        }
        if (form.select === 'bAddress') {
          obj.type = 'Billing address';
          this.newUser[0].address.push(obj);
        }
      }
      this.userInfo.shift();
      this.userInfo.push(this.newUser[0]);
      this.info = true;
      this.new = false;
    }
  }
  cancel() {
    this.info = false;
  }
  save() {
    const obj = this.newUser[0];
    console.log(obj);
    this.authService.addNewUser(obj).subscribe();
    this.router.navigate(['/home']);
    this.userInfo = [];
    

  }
  backToMain() {
    this.address = !this.address;
    this.main = !this.main;
  }

} 
