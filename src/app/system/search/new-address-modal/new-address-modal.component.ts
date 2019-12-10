import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { cityValidator, codeValidator } from '../../../shared/validators/validator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Countries } from 'src/app/shared/models/countries';
import { Store } from '@ngxs/store';
import { EditUser, AddSelectedUser } from 'src/app/store/action/users.action';
import { GetCountries } from 'src/app/store/action/countries.action';

@Component({
  selector: 'app-new-address-modal',
  templateUrl: './new-address-modal.component.html',
  styleUrls: ['./new-address-modal.component.scss']
})

export class NewAddressModalComponent implements OnInit {

  addressForm: FormGroup;
  countries: Countries[];
  action = this.data;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewAddressModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getCountry();
    this.addressForm = this.formBuilder.group({
      type: new FormControl('', [Validators.required]),
      country: new FormControl('',  [Validators.required]),
      city: new FormControl('', [Validators.required, cityValidator]),
      code: new FormControl('', [Validators.required, codeValidator])
    });
  }

  addNewAddress(): void {
    this.addressForm.value.id = this.data.selectedUser.address.length + 1;
    this.data.users = this.data.users.map( user => {
      if (user.id === this.data.selectedUser.id) {
        user.address = [ ...user.address, ...this.addressForm.value ];
        this.store.dispatch(new EditUser(user));
        this.store.dispatch(new AddSelectedUser(user));
      }
    });
    this.dialog.closeAll();
  }
  getCountry(): void {
    this.store.dispatch(new GetCountries());
    this.store.subscribe( res => this.countries = res.Countries.countries);
  }
}
