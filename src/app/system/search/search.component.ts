import { Component, OnInit, ViewChild } from '@angular/core';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { UpdateMainComponent } from './update-main/update-main.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { MatDialog, MatTable } from '@angular/material';
import { Users, Address } from 'src/app/shared/models/users';
import { NewAddressModalComponent } from './new-address-modal/new-address-modal.component';
import { FormGroup, FormControl } from '@angular/forms';
import { RequestionService } from 'src/app/shared/services/requests.service';
import { Countries } from 'src/app/shared/models/countries';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('table') table: MatTable<Users[]>;

  displayedColumns: string[] = ['first-name', 'last-name', 'user-name', 'phone', 'email', 'update', 'delete'];
  searchForm: FormGroup;
  countries: Countries[];
  mainInfoBlock = true;
  addressInfoBlock = false;
  userAddresses: Address[];
  selectedUser: Users[];
  mainInfo = [];
  searchUsers = null;

  constructor(
    private countriesService: CountriesService,
    public dialog: MatDialog,
    private requestionService: RequestionService
  ) {}

  ngOnInit() {
    this.addressInfoBlock = false;
    this.getCountry();
    this.requestionService.getUsers().subscribe(res => {
      this.mainInfo = [...this.mainInfo, ...res];
    });
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('')
    });
  }

  openMainModal(action: string, user: Users) {
    const users = this.mainInfo;
    this.dialog.open(UpdateMainComponent, {
      data: { user, action, users }
    });
  }
  openAddressModal(action: string, address: Address) {
    const users = this.mainInfo;
    const selectedUser = this.selectedUser;
    this.dialog.open(UpdateAddressComponent, {
      data: { address, action, users, selectedUser }
    });
  }
  newAddressModal(action: string, address: Address) {
    const users = this.mainInfo;
    const selectedUser = this.selectedUser;
    this.dialog.open(NewAddressModalComponent, {
      data: { address, action, users, selectedUser }
    });
  }
  rowClick(user) {
    this.userAddresses = user.address;
    this.selectedUser = user;
    this.addressInfoBlock = true;
  }
  search() {
    this.mainInfo = [];
    this.requestionService.getUsers().subscribe(users => {
      users.map(user => {
        for (const key in this.searchForm.value) {
          if (this.searchForm.value[key] !== '' && user[key].includes(this.searchForm.value[key])) {
            this.mainInfo = [...this.mainInfo, user];
          }
        }
      });
    });
    this.addressInfoBlock = false;
    this.mainInfoBlock = true;
  }
  clear() {
    this.mainInfoBlock = false;
    this.addressInfoBlock = false;
    this.mainInfo = [];
  }
  getCountry(): void {
    this.countriesService.getCountries().subscribe(
      countries => (this.countries = countries),
      err => err
    );
  }
}
