import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesService } from 'src/app/shared/services/countries.service';
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
import { RequestionService } from 'src/app/shared/services/requests.service';
import { Countries } from 'src/app/shared/models/countries';
import { Users } from 'src/app/shared/models/users';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  mainForm: FormGroup;
  addressForm: FormGroup;
  newUser: Users;
  displayMainInfoBlock: boolean;
  displayAddressInfoBlock: boolean;
  displayPreviewModal: boolean;
  countries: Countries[];
  displayNewAddressTitle: boolean;

  constructor(
    private countriesService: CountriesService,
    private router: Router,
    private requestionService: RequestionService
  ) { }

  ngOnInit() {
    this.displayMainInfoBlock = true;
    this.displayPreviewModal = false;
    this.displayNewAddressTitle = false;
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

  next() {
    this.newUser =  this.mainForm.value;
    this.newUser.address = [];
    this.displayMainInfoBlock = false;
    this.displayAddressInfoBlock = true;
  }
  getCountry(): void {
    this.countriesService.getCountries().subscribe(
      countries => this.countries = countries,
      err => err
    );
  }
  addNewAddress() {
    this.addressForm.reset();
    this.displayPreviewModal = false;
    this.displayAddressInfoBlock = true;
  }
  newUserPreview() {
    const newAddress = this.addressForm.value;
    newAddress.id = this.newUser.address.length + 1;
    this.newUser.address = [...this.newUser.address, ...newAddress];
    this.displayAddressInfoBlock = false;
    this.displayPreviewModal = true;
  }
  cancel() {
    this.displayPreviewModal = false;
    this.addressForm.reset();
    this.mainForm.reset();
    this.displayMainInfoBlock = true;
  }
  save() {
    this.requestionService.addNewUser(this.newUser).subscribe();
    this.router.navigate(['/home']);
  }
  backToMain() {
    this.displayAddressInfoBlock = !this.displayAddressInfoBlock;
    this.displayMainInfoBlock = !this.displayMainInfoBlock;
  }
}
