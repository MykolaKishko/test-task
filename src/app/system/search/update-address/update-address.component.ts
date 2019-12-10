import { Component, OnInit, Inject } from '@angular/core';
import { cityValidator, codeValidator } from '../../../shared/validators/validator';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Countries } from 'src/app/shared/models/countries';
import { Store } from '@ngxs/store';
import { EditUser, AddSelectedUser } from 'src/app/store/action/users.action';
import { GetCountries } from 'src/app/store/action/countries.action';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})

export class UpdateAddressComponent implements OnInit {

  addressForm: FormGroup;
  action = this.data.action;
  countries: Countries[];

  constructor(
    private store: Store,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getCountry();
    this.addressForm = new FormGroup({
      type: new FormControl(this.data.address.type),
      country: new FormControl( this.data.address.country,  [Validators.required]),
      city: new FormControl( this.data.address.city, [Validators.required, cityValidator]),
      code: new FormControl( this.data.address.code, [Validators.required, codeValidator]),
      id: new FormControl(this.data.address.id)
    });
  }

  closeAddressModal(): void {
    this.store.dispatch(new AddSelectedUser(this.data.selectedUser));
    this.dialog.closeAll();
  }
  editAddress(): void {
    this.data.users = this.data.users.filter(user => user.id !== this.data.selectedUser.id);
    this.data.selectedUser.address = this.data.selectedUser.address.filter( address => address.id !== this.data.address.id);
    this.data.selectedUser.address = [ ...this.data.selectedUser.address, ...this.addressForm.value ];
    this.data.users = [ ...this.data.users, ...this.data.selectedUser];
    this.store.dispatch(new EditUser(this.data.selectedUser));
    this.store.dispatch(new AddSelectedUser(this.data.selectedUser));
    this.dialog.closeAll();
  }
  removeAddress(): void {
    this.data.users = this.data.users.filter(user => user.id !== this.data.selectedUser.id);
    this.data.selectedUser.address = this.data.selectedUser.address.filter( address => address.id !== this.data.address.id);
    this.data.users = [...this.data.users, ...this.data.selectedUser];
    this.store.dispatch(new EditUser(this.data.selectedUser));
    this.store.dispatch(new AddSelectedUser(this.data.selectedUser));
    this.dialog.closeAll();
  }
  getCountry(): void {
    this.store.dispatch(new GetCountries());
    this.store.subscribe( res => this.countries = res.Countries.countries);
  }
}
