import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { cityValidator, codeValidator } from '../../../shared/validators/validator';
import { GlobalService } from 'src/app/shared/services/countries.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QueriesService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-new-address-modal',
  templateUrl: './new-address-modal.component.html',
  styleUrls: ['./new-address-modal.component.scss']
})

export class NewAddressModalComponent implements OnInit {

  secondForm: FormGroup;
  countries: any;
  action = this.data;

  constructor(
    private globalService: GlobalService,
    public dialog: MatDialog,
    private queriesService: QueriesService,
    public dialogRef: MatDialogRef<NewAddressModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getCountry();
    this.secondForm = this.formBuilder.group({
      select: new FormControl('', [Validators.required]),
      country: new FormControl('',  [Validators.required]),
      city: new FormControl('', [Validators.required, cityValidator]),
      code: new FormControl('', [Validators.required, codeValidator]),
      type: new FormControl('')
    });
  }

  addNewAddr() {
    const form = this.secondForm.value;
    const newAddress = form;
    newAddress.id = this.data.selectedUser.address.length + 1;
    if (form.select === 'hAddress') {
      newAddress.type = 'Home address';
    }
    if (form.select === 'sAddress') {
      newAddress.type = 'Shipping address';
    }
    if (form.select === 'bAddress') {
      newAddress.type = 'Billing address';
    }
    this.data.users = this.data.users.map( user => {
      if (user.id === this.data.selectedUser.id) {
        user.address = [ ...user.address, ...newAddress ];
        this.queriesService.addAddress(this.data.selectedUser.id, user);
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
