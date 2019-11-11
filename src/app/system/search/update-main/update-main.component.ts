import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import {
  firstNameValidator,
  emailValidator,
  phoneNumberValidator,
  passwordValidator,
  lastNameValidator
} from '../../../shared/validators/validator';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AskModalComponent } from '../ask-modal/ask-modal.component';

@Component({
  selector: 'app-update-main',
  templateUrl: './update-main.component.html',
  styleUrls: ['./update-main.component.scss']
})


export class UpdateMainComponent implements OnInit {

  // @Input() name: string;

  constructor( private globalService: GlobalService, public dialog: MatDialog) {}

  editForm: FormGroup;
  currentValue = this.globalService.currentValue;
  countries: any;
  users = this.globalService.users;
  addressInfo = this.globalService.addressInfo;
  currentAddr = this.globalService.currentAddr;
  editFormValue = this.globalService.editFormValue;
  editUser = this.globalService.editUser;

  ngOnInit() {
  
    this.getCountry();
    this.editForm = new FormGroup({
      firstName: new FormControl(this.currentValue[0].firstName, [Validators.required, firstNameValidator]),
      lastName: new FormControl(this.currentValue[0].lastName, [Validators.required,  lastNameValidator]),
      userName: new FormControl(this.currentValue[0].userName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl(this.currentValue[0].email, [Validators.required, emailValidator]),
      phone: new FormControl(this.currentValue[0].phone, [Validators.required,  phoneNumberValidator]),
      password1: new FormControl(this.currentValue[0].password, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(this.currentValue[0].password, [Validators.required, Validators.minLength(5), passwordValidator])
    });
  }

  

  getCountry(): void {
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
        err => err
    );
  }
  openAskModal() {
    this.dialog.open(AskModalComponent);
    this.editFormValue.shift();
    this.editFormValue.push(this.editForm.value);
    this.editUser.shift();
    this.editUser.push(true);
  }

  closeMainModal() {
    this.dialog.closeAll();
  }
}
