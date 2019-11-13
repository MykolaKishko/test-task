import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/shared/services/global.service';
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
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit {

  form: FormGroup;
  firstForm: FormGroup;
  newUser = [];
  mainInfo = true;
  addressInfo = false;
  main: boolean;
  address: boolean;
  info: boolean;
  userInfo = [];
  countries: any;
  new = true;

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private authService: AuthService
  ) {}

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
    const form = this.form.value;
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
        const form = this.firstForm.value;
        const obj = {
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
    this.authService.addNewUser(obj).subscribe();
    this.router.navigate(['/system', 'userInfo']);
    this.userInfo = [];
  }
  backToMain() {
    this.address = !this.address;
    this.main = !this.main;
  }
}
