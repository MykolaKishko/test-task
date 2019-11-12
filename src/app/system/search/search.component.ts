import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalService } from 'src/app/global.service';
import { UpdateMainComponent } from './update-main/update-main.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { MatDialog, MatTable } from '@angular/material';
import { AskModalComponent } from './ask-modal/ask-modal.component';
import { Users } from 'src/app/users';
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
  form: FormGroup;
  editForm: FormGroup;
  firstForm: FormGroup;
  secondForm: FormGroup;


  countries: any;
  count = 0;
  addressCount = 0;

  deleteUser = this.globalService.deleteUser;
  deleteAddress = this.globalService.deleteAddress;

  currentAddr = this.globalService.currentAddr;
  currentUser = this.globalService.currentUser;
  currentValue = this.globalService.currentValue;
  element = this.globalService.element;
  mainInfo = this.globalService.mainInfo;
  addressInfo = this.globalService.addressInfo;

  constructor(
    private globalService: GlobalService,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService
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
  openMainModal(element: any) {
    event.stopPropagation();
    this.currentValue.shift();
    this.currentValue.push(element);
    this.dialog.open(UpdateMainComponent);
  }
  openAddressModal(element: any) {
    this.currentAddr.shift();
    this.currentAddr.push(element);
    this.currentValue.shift();
    this.currentValue.push(this.currentUser[0]);
    this.dialog.open(UpdateAddressComponent);
  }
  newAddressModal() {
    this.dialog.open(NewAddressModalComponent);
  }
  rowClick(elem: any) {
    this.addressInfo = this.mainInfo;
    this.currentUser.shift();
    this.currentUser.push(elem);
    if (this.addressCount === 0) {
      this.addressCount = 1;
    } else if (this.addressCount === 1) {
      this.addressCount = 0;
    }
  }
  openAskModal(element: any) {
    this.currentUser.shift();
    this.currentUser.push(element)
    event.stopPropagation();
    this.dialog.open(AskModalComponent);
    this.deleteUser.shift();
    this.deleteUser.push(true);
  }
  delAddressModal(element: any) {
    this.currentAddr.shift();
    this.currentAddr.push(element);
    event.stopPropagation();
    this.dialog.open(AskModalComponent);
    this.deleteAddress.shift();
    this.deleteAddress.push(true);
  }
  add(firstName: any, lastName: any, userName: any, email: any, phone: any, refresh: any, table: any, secondTable: any) {
    if (firstName !== '') {
      const searchUsers = [];
      this.count = 1;
      this.http.get('http://localhost:3000/users').subscribe( elem => {
        searchUsers.push(elem)
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
        searchUsers.push(elem)
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
        searchUsers.push(elem)
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
        searchUsers.push(elem)
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
        searchUsers.push(elem)
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


















































// add(firstName: any, lastName: any, userName: any, email: any, phone: any, refresh: any, table: any, secondTable: any) {

//   let search = [firstName, lastName, userName, email, phone];
//   let searchParam = [];
//   search.forEach((param, index) => {
//     if (param !== '') {
//       searchParam.push(param);
//     }
//   });
//   console.log(searchParam)
//   console.log(this.mainInfo)
//   searchParam.forEach((param, index) => {
//     if (this.mainInfo[0] === undefined) {
//       this.users.filter( user => {
//         if (user.firstName.includes(param)) {
//           this.mainInfo.push(user);
//           console.log(this.mainInfo);
//         }
//       });
//     }
//     // if (this.mainInfo[0] !== undefined) {
//     //   this.mainInfo.filter( e => {

//     //   });
//     // }
//     this.count = 1;
//   });
//   this.addressCount = 0;
//   this.table.renderRows();
// }