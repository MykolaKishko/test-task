import { Component, OnInit, Inject } from '@angular/core';
import { CountriesService } from '../../../shared/services/countries.service';
import {
  firstNameValidator,
  emailValidator,
  phoneNumberValidator,
  passwordValidator,
  lastNameValidator
} from '../../../shared/validators/validator';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Countries } from '../../../shared/models/countries';
import { Store } from '@ngxs/store';
import { DeleteUser, EditUser } from '../../../store/action/users.action';

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
    private store: Store,
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
      address: new FormControl([]),
      id: new FormControl(this.data.user.id)
    });
  }

  getCountry(): void {
    this.countriesService.getCountries().subscribe(
      countries => this.countries = countries,
      err => err
    );
  }
  editUser(): void {
    this.data.users = this.data.users.filter(user => user.id !== this.data.user.id);
    const editUser = this.editUserForm.value;
    editUser.address = [...this.data.user.address];
    this.data.users = [ ...this.data.users, ...editUser];
    this.store.dispatch(new EditUser(editUser));
    this.dialog.closeAll();
  }
  removeUser(): void {
    this.data.users = this.data.users.filter(user => user.id !== this.data.user.id);
    this.store.dispatch(new DeleteUser(this.data.users, this.data.user.id));
    this.dialog.closeAll();
  }
  closeMainModal(): void {
    this.dialog.closeAll();
  }
}
