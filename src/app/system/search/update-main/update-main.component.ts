import { Component, OnInit, Inject } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/countries.service';
import {
  firstNameValidator,
  emailValidator,
  phoneNumberValidator,
  passwordValidator,
  lastNameValidator
} from '../../../shared/validators/validator';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QueriesService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-update-main',
  templateUrl: './update-main.component.html',
  styleUrls: ['./update-main.component.scss']
})

export class UpdateMainComponent implements OnInit {

  editForm: FormGroup;
  countries: any;
  action = this.data.action;

  constructor(
    private globalService: GlobalService,
    private queriesService: QueriesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateMainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getCountry();
    this.editForm = new FormGroup({
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
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
      err => err
    );
  }
  editMain() {
    const addr = this.data.user.address;
    this.data.users = this.data.users.filter(user => user.id !== this.data.user.id);
    const editUser = this.editForm.value;
    editUser.address = [...addr];
    this.data.users = [ ...this.data.users, ...editUser];
    this.queriesService.editUser( this.data.user.id, editUser);
    this.dialog.closeAll();
  }
  removeUser() {
    this.data.users = this.data.users.filter(user => user.id !== this.data.user.id);
    this.queriesService.deleteUser(this.data.user.id).subscribe();
    this.dialog.closeAll();
  }
  closeMainModal() {
    this.dialog.closeAll();
  }
}
