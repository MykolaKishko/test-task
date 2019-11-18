import { Component, OnInit, Inject } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/countries.service';
import { cityValidator, codeValidator } from '../../../shared/validators/validator';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QueriesService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})

export class UpdateAddressComponent implements OnInit {

  firstForm: FormGroup;
  action = this.data.action;
  countries: any;

  constructor(
    private globalService: GlobalService,
    public dialog: MatDialog,
    private queriesService: QueriesService,
    public dialogRef: MatDialogRef<UpdateAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getCountry();
    this.firstForm = new FormGroup({
      type: new FormControl(this.data.address.type),
      country: new FormControl( this.data.address.country,  [Validators.required]),
      city: new FormControl( this.data.address.city, [Validators.required, cityValidator]),
      code: new FormControl( this.data.address.code, [Validators.required, codeValidator]),
      id: new FormControl(this.data.address.id)
    });
  }

  closeAddrModal() {
    this.dialog.closeAll();
  }
  editAddress() {
    const form = this.firstForm.value;
    const selectedUser = this.data.selectedUser;
    this.data.users = this.data.users.filter(user => user.id !== selectedUser.id);
    selectedUser.address = selectedUser.address.filter( address => address.id !== this.data.address.id);
    selectedUser.address = [ ...selectedUser.address, ...form ];
    this.data.users = [ ...this.data.users, ...selectedUser.address];
    this.queriesService.editAddress( selectedUser.id, selectedUser );
    this.dialog.closeAll();
  }
  removeAddress() {
    const selectedUser = this.data.selectedUser;
    this.data.users = this.data.users.filter(user => user.id !== selectedUser.id);
    selectedUser.address = selectedUser.address.filter( address => address.id !== this.data.address.id);
    this.data.users = [ ...this.data.users, ...selectedUser.address];
    this.queriesService.deleteAddress(selectedUser.id, selectedUser);
    this.dialog.closeAll();
  }
  getCountry(): void {
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
        err => err
    );
  }
}
