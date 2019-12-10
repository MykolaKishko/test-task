import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models/users';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit {

  authUser: Users;

  constructor( private store: Store ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.store.subscribe( res => {
      this.authUser = res.authUser.authUser;
    });
  }
}
