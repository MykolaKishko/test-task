import { Component, OnInit, Inject } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { cityValidator, codeValidator } from '../../../shared/validators/validator';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})

export class UpdateAddressComponent implements OnInit {

  firstForm: FormGroup;
  action = this.data.action;
  countries: any;
  mainInfo = this.globalService.mainInfo;
  selectedUser = this.globalService.selectedUser;

  constructor(
    private globalService: GlobalService,
    public dialog: MatDialog,
    private authService: AuthService,
    public dialogRef: MatDialogRef<UpdateAddressComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getCountry();
    this.firstForm = this.formBuilder.group({
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
    // this.userAddresses[0].forEach( (user, index) => {
    this.mainInfo[0].forEach( (user, index) => {
      if (user.id === this.selectedUser[0].id) {
        user.address.forEach( (addr, i) => {
          if (addr.id === this.data.address.id) {
            user.address[i] = form;
            const newAddress = user.address[i];
            user.address.splice(i, 1);
            user.address.push(newAddress);
            this.authService.editAddress(user.id, user);
          }
        });
      }
    });
    this.dialog.closeAll();
  }
  removeAddress() {
    this.mainInfo[0].forEach(user => {
      if (user.id === this.selectedUser[0].id) {
        user.address.forEach(( addr, i ) => {
          if (addr.id === this.data.address.id) {
            user.address.splice(i, 1);
            this.authService.deleteAddress(user.id, user);
          }
        });
      }
    });
    this.dialog.closeAll();
  }
  getCountry(): void {
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
        err => err
    );
  }
}
