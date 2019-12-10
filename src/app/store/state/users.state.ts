import { Users } from 'src/app/shared/models/users';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CreateUser, GetAllUsers, AddAllUsers, DeleteUser, EditUser, AddSelectedUser } from '../action/users.action';
import { tap } from 'rxjs/operators';
import { RequestionService } from 'src/app/shared/services/requests.service';

export class UsersModelState {
  users: Users[];
  selectedUser: Users;
}

@State<UsersModelState>({
  name: 'Users',
  defaults: {
    users: null,
    selectedUser: null
  }
})

export class CreateUserState {

  constructor(
    private requestService: RequestionService
  ) {}

  @Selector()
  static getUser(state: UsersModelState) {
    return state;
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
    const users = [ ...ctx.getState().users, payload];
    this.requestService.addNewUser(payload).subscribe();
    return ctx.patchState({ ...ctx, users });
  }
  @Action(DeleteUser)
  deleteUser(ctx: StateContext<UsersModelState>, { payload }: DeleteUser) {
    const users = ctx.getState().users.filter( res => res.id !== payload.id);
    this.requestService.deleteUser(payload.id).subscribe();
    return ctx.patchState({...ctx, users });
  }
  @Action(EditUser)
  editUser(ctx: StateContext<UsersModelState>, { payload }: EditUser) {
    let users = ctx.getState().users.filter( res => res.id !== payload.id);
    users = [...users, payload];
    this.requestService.updateUser( payload.id, payload);
    return ctx.patchState({ ...ctx, users });
  }
  @Action(AddSelectedUser)
  addSelectedUser(ctx: StateContext<UsersModelState>, { payload }: AddSelectedUser) {
    return ctx.patchState({ ...ctx,  selectedUser: payload });
  }
}
