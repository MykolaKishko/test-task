import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalService } from 'src/app/global.service';
import { UpdateMainComponent } from './update-main/update-main.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { MatDialog, MatTable } from '@angular/material';
import { AskModalComponent } from './ask-modal/ask-modal.component';
import { Users } from 'src/app/users';
import { NewAddressModalComponent } from './new-address-modal/new-address-modal.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})



export class SearchComponent implements OnInit {

   obj = {
    firstName: 'admin',
    lastName: 'admin',
    userName: 'admin',
    phone: '0505934900',
    email: 'mykola221@gmail.com',
    password: '000000',
    address: [
      {
        type: 'Home address',
        country: 'Ukraine',
        city: 'Lviv',
        code: 45654,
        id: 1
      },
      {
        type: 'Shipping address',
        country: 'Ukraine',
        city: 'Lviv',
        code: 45654,
        id: 2
      },
      {
        type: 'Billing address',
        country: 'Ukraine',
        city: 'Herson',
        code: 45654,
        id: 3
      }
    ]
  };

  x: any;


  ussers: any;
  arr: any;

  @ViewChild('table') table: MatTable<Users[]>;

  displayedColumns: string[] = ['first-name', 'last-name', 'user-name', 'phone', 'email', 'update', 'delete'];
  form: FormGroup;
  editForm: FormGroup;
  firstForm: FormGroup;
  secondForm: FormGroup;

  response: any;

  users = this.globalService.users;
  firstNameSearch = '';
  lastNameSearch = '';
  userNameSearch = '';
  phoneSearch = '';
  emailSearch = '';
  countries: any;
  count = 0;
  addressCount = 0;

  deleteUser = this.globalService.deleteUser;
  deleteAddress = this.globalService.deleteAddress;

  currentAddr = this.globalService.currentAddr;
  currentUser = this.globalService.currentUser;
  address = this.globalService.address;
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
      this.users.push(res);
      this.mainInfo.push(res);
    });
  }



  remove() {
    this.count = 0;
    this.addressCount = 0;
    this.mainInfo = [];
  }

  // remove() {

    ///////////////  GET USER   ////////////////

    // this.http.get('http://localhost:5000/app/main').subscribe( users => {
    //   this.ussers = users;
    //   if (!!this.ussers) {
    //     console.log(this.ussers);
    //   }
    // });

    //   this.http.delete('http://localhost:3000/users/1').subscribe( users => {
    //   this.ussers = users;
    //   if (!!this.ussers) {
    //     console.log(this.ussers);
    //   }
    // });

      // const obj1 = {
      //   firstName: 'admin',
      //   lastName: 'admin',
      //   userName: 'admin',
      //   phone: '0505934900',
      //   email: 'mykola221@gmail.com',
      //   password: '000000',
      //   address: [
      //     {
      //       type: 'Home address',
      //       country: 'Ukraine',
      //       city: 'Lviv',
      //       code: 45654,
      //       id: 1
      //     },
      //     {
      //       type: 'Shipping address',
      //       country: 'Ukraine',
      //       city: 'Lviv',
      //       code: 45654,
      //       id: 2
      //     },
      //     {
      //       type: 'Billing address',
      //       country: 'Ukraine',
      //       city: 'Herson',
      //       code: 45654,
      //       id: 3
      //     }
      //   ]
      // };
    //   this.http.post( 'http://localhost:3000/users', obj ).subscribe( users => {
    //   this.ussers = users;
    //   console.log(this.ussers);
    // });


      // this.authService.addNewUser(obj).subscribe( user => {
      //   const users = user;
      //   console.log(users);
      // });



    //////////////   ADD USER   ////////////////////

    // const obj = {
    //   firstName: 'adminq',
    //   lastName: 'admin',
    //   userName: 'admin',
    //   phone: '4568745210',
    //   email: 'ac672169@gmail.com',
    //   password: '000000',
    //   address: [
    //     {
    //       id: 2,
    //       addressType: 'Home address',
    //       country: 'Ukraine',
    //       city: 'Lviv',
    //       code: 44456
    //     }
    //   ]
    // };
    // this.http.post( 'http://localhost:5000/app/users', obj ).subscribe( users => {
    //   this.ussers = users;
    //   console.log(this.ussers);
    // });

    /////////////// EDIT USER //////////////////////

    // const obj = {
    //   firstName: 'adminn',
    //   lastName: 'admin',
    //   userName: 'admin',
    //   phone: '4568745210',
    //   email: 'ac672169@gmail.com',
    //   password: '000000',
    //   address: [
    //     {
    //       id: 10,
    //       addressType: 'Home address',
    //       country: 'Ukraine',
    //       city: 'Lviv',
    //       code: 44456
    //     }
    //   ]
    // };
    // this.http.put( 'http://localhost:5000/app/update/5dc9194a7326452104a1a1b7', obj ).subscribe( users => {
    //   this.ussers = users;
    //   console.log(this.ussers);
    // });


    ///////////////// ADD ADDRESS /////////////////////

    // const obj = {
    //   addressType: 'Home address',
    //   country: 'Ukraine',
    //   city: 'Lviv',
    //   code: 44456,
    //   id: 2
    // };
    // this.http.put( 'http://localhost:5000/app/add-address/5dc9194a7326452104a1a1b7', obj ).subscribe( users => {
    //   this.ussers = users;
    //   console.log(this.ussers);
    // });


    ///////////////   DELETE USER   /////////////////

    // this.http.delete('http://localhost:3000/users/3').subscribe( users => {
    // this.ussers = users;
    // if (!!this.ussers) {
    //   console.log(this.ussers);
    //   }
    // });



    //////////////////////////////// DELETE USER /////////////////////////

    // this.authService.deleteUser(2).subscribe( users => {
    //   let user = users;
    //   if (!!user) {
    //     console.log(user);
    //   }
    // });

    ///////////////////////////// ADD USER //////////////////////////////

      // this.authService.addNewUser(obj).subscribe( user => {
      //   const users = user;
      //   console.log(users);
      // });

      ////////////////////////////    delete ADDRESS   //////////////////////////
      // let addr = {
      //   type: 'vvkhk',
      //   id: 20,
      //   country: 'kbligivu',
      //   city: 'Gkljbkl',
      //   code:  88888
      // };

      // this.authService.editAddress(1, 1, addr);
// }

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
addNewAddress() {
    const obj = {
      type: '',
      country: this.secondForm.controls.country.value,
      city: this.secondForm.controls.city.value,
      code: this.secondForm.controls.code.value,
      id: this.mainInfo[0].address.length + 1
    };
    if (this.secondForm.valid) {
      if (this.secondForm.controls.select.value === 'hAddress') {
        obj.type = 'Home address';
      }
      if (this.secondForm.controls.select.value === 'sAddress') {
        obj.type = 'Shipping address';
      }
      if (this.secondForm.controls.select.value === 'bAddress') {
        obj.type = 'Billing address';
      }
    }
    this.users.forEach((user, i) => {
      if (user.userName === this.mainInfo[0].userName) {
        this.users[i].address.push(obj);
      }
    });
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
    if (this.firstNameSearch !== '') {
      this.mainInfo = [];
      this.count = 1;
      this.users.filter( user => {
        if (user.firstName.toLowerCase().includes(this.firstNameSearch.toLowerCase())) {
          this.mainInfo.push(user);
          this.table.renderRows();
        }
      });
    }
    if (this.lastNameSearch !== '') {
      this.mainInfo = [];
      this.count = 1;
      this.users.filter( user => {
        if (user.lastName.toLowerCase().includes(this.lastNameSearch.toLowerCase())) {
          this.mainInfo.push(user);
          this.table.renderRows();
        }
      });
    }
    if (this.userNameSearch !== '') {
      this.mainInfo = [];
      this.count = 1;
      this.users.filter( user => {
        if (user.userName.toLowerCase().includes(this.userNameSearch.toLowerCase())) {
          this.mainInfo.push(user);
          this.table.renderRows();
        }
      });
    }
    if (this.emailSearch !== '') {
      this.mainInfo = [];
      this.count = 1;
      this.users.filter( user => {
        if (user.email.toLowerCase().includes(this.emailSearch.toLowerCase())) {
          this.mainInfo.push(user);
          this.table.renderRows();
        }
      });
    }
    if (this.phoneSearch !== '') {
      this.mainInfo = [];
      this.count = 1;
      this.users.filter( user => {
        if (user.phone.toLowerCase().includes(this.phoneSearch.toLowerCase())) {
          this.mainInfo.push(user);
          this.table.renderRows();
        }
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