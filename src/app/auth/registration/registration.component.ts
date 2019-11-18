import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/shared/services/countries.service';
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
import { QueriesService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  form: FormGroup;
  firstForm: FormGroup;
  newUser = null;
  mainBlock: boolean;
  addressBlock: boolean;
  info: boolean;
  countries: any;
  newAddressInput = true;

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private queriesService: QueriesService
  ) { }

  ngOnInit() {
    this.newUser = null;
    this.mainBlock = true;
    this.info = false;
    this.getCountry();
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, firstNameValidator]),
      lastName: new FormControl('', [Validators.required, lastNameValidator]),
      userName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, emailValidator]),
      phone: new FormControl('', [Validators.required, phoneNumberValidator]),
      password1: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), passwordValidator]),
      address: new FormControl([])
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
    this.newUser =  form;
    this.mainBlock = false;
    this.addressBlock = true;
  }
  getCountry(): void {
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
      err => err
    );
  }
  addNewAddress() {
    this.firstForm.reset();
    this.newAddressInput = true;
  }
  preview() {
    if (this.newAddressInput === true) {
      if (this.firstForm.valid) {
        const form = this.firstForm.value;
        const obj = form;
        obj.type = '';
        obj.id = this.newUser.address.length + 1;
        if (form.select === 'hAddress') {
          obj.type = 'Home address';
          this.newUser.address = [...this.newUser.address, ...obj];
        }
        if (form.select === 'sAddress') {
          obj.type = 'Shipping address';
          this.newUser.address = [...this.newUser.address, ...obj];
        }
        if (form.select === 'bAddress') {
          obj.type = 'Billing address';
          this.newUser.address = [...this.newUser.address, ...obj];
        }
      }
      this.info = true;
      this.newAddressInput = false;
    }
  }
  cancel() {
    this.info = false;
  }
  save() {
    this.queriesService.addNewUser(this.newUser).subscribe();
    this.router.navigate(['/home']);
  }
  backToMain() {
    this.addressBlock = !this.addressBlock;
    this.mainBlock = !this.mainBlock;
  }
}
