import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  passwordValidator,
  phoneNumberValidator,
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  cityValidator,
  codeValidator
} from '../../shared/validators/validator';
import { Countries } from '../../shared/models/countries';
import { Users } from 'src/app/shared/models/users';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { CreateUser } from 'src/app/store/action/users.action';
import { GetCountries } from 'src/app/store/action/countries.action';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  mainForm: FormGroup;
  addressForm: FormGroup;
  newUser: Users;
  displayMainInfoBlock = true;
  displayAddressInfoBlock: boolean;
  displayPreviewModal = false;
  countries: Countries[];

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.getCountry();
    this.mainForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, firstNameValidator]),
      lastName: new FormControl('', [Validators.required, lastNameValidator]),
      userName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, emailValidator]),
      phone: new FormControl('', [Validators.required, phoneNumberValidator]),
      password1: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), passwordValidator])
    });
    this.addressForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, cityValidator]),
      code: new FormControl('', [Validators.required, codeValidator]),
    });
  }

  next(): void {
    this.newUser =  this.mainForm.value;
    this.newUser.address = [];
    this.displayMainInfoBlock = false;
    this.displayAddressInfoBlock = true;
  }
  getCountry(): void {
    this.store.dispatch(new GetCountries());
    this.store.subscribe( res => this.countries = res.Countries.countries);
  }
  addNewAddress(): void {
    this.addressForm.reset();
    this.displayPreviewModal = false;
    this.displayAddressInfoBlock = true;
  }
  newUserPreview(): void {
    this.addressForm.value.id = this.newUser.address.length + 1;
    this.newUser.address = [...this.newUser.address, ...this.addressForm.value];
    this.displayAddressInfoBlock = false;
    this.displayPreviewModal = true;
  }
  cancel(): void {
    this.displayPreviewModal = false;
    this.addressForm.reset();
    this.mainForm.reset();
    this.displayMainInfoBlock = true;
  }
  save(): void {
    this.store.dispatch(new CreateUser(this.newUser));
    this.store.dispatch(new Navigate(['/home']));
    this.displayMainInfoBlock = true;
    this.displayPreviewModal = false;
  }
  backToMain(): void {
    this.displayAddressInfoBlock = !this.displayAddressInfoBlock;
    this.displayMainInfoBlock = !this.displayMainInfoBlock;
  }
}
