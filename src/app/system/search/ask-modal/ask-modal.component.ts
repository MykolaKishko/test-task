import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ask-modal',
  templateUrl: './ask-modal.component.html',
  styleUrls: ['./ask-modal.component.scss']
})
export class AskModalComponent implements OnInit {

  users = this.globalService.users;
  currentAddr = this.globalService.currentAddr;
  currentValue = this.globalService.currentValue;
  currentUser = this.globalService.currentUser;
  firstFormValue = this.globalService.firstFormValue;
  secondFormValue = this.globalService.secondFormValue;
  editFormValue = this.globalService.editFormValue;
  editAddress = this.globalService.editAddress;
  editUser = this.globalService.editUser;
  deleteAddress = this.globalService.deleteAddress;
  deleteUser = this.globalService.deleteUser;
  addNewAddress = this.globalService.addNewAddress;
  mainInfo = this.globalService.mainInfo;

  constructor(
    private globalService: GlobalService,
    public dialog: MatDialog,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  updateAddr() {
    const form = this.currentAddr[0];
    this.mainInfo.forEach( (user, index) => {
      if (this.currentValue[0].firstName === user.firstName) {
        this.mainInfo[index].address.forEach( key => {
          if (key.id === form.id) {
            key.type = form.type;
            key.country = form.country;
            key.city =  form.city;
            key.code = form.code;
          }
        });
      }
    });
    this.dialog.closeAll();
    this.editAddress.shift();
  }
  editMain() {
    const form = this.editFormValue;
    this.mainInfo[0].forEach( (user, i) => {
      if (user.id === this.currentValue[0].id) {
        const address = this.currentValue[0].address;
        this.mainInfo[i] = form[0];
        this.mainInfo[i].address = address;
        this.authService.editUser( user.id, this.mainInfo[i]);
      }
    });
    this.dialog.closeAll();
    this.editUser.shift();
  }
  removeUser() {
    this.mainInfo[0].forEach((user, i: number) => {
      if (user.id === this.currentUser[0].id) {
        this.mainInfo[0].splice(i, 1);
        this.authService.deleteUser(this.currentUser[0].id).subscribe();
      }
    });
    this.dialog.closeAll();
    this.deleteUser.shift();
  }
  removeAddress() {
    this.mainInfo[0].forEach((user, index) => {
      if (user.id === this.currentUser[0].id ) {
        this.currentUser[0].address.forEach(( key, i ) => {
          if (key.id === this.currentAddr[0].id) {
            user.address.splice(i, 1);
            this.authService.deleteAddress(this.currentUser[0].id, key.id );
          }
        });
      }
    });
    this.dialog.closeAll();
    this.deleteAddress.shift();
  }
  addNewAddr() {
    const obj = {
      type: '',
      country: this.secondFormValue[0].country,
      city: this.secondFormValue[0].city,
      code: this.secondFormValue[0].code,
      id: this.currentUser[0].address.length + 1
    };
    if (this.secondFormValue[0].select === 'hAddress') {
      obj.type = 'Home address';
    }
    if (this.secondFormValue[0].select === 'sAddress') {
      obj.type = 'Shipping address';
    }
    if (this.secondFormValue[0].select === 'bAddress') {
      obj.type = 'Billing address';
    }
    this.mainInfo[0].forEach((user, i) => {
      if (user.id === this.currentUser[0].id) {
        user.address.push(obj);
        this.authService.addAddress(user.id, obj);

                ////////////////////////////////
                ///// console.log(user); /////
                ////////////////////////////////
      }
    });
    this.dialog.closeAll();
    this.addNewAddress.shift();
  }
}
