import { Users } from 'src/app/shared/models/users';

export class UsersStateModel {
  users: Users[];
  createUser: Users = {
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    email: '',
    password: '',
    address: []
  };
}



export class CreateUserState {
  constructor(

  ) {}
}


