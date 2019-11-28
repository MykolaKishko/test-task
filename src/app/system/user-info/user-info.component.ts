import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models/users';
import { RequestionService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  authUser: Users;

  constructor( private requestService: RequestionService ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.requestService.getAuthUsers().subscribe(res => {
      this.authUser = res[0];
    });
  }
}
