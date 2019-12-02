import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { MatDialog, MatTable } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { CreateUserState } from 'src/app/store/state/users.state';
import { CountriesService } from '../../shared/services/countries.service';
import { UpdateMainComponent } from './update-main/update-main.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { Users, Address } from 'src/app/shared/models/users';
import { NewAddressModalComponent } from './new-address-modal/new-address-modal.component';
import { RequestionService } from 'src/app/shared/services/requests.service';
import { Countries } from 'src/app/shared/models/countries';
import { AddAllUsers } from 'src/app/store/action/users.action';

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
  user: Users;

  @Select(CreateUserState.getUser) user$: Observable<any>;

  constructor(
    private countriesService: CountriesService,
    public dialog: MatDialog,
    private requestionService: RequestionService,
    private store: Store
  ) {}

  ngOnInit() {
    this.addressInfoBlock = false;
    this.addAllUsers();
    this.getData();
    this.getCountry();
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('')
    });
  }

  addAllUsers() {
    this.store.dispatch(new AddAllUsers());
  }
  getData() {
    this.requestionService.getUsers().subscribe(res => {
      this.mainInfo = [...this.mainInfo, ...res];
    });
  }
  openMainModal(action: string, user: Users): void {
    const users = this.mainInfo;
    const dialog = this.dialog.open(UpdateMainComponent, {
      data: { user, action, users }
    });
    dialog.afterClosed().subscribe( () => {
      this.store.subscribe( data => this.mainInfo = data.Users.users);
    });
  }
  openAddressModal(action: string, address: Address): void {
    const users = this.mainInfo;
    const selectedUser = this.selectedUser;
    const dialog = this.dialog.open(UpdateAddressComponent, {
      data: { address, action, users, selectedUser }
    });
    dialog.afterClosed().subscribe( () => {
      this.store.subscribe(data => {
        this.userAddresses = data.Users.selectedUser.address;
      });
    });
  }
  newAddressModal(action: string, address: Address): void {
    const users = this.mainInfo;
    const selectedUser = this.selectedUser;
    const dialog = this.dialog.open(NewAddressModalComponent, {
      data: { address, action, users, selectedUser }
    });
    dialog.afterClosed().subscribe( () => {
      this.store.subscribe(data => {
        this.userAddresses = data.Users.selectedUser.address;
      });
    });
  }
  rowClick(user): void {
    this.userAddresses = user.address;
    this.selectedUser = user;
    this.addressInfoBlock = true;
  }
  search(): void {
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
  clear(): void {
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
