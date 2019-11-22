import { Users, Address } from 'src/app/shared/models/users';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CreateUser, AddUserAddress, GetAllUsers, AddAllUsers } from '../action/users.action';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { RequestionService } from 'src/app/shared/services/requests.service';

export class UsersModelState {
  users: Users[];
}

@State<UsersModelState>({
  name: 'Users',
  defaults: {
    users: null
  }
})

export class CreateUserState {

  users = [];

  constructor(
    private authService: AuthService,
    private requestService: RequestionService
  ) {}

  @Selector()
  static getUser(state: UsersModelState) {
    return state.users;
  }





  // @Action(AddUserAddress)
  // addUserAddress(ctx: StateContext<AddUserAddressModelState>, { payload }: AddUserAddress) {
  //   return this.requestService.getUsers().pipe(
  //   tap(users => {
  //       users.map((res) => {
  //         if (res.password === payload.password && res.userName === payload.userName) {
  //           ctx.patchState({ newAddress: res });
  //           this.requestService.addAuthUser(res).subscribe();
  //           this.authService.log();
  //         }
  //       });
  //     })
  //   );
  // }


  @Action(GetAllUsers)
  getAllUsers(ctx: StateContext<UsersModelState>) {
    return ctx.getState();
  }

  @Action(AddAllUsers)
  AddAllUsers(ctx: StateContext<UsersModelState>) {
    return this.requestService.getUsers().pipe(
      tap(res => {
        ctx.patchState({...ctx, users: res });
      })
    );
  }

  @Action(CreateUser)
  createUser(ctx: StateContext<UsersModelState>, { payload }: CreateUser) {
    const state = ctx.getState();
    // return ctx.patchState({ ...stateUsers,  ...payload });
    
    this.users = [ ...state.users, ...payload];
    return ctx.patchState({ ...ctx,  users: this.users });

  }
}











































// import { Users, Address } from 'src/app/shared/models/users';
// import { State, Selector, Action, StateContext } from '@ngxs/store';
// import { CreateUser, AddUserAddress, GetAllUsers, AddAllUsers } from '../action/users.action';
// import { tap } from 'rxjs/operators';
// import { AuthService } from 'src/app/auth/auth.service';
// import { RequestionService } from 'src/app/shared/services/requests.service';

// export class CreateUserModelState {
//   newUser: Users;
// }
// export class AddUserAddressModelState {
//   newAddress: Address;
// }
// export class GetAllUsersModelState {
//   getAllUsers: Users[];
// }
// export class AddAllUsersModelState {
//   addAllUsers: Users[];
// }


// @State<CreateUserModelState>({
//   name: 'newUser',
//   defaults: {
//     newUser: null
//   }
// })
// @State<AddUserAddressModelState>({
//   name: 'newAddress',
//   defaults: {
//     newAddress: null
//   }
// })
// @State<GetAllUsersModelState>({
//   name: 'getAllUsers',
//   defaults: {
//     getAllUsers: null
//   }
// })
// @State<AddAllUsersModelState>({
//   name: 'userState',
//   defaults: {
//     addAllUsers: null
//   }
// })

// export class CreateUserState {

//   constructor(
//     private authService: AuthService,
//     private requestService: RequestionService
//   ) {}

//   @Selector()
//   static getUser(state: CreateUserModelState) {
//     return state.newUser;
//   }
//   @Selector()
//   static getUserAddress(state: AddUserAddressModelState ) {
//     return state.newAddress;
//   }
//   @Selector()
//   static getAllUsers(state: GetAllUsersModelState ) {
//     return state.getAllUsers;
//   }
//   @Selector()
//   static addAllUsers(state: AddAllUsersModelState ) {
//     return state.addAllUsers;
//   }


//   @Action(CreateUser)
//   createUser(ctx: StateContext<CreateUserModelState>, { payload }: CreateUser) {
//     return this.requestService.getUsers().pipe(
//     tap(users => {
//         users.map((res) => {
//           if (res.password === payload.password && res.userName === payload.userName) {
//             ctx.patchState({ newUser: res });
//             this.requestService.addAuthUser(res).subscribe();
//             this.authService.log();
//           }
//         });
//       })
//     );
//   }

//   // @Action(AddUserAddress)
//   // addUserAddress(ctx: StateContext<AddUserAddressModelState>, { payload }: AddUserAddress) {
//   //   return this.requestService.getUsers().pipe(
//   //   tap(users => {
//   //       users.map((res) => {
//   //         if (res.password === payload.password && res.userName === payload.userName) {
//   //           ctx.patchState({ newAddress: res });
//   //           this.requestService.addAuthUser(res).subscribe();
//   //           this.authService.log();
//   //         }
//   //       });
//   //     })
//   //   );
//   // }


//   // @Action(GetAllUsers)
//   // getAllUsers(ctx: StateContext<GetAllUsersModelState>) {
//   //   return this.requestService.getUsers().pipe(
//   //   tap(users => {
//   //     users.map((user) => {
//   //       const  allUser = ctx.getState();
//   //       this.requestService.addAuthUser(user).subscribe();
//   //       console.log()
//   //     });
//   //   }));
//   // }

//   @Action(GetAllUsers)
//   getAllUsers(ctx: StateContext<GetAllUsersModelState>) {
//     return ctx.getState();
//   }

//   @Action(AddAllUsers)
//   AddAllUsers(ctx: StateContext<AddAllUsersModelState>) {
//     return this.requestService.getUsers().pipe(
//       tap(res => {
//         ctx.patchState({...ctx, addAllUsers: res });
//       })
//     );
//   }

// }