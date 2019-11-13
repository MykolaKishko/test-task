import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  authUser = JSON.parse(window.localStorage.getItem('User'));

  constructor( private globalService: GlobalService ) { }

  ngOnInit() {}

}
