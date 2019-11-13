import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/shared/services/global.service';
import { UpdateMainComponent } from './update-main/update-main.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { MatDialog, MatTable } from '@angular/material';
import { Users, Address } from 'src/app/users';
import { NewAddressModalComponent } from './new-address-modal/new-address-modal.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  @ViewChild('table') table: MatTable<Users[]>;

  displayedColumns: string[] = ['first-name', 'last-name', 'user-name', 'phone', 'email', 'update', 'delete'];
  countries: any;
  count = 0;
  addressCount = 0;

  mainInfo = this.globalService.mainInfo;
  userAddresses: Address[];
  selectedUser: Users[] = this.globalService.selectedUser;

  constructor(
    private globalService: GlobalService,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.count = 1;
    this.addressCount = 0;
    this.getCountry();
    this.authService.getUsers().subscribe( res => {
      this.mainInfo.push(res);
    });
  }
  remove() {
    this.count = 0;
    this.addressCount = 0;
    this.mainInfo = [];
  }
  openMainModal( action: string, user: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(UpdateMainComponent, {
      data: {
        user,
        action
      }
    });
  }
  openAddressModal(action: string, address: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(UpdateAddressComponent, {
      data: {
        address,
        action
      }
    });
  }
  newAddressModal(action: string, address) {
    const dialogRef = this.dialog.open(NewAddressModalComponent, {
      data: {
        address,
        action
      }
    });
  }
  rowClick(user: any) {
    this.userAddresses = user.address;
    this.selectedUser.shift();
    this.selectedUser.push(user);
    if (this.addressCount === 0) {
      this.addressCount = 1;
    } else if (this.addressCount === 1) {
      this.addressCount = 0;
    }
  }
  add(firstName: any, lastName: any, userName: any, email: any, phone: any, refresh: any, table: any, secondTable: any) {
    if (firstName !== '') {
      const searchUsers = [];
      this.count = 1;
      this.http.get('http://localhost:3000/users').subscribe( elem => {
        searchUsers.push(elem);
        this.mainInfo[0] = [];
        searchUsers[0].filter( user => {
          if (user.firstName.toLowerCase().includes(firstName.toLowerCase())) {
            this.mainInfo[0].push(user);
          }
        });
      });
    }
    if (lastName !== '') {
      const searchUsers = [];
      this.count = 1;
      this.http.get('http://localhost:3000/users').subscribe( elem => {
        searchUsers.push(elem);
        this.mainInfo[0] = [];
        searchUsers[0].filter( user => {
          if (user.lastName.toLowerCase().includes(lastName.toLowerCase())) {
            this.mainInfo[0].push(user);
          }
        });
      });
    }
    if (userName !== '') {
      const searchUsers = [];
      this.count = 1;
      this.http.get('http://localhost:3000/users').subscribe( elem => {
        searchUsers.push(elem);
        this.mainInfo[0] = [];
        searchUsers[0].filter( user => {
          if (user.userName.toLowerCase().includes(userName.toLowerCase())) {
            this.mainInfo[0].push(user);
          }
        });
      });
    }
    if (email !== '') {
      const searchUsers = [];
      this.count = 1;
      this.http.get('http://localhost:3000/users').subscribe( elem => {
        searchUsers.push(elem);
        this.mainInfo[0] = [];
        searchUsers[0].filter( user => {
          if (user.email.toLowerCase().includes(email.toLowerCase())) {
            this.mainInfo[0].push(user);
          }
        });
      });
    }
    if (phone !== '') {
      const searchUsers = [];
      this.count = 1;
      this.http.get('http://localhost:3000/users').subscribe( elem => {
        searchUsers.push(elem);
        this.mainInfo[0] = [];
        searchUsers[0].filter( user => {
          if (user.phone.toLowerCase().includes(phone.toLowerCase())) {
            this.mainInfo[0].push(user);
          }
        });
      });
    }
    this.addressCount = 0;
  }
  getCountry(): void {
    this.globalService.getCountries().subscribe(
      countries => this.countries = countries,
      err => err
    );
  }
}






























 // this.count = 1;
    // const param = [firstName, lastName, userName, email, phone];
    // const search = [];
    // param.forEach( parametr => {
    //   if (parametr !== '') {
    //     search.push(parametr);
    //   }
    // });

    // this.allUsers = this.mainInfo[0];

    // let filterUsers = [];
    // search.forEach( param => {
    //     if (filterUsers === []) {
    //       this.allUsers.forEach( user => {
    //         if (user.firstName.toLowerCase().includes(firstName.toLowerCase())) {
    //           this.mainInfo[0].push(user);
    //         }
    //       });
    //     }
    // });































































































































































































































