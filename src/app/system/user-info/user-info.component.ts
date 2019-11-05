import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  newUser = this.globalService.newUser;
  users = this.globalService.users;
  authUser = JSON.parse(window.localStorage.getItem('User'));


  constructor( private globalService: GlobalService ) { }

  ngOnInit() {}

}
