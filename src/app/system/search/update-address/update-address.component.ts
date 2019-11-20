import { Component, OnInit, Inject } from '@angular/core';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { cityValidator, codeValidator } from '../../../shared/validators/validator';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RequestionService } from 'src/app/shared/services/requests.service';
import { Countries } from 'src/app/shared/models/countries';

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
    private countriesService: CountriesService,
    public dialog: MatDialog,
    private requestionService: RequestionService,
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

  closeAddressModal() {
    this.dialog.closeAll();
  }
  editAddress() {
    this.data.users = this.data.users.filter(user => user.id !== this.data.selectedUser.id);
    this.data.selectedUser.address = this.data.selectedUser.address.filter( address => address.id !== this.data.address.id);
    this.data.selectedUser.address = [ ...this.data.selectedUser.address, ...this.addressForm.value ];
    this.data.users = [ ...this.data.users, ...this.data.selectedUser.address];
    this.requestionService.updateUser( this.data.selectedUser.id, this.data.selectedUser );
    this.dialog.closeAll();
  }
  removeAddress() {
    this.data.users = this.data.users.filter(user => user.id !== this.data.selectedUser.id);
    this.data.selectedUser.address = this.data.selectedUser.address.filter( address => address.id !== this.data.address.id);
    this.data.users = [...this.data.users, ...this.data.selectedUser.address];
    this.requestionService.updateUser(this.data.selectedUser.id, this.data.selectedUser);
    this.dialog.closeAll();
  }
  getCountry(): void {
    this.countriesService.getCountries().subscribe(
      countries => this.countries = countries,
        err => err
    );
  }
}
