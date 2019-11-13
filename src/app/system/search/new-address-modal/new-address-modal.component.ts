import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { cityValidator, codeValidator } from '../../../shared/validators/validator';
import { GlobalService } from 'src/app/shared/services/global.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-new-address-modal',
  templateUrl: './new-address-modal.component.html',
  styleUrls: ['./new-address-modal.component.scss']
})

export class NewAddressModalComponent implements OnInit {

  secondForm: FormGroup;
  countries: any;
  action = this.data;
  selectedUser = this.globalService.selectedUser;
  mainInfo = this.globalService.mainInfo;

  constructor(
    private globalService: GlobalService,
    public dialog: MatDialog,
    private authService: AuthService,
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
      code: new FormControl('', [Validators.required, codeValidator])
    });
  }

  addNewAddr() {
    const form = this.secondForm.value;
    const obj = {
      type: '',
      country: form.country,
      city: form.city,
      code: form.code,
      id: this.selectedUser[0].address.length + 1
    };
    if (form.select === 'hAddress') {
      obj.type = 'Home address';
    }
    if (form.select === 'sAddress') {
      obj.type = 'Shipping address';
    }
    if (form.select === 'bAddress') {
      obj.type = 'Billing address';
    }
    this.mainInfo[0].forEach((user, i) => {
      if (user.id === this.selectedUser[0].id) {
        user.address.push(obj);
        this.authService.addAddress(user.id, user);
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
