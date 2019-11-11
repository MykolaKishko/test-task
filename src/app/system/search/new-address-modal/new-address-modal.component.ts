import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { cityValidator, codeValidator } from '../../../shared/validators/validator';
import { GlobalService } from 'src/app/global.service';
import { MatDialog } from '@angular/material';
import { AskModalComponent } from '../ask-modal/ask-modal.component';

@Component({
  selector: 'app-new-address-modal',
  templateUrl: './new-address-modal.component.html',
  styleUrls: ['./new-address-modal.component.scss']
})

export class NewAddressModalComponent implements OnInit {

  secondForm: FormGroup;
  countries: any;
  addNewAddress = this.globalService.addNewAddress;
  secondFormValue = this.globalService.secondFormValue;

  constructor( private globalService: GlobalService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getCountry();
    this.secondForm = new FormGroup({
      select: new FormControl('', [Validators.required]),
      country: new FormControl('',  [Validators.required]),
      city: new FormControl('', [Validators.required, cityValidator]),
      code: new FormControl('', [Validators.required, codeValidator])
    });
  }

  getCountry(): void {
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
        err => err
    );
  }
  openAskModal() {
    this.addNewAddress.shift();
    this.addNewAddress.push(true);
    this.secondFormValue.shift();
    this.secondFormValue.push(this.secondForm.value);
    this.dialog.open(AskModalComponent);
  }
}
