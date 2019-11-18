import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/countries.service';
import { UpdateMainComponent } from './update-main/update-main.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { MatDialog, MatTable } from '@angular/material';
import { Users, Address } from 'src/app/shared/models/users';
import { NewAddressModalComponent } from './new-address-modal/new-address-modal.component';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { QueriesService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  @ViewChild('table') table: MatTable<Users[]>;

  displayedColumns: string[] = ['first-name', 'last-name', 'user-name', 'phone', 'email', 'update', 'delete'];
  countries: any;
  mainCount = true;
  addressCount = false;
  searchForm: FormGroup;
  userAddresses: Address[];
  selectedUser: Users[];
  mainInfo = [];
  searchUsers = null;

  constructor(
    private globalService: GlobalService,
    public dialog: MatDialog,
    private http: HttpClient,
    private queriesService: QueriesService,
  ) {}

  ngOnInit() {
    this.addressCount = false;
    this.getCountry();
    this.queriesService.getUsers().subscribe( res => {
      const response: any = res;
      this.mainInfo = [...this.mainInfo, ...response];
    });
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('')
    });
  }

  openMainModal( action: string, user: Users) {
    const users = this.mainInfo;
    const selectedUser = this.selectedUser;
    const dialogRef = this.dialog.open(UpdateMainComponent, {
      data: { user, action, users, selectedUser }
    });
  }
  openAddressModal(action: string, address: Address) {
    const users = this.mainInfo;
    const selectedUser = this.selectedUser;
    const dialogRef = this.dialog.open(UpdateAddressComponent, {
      data: { address, action, users, selectedUser }
    });
  }
  newAddressModal(action: string, address: Address) {
    const users = this.mainInfo;
    const selectedUser = this.selectedUser;
    const dialogRef = this.dialog.open(NewAddressModalComponent, {
      data: { address, action, users, selectedUser }
    });
  }
  rowClick(user) {
    this.userAddresses = user.address;
    this.selectedUser = user;
    if (this.addressCount === false) {
      this.addressCount = true;
    } else if (this.addressCount === true) {
      this.addressCount = false;
    }
  }
  search() {
    const form = this.searchForm.value;
    if (form.firstName !== '') {
      this.mainCount = true;
      this.http.get('http://localhost:3000/users').subscribe( users => {
        this.searchUsers = users;
        this.mainInfo = [];
        this.searchUsers = this.searchUsers.filter( user => {
          if (user.firstName.includes(form.firstName)) {
            this.mainInfo = [ ...this.mainInfo, ...user ];
          }
        });
      });
    }

    if (form.lastName !== '') {
      this.mainCount = true;
      this.http.get('http://localhost:3000/users').subscribe( users => {
        this.searchUsers = users;
        this.mainInfo = [];
        this.searchUsers = this.searchUsers.filter( user => {
          if (user.lastName.includes(form.lastName)) {
            this.mainInfo = [ ...this.mainInfo, ...user ];
          }
        });
      });
    }
    if (form.userName !== '') {
      this.mainCount = true;
      this.http.get('http://localhost:3000/users').subscribe( users => {
        this.searchUsers = users;
        this.mainInfo = [];
        this.searchUsers = this.searchUsers.filter( user => {
          if (user.userName.includes(form.userName)) {
            this.mainInfo = [ ...this.mainInfo, ...user ];
          }
        });
      });
    }
    if (form.email !== '') {
      this.mainCount = true;
      this.http.get('http://localhost:3000/users').subscribe( users => {
        this.searchUsers = users;
        this.mainInfo = [];
        this.searchUsers = this.searchUsers.filter( user => {
          if (user.email.includes(form.email)) {
            this.mainInfo = [ ...this.mainInfo, ...user ];
          }
        });
      });
    }
    if (form.phone !== '') {
      this.mainCount = true;
      this.http.get('http://localhost:3000/users').subscribe( users => {
        this.searchUsers = users;
        this.mainInfo = [];
        this.searchUsers = this.searchUsers.filter( user => {
          if (user.phone.includes(form.phone)) {
            this.mainInfo = [ ...this.mainInfo, ...user ];
          }
        });
      });
    }
    this.addressCount = false;
  }
  clear() {
    this.mainCount = false;
    this.addressCount = false;
    this.mainInfo = [];
  
    this.searchForm.value.firstName = '';
    this.searchForm.value.lastName = '';
    this.searchForm.value.userName = '';
    this.searchForm.value.email = '';
    this.searchForm.value.phone = '';

  }
  getCountry(): void {
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
      err => err
    );
  }
}



























































































































































































































