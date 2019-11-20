import { State } from '@ngxs/store';

import { Users } from 'src/app/shared/models/users';
import { AuthService } from 'src/app/auth/auth.service';


@State<Users>({
  name: 'document',
  defaults: {
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    email: '',
    password: '',
    address: []
  }
})

export class UserState {

  constructor(
    private authService: AuthService
  ) {}


}
