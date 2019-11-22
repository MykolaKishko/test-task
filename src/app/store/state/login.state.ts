import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthUser } from 'src/app/shared/models/users';
import { AuthService } from 'src/app/auth/auth.service';
import { LogIn, LogoutUser } from '../action/login.action';
import { RequestionService } from 'src/app/shared/services/requests.service';
import { tap } from 'rxjs/operators';

export class LoginUserModelState {
  authUser: AuthUser;
}

@State<LoginUserModelState>({
  name: 'authUser',
  defaults: {
  authUser: null
  }
})

export class LoginState {

  constructor(
    private authService: AuthService,
    private requestService: RequestionService
  ) {}

  @Selector()
  static getUser(state: LoginUserModelState) {
    return state.authUser;
  }

  @Action(LogIn)
  loginUser(ctx: StateContext<LoginUserModelState>, { payload }: LogIn) {
    return this.requestService.getUsers().pipe(
    tap(users => {
        users.map((res) => {
          if (res.password === payload.password && res.userName === payload.userName) {
            ctx.patchState({ authUser: res });
            this.requestService.addAuthUser(res).subscribe();
            this.authService.log();
          }
        });
      })
    );
  }

  @Action(LogoutUser)
  logoutUser() {
    this.authService.logout();
    this.requestService.deleteAuthUser();
  }
}