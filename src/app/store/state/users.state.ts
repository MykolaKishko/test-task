import { Users } from 'src/app/shared/models/users';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CreateUser, GetAllUsers, AddAllUsers, DeleteUser, EditUser } from '../action/users.action';
import { tap } from 'rxjs/operators';
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
    private requestService: RequestionService
  ) {}

  @Selector()
  static getUser(state: UsersModelState) {
    return state.users;
  }

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
    this.users = [ ...state.users, payload];
    this.requestService.addNewUser(payload).subscribe();
    return ctx.patchState({ ...ctx,  users: this.users });
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<UsersModelState>, { payload, id }: DeleteUser) {
    this.requestService.deleteUser(id).subscribe();
    return ctx.patchState({...ctx, users: payload });
  }

  @Action(EditUser)
  editUser(ctx: StateContext<UsersModelState>, { payload }: EditUser) {
    let users = ctx.getState().users;
    users = users.filter( res => res.id !== payload.id);
    users = [...users, payload];
    this.requestService.updateUser( payload.id, payload);
    return ctx.patchState({ ...ctx, users });
  }
}
