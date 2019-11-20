import { Component, OnInit, Inject } from '@angular/core';
import { CountriesService } from 'src/app/shared/services/countries.service';
import {
  firstNameValidator,
  emailValidator,
  phoneNumberValidator,
  passwordValidator,
  lastNameValidator
} from '../../../shared/validators/validator';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RequestionService } from 'src/app/shared/services/requests.service';
import { Countries } from 'src/app/shared/models/countries';

@Component({
  selector: 'app-update-main',
  templateUrl: './update-main.component.html',
  styleUrls: ['./update-main.component.scss']
})

export class UpdateMainComponent implements OnInit {

  editUserForm: FormGroup;
  countries: Countries[];
  action = this.data.action;

  constructor(
    private countriesService: CountriesService,
    private requestionService: RequestionService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateMainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getCountry();
    this.editUserForm = new FormGroup({
      firstName: new FormControl(this.data.user.firstName, [Validators.required, firstNameValidator]),
      lastName: new FormControl(this.data.user.lastName, [Validators.required,  lastNameValidator]),
      userName: new FormControl(this.data.user.userName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl(this.data.user.email, [Validators.required, emailValidator]),
      phone: new FormControl(this.data.user.phone, [Validators.required,  phoneNumberValidator]),
      password1: new FormControl(this.data.user.password, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(this.data.user.password, [Validators.required, Validators.minLength(5), passwordValidator]),
      address: new FormControl([])
    });
  }

  getCountry(): void {
    this.countriesService.getCountries().subscribe(
      countries => this.countries = countries,
      err => err
    );
  }
  editUser() {
    this.data.users = this.data.users.filter(user => user.id !== this.data.user.id);
    const editUser = this.editUserForm.value;
    editUser.address = [...this.data.user.address];
    this.data.users = [ ...this.data.users, ...editUser];
    this.requestionService.updateUser( this.data.user.id, editUser);
    this.dialog.closeAll();
  }
  removeUser() {
    this.data.users = this.data.users.filter(user => user.id !== this.data.user.id);
    this.requestionService.deleteUser(this.data.user.id).subscribe();
    this.dialog.closeAll();
  }
  closeMainModal() {
    this.dialog.closeAll();
  }
}
