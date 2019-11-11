import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { cityValidator, codeValidator } from '../../../shared/validators/validator';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AskModalComponent } from '../ask-modal/ask-modal.component';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})

export class UpdateAddressComponent implements OnInit {

  constructor( private globalService: GlobalService, public dialog: MatDialog) { }

  firstForm: FormGroup;
  currentValue = this.globalService.currentValue;
  currentAddr = this.globalService.currentAddr;
  countries: any;
  users = this.globalService.users;
  addressInfo = this.globalService.addressInfo;
  mainInfo = this.globalService.mainInfo;
  firstFormValue = this.globalService.firstFormValue;
  editAddress = this.globalService.editAddress;

  ngOnInit() {
    this.getCountry();
    this.firstForm = new FormGroup({
      country: new FormControl( this.currentAddr[0].country,  [Validators.required]),
      city: new FormControl( this.currentAddr[0].city, [Validators.required, cityValidator]),
      code: new FormControl( this.currentAddr[0].code, [Validators.required, codeValidator])
    });
  }
  closeAddrModal() {
    this.dialog.closeAll();
  }
  openAskModal() {
    this.dialog.open(AskModalComponent);
    this.firstFormValue.shift();
    this.firstFormValue.push(this.firstForm.value);
    this.editAddress.shift();
    this.editAddress.push(true);
  }
  getCountry(): void {
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
        err => err
    );
  }
}
