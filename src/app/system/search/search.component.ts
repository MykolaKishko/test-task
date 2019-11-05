import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router';
import {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  phoneNumberValidator,
  passwordValidator,
  cityValidator,
  codeValidator
} from '../create-user/validator';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['first-name', 'last-name', 'user-name', 'phone', 'email', 'update', 'delete'];
  form: FormGroup;
  editForm: FormGroup;
  firstForm: FormGroup;
  secondForm: FormGroup;

  users = this.globalService.users;
  firstNameSearch = '';
  lastNameSearch = '';
  userNameSearch = '';
  phoneSearch = '';
  emailSearch = '';

  count = 0;
  addressCount = 0;
  modal = false;
  mainModal = false;
  addrModal = false;
  countries: any;
  element: any;
  mainInfo = [];
  addressInfo = [];
  currentAddr: any;
  address: any;
  del = false;
  editUser = false;
  editAddr = false;
  removeUser = false;
  removeAddr = false;
  firstF = false;
  secondF = false;
  addNewAddr = false;
  currentValue = [];

  constructor(
      private globalService: GlobalService,
      private router: Router,

    ) { }

  ngOnInit() {
    this.modal = false;
    this.count = 0;
    this.addressCount = 0;
    this.getCountry();

    this.secondForm = new FormGroup({
      select: new FormControl('', [Validators.required]),
      country: new FormControl('',  [Validators.required]),
      city: new FormControl('', [Validators.required, cityValidator]),
      code: new FormControl('', [Validators.required, codeValidator])
    });
  }
  rowClick(elem: any) {
    this.addressInfo = this.mainInfo;
    if (this.addressCount === 0) {
      this.addressCount = 1;
    } else if (this.addressCount === 1) {
      this.addressCount = 0;
    }
  }
  close() {
    this.modal = !this.modal;
  }
  closeAddrModal() {
    this.modal = false;
    this.addrModal = false;
  }
  closeDelModal() {
    this.del = false;
    this.removeUser = false;
    this.editAddr = false;
  }
  cancel() {
    this.modal = false;
    this.mainModal = false;
  }
  editMainModal() {
    this.del = true;
    this.editUser = true;
  }
  save() {
    this.users.forEach((el, i) => {
      if (el.firstName === this.element.firstName) {
        el.firstName = this.editForm.controls.firstName.value;
        el.lastName = this.editForm.controls.lastName.value;
        el.userName = this.editForm.controls.userName.value;
        el.email = this.editForm.controls.email.value;
        el.phone = this.editForm.controls.phone.value;
      }
    });
    this.modal = false;
    this.mainModal = false;
    this.del = false;
    this.editUser = false;
  }
  open(element: any) {
    event.stopPropagation();
    this.currentValue.shift();
    this.currentValue.push(this.mainInfo[0]);
    console.log(this.currentValue)
    this.modal = true;
    this.element = element;
    this.mainModal = true;
    this.editForm = new FormGroup({
      firstName: new FormControl(this.currentValue[0].firstName, [Validators.required, firstNameValidator]),
      lastName: new FormControl(this.currentValue[0].lastName, [Validators.required,  lastNameValidator]),
      userName: new FormControl(this.currentValue[0].userName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl(this.currentValue[0].email, [Validators.required, emailValidator]),
      phone: new FormControl(this.currentValue[0].phone, [Validators.required,  phoneNumberValidator]),
      password1: new FormControl(this.currentValue[0].password, [Validators.required, Validators.minLength(5)]),
      password2: new FormControl(this.currentValue[0].password, [Validators.required, Validators.minLength(5), passwordValidator])
    });
  }
  openAddr(element: any){
    this.modal = true;
    this.addrModal = true;
    this.currentAddr = element;
    this.firstF = true;
    this.secondF = false;
    this.firstForm = new FormGroup({
      country: new FormControl( this.currentAddr.country,  [Validators.required]),
      city: new FormControl( this.currentAddr.city, [Validators.required, cityValidator]),
      code: new FormControl( this.currentAddr.code, [Validators.required, codeValidator])
    });
  }
  openNewAddr() {
    this.modal = true;
    this.addrModal = true;
    this.secondF = true;
    this.firstF = false;
  }
  ask() {
    this.addNewAddr = true;
    this.del = true;
  }
  addNewAddress() {
    let newUser = [{
      address: []
    }];
    var obj;
    if (this.secondForm.valid) {
      if (this.secondForm.controls.select.value === 'hAddress') {
        obj = {
          type: 'Home address',
          country: this.secondForm.controls.country.value,
          city: this.secondForm.controls.city.value,
          code: this.secondForm.controls.code.value,
          id: this.mainInfo[0].address.length + 1
        };
      }
      if (this.secondForm.controls.select.value === 'sAddress') {
        obj = {
          type: 'Shipping address',
          country: this.secondForm.controls.country.value,
          city: this.secondForm.controls.city.value,
          code: this.secondForm.controls.code.value,
          id: this.mainInfo[0].address.length + 1
        };
      }
      if (this.secondForm.controls.select.value === 'bAddress') {
        obj = {
          type: 'Billing address',
          country: this.secondForm.controls.country.value,
          city: this.secondForm.controls.city.value,
          code: this.secondForm.controls.code.value,
          id: this.mainInfo[0].address.length + 1
        };
      }
    }
    this.users.forEach((elem, index) => {
      if (elem.userName === this.mainInfo[0].userName) {
        this.users[index].address.push(obj);
      }
    });
    this.del = false;
    this.addNewAddr = false;
    this.modal = false;
    this.addrModal = false;
    this.addressCount = 0;
  }
  delete(element: any) {
    this.del = true;
    this.removeUser = true;
    event.stopPropagation();
  }
  deleteUser() {
    console.log(this.mainInfo);
    this.removeUser = false;
    this.del = false;
    this.count = 0;
    this.addressCount = 0;
    this.users.forEach((el, i) => {
      if (el.firstName === this.mainInfo[0].firstName) {
        this.users.splice(i, 1);
        console.log(this.users);
        this.mainInfo = [];
        this.removeUser = false;
        this.del = false;
      }
    });
  }
  add(firstName: any, lastName: any, userName: any, email: any, phone: any) {
    // let search = [firstName, lastName, userName, email, phone];
    // let searchParam = [];
    // search.forEach((elem, index) => {
    //   if (elem !== '') {
    //     searchParam.push(elem);
    //   }
    // });
    // console.log(searchParam)
    // console.log(this.mainInfo)
    // searchParam.forEach((elem, index) => {
    //   if (this.mainInfo[0] === undefined) {
    //     this.users.filter( e => {
    //       if (e.firstName.includes(elem)) {
    //         let arr = [];
    //         arr.push(e);
    //         this.mainInfo = arr;
    //         console.log(this.mainInfo);
    //       }
    //     });
    //   }
    //   // if (this.mainInfo[0] !== undefined) {
    //   //   this.mainInfo.filter( e => {

    //   //   });
    //   // }
    //   this.count = 1;
    // });

    if (this.firstNameSearch !== '') {
      this.count = 1;
      this.users.filter( e => {
        if (e.firstName.includes(this.firstNameSearch)) {
          let arr = [];
          arr.push(e);
          this.mainInfo = arr;
        }
      });
    }

    if (this.lastNameSearch !== '') {
      this.count = 1;
      this.users.filter( e => {
        if (e.lastName.includes(this.lastNameSearch)) {
          let arr = []
          arr.push(e);
          this.mainInfo = arr;
        }
      });
    }
    if (this.userNameSearch !== '') {
      this.count = 1;
      this.users.filter( e => {
        if (e.userName.includes(this.userNameSearch)) {
          let arr = []
          arr.push(e);
          this.mainInfo = arr;
        }
      });
    }
    if (this.emailSearch !== '') {
      this.count = 1;
      this.users.filter( e => {
        if (e.email.includes(this.emailSearch)) {
          let arr = []
          arr.push(e);
          this.mainInfo = arr;
        }
      });
    }
    if (this.phoneSearch !== '') {
      this.count = 1;
      this.users.filter( e => {
        if (e.phone.includes(this.phoneSearch)) {
          let arr = []
          arr.push(e);
          this.mainInfo = arr;
        }
      });
    }
    this.addressCount = 0;
  }
  remove() {
    this.count = 0;
    this.addressCount = 0;
    this.mainInfo = [];
  }
  getCountry(): void {
  this.globalService.getCountries().subscribe(
    countries => this.countries = countries,
      err => err
    );
  }
  alert() {
    this.del = true;
    this.removeUser = false;
    this.editAddr = true;
  }
  delAddressModal(element: any) {
    this.del = true;
    this.removeAddr = true;
    this.address = element;
  }
  delAddress() {
    this.del = false;
    this.removeAddr = false;
    this.users.forEach((elem, index) => {
      if (this.addressInfo[0].firstName === elem.firstName) {
        this.users[index].address.forEach(( e, i: number ) => {
          if (e.id === this.address.id) {
            this.users[index].address.splice(i, 1);
          }
        });
      }
    });
    document.getElementById('hTable').style.display = 'none';
    this.addressCount = 0;
  }

  updateAddr() {
    this.users.forEach( (elem, index) => {
      if (this.addressInfo[0].firstName === elem.firstName) {
        this.users[index].address.forEach(( e, i: number ) => {
          if (e.id === this.currentAddr.id) {
            e.type = this.currentAddr.type;
            e.country = this.firstForm.controls.country.value;
            e.city =  this.firstForm.controls.city.value;
            e.code = this.firstForm.controls.code.value;
          }
        });
      }
    });
    this.modal = false;
    this.addrModal = false;
    this.del = false;
    this.removeUser = false;
    this.editAddr = false;
  }
}

