import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import {
  firstNameValidator,
  emailValidator,
  phoneNumberValidator,
  passwordValidator,
  lastNameValidator
} from '../../../shared/validators/validator';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-update-main',
  templateUrl: './update-main.component.html',
  styleUrls: ['./update-main.component.scss']
})

export class UpdateMainComponent implements OnInit {

  editForm: FormGroup;
  countries: any;
  mainInfo = this.globalService.mainInfo;
  action = this.data.action;

  constructor(
    private globalService: GlobalService,
    private authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateMainComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getCountry();
    this.editForm = this.formBuilder.group({
      firstName: new FormControl(this.data.user.firstName, [Validators.required, firstNameValidator]),
      lastName: new FormControl(this.data.user.lastName, [Validators.required,  lastNameValidator]),
      userName: new FormControl(this.data.user.userName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl(this.data.user.email, [Validators.required, emailValidator]),
      phone: new FormControl(this.data.user.phone, [Validators.required,  phoneNumberValidator]),
      password1: new FormControl(this.data.user.password, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(this.data.user.password, [Validators.required, Validators.minLength(5), passwordValidator])
    });
  }

  getCountry(): void {
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
        err => err
    );
  }
  editMain() {
    const form = this.editForm.value;
    this.mainInfo[0].forEach( (user, i) => {
      if (user.id === this.data.user.id) {
        const address = this.data.user.address;
        this.mainInfo[i] = form;
        this.mainInfo[i].address = address;
        const newUser = this.mainInfo[i];
        this.mainInfo.splice(i, 1);
        this.mainInfo.push(newUser);
        this.authService.editUser( this.data.user.id, this.mainInfo[i]);
      }
    });
    this.dialog.closeAll();
  }
  removeUser() {
    this.mainInfo[0].forEach((user, i: number) => {
      if (user.id === this.data.user.id) {
        this.mainInfo[0].splice(i, 1);
        this.authService.deleteUser(user.id).subscribe();
      }
    });
    this.dialog.closeAll();
  }
  closeMainModal() {
    this.dialog.closeAll();
  }
}
