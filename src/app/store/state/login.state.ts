import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthUser } from 'src/app/shared/models/users';
import { AuthService } from 'src/app/auth/auth.service';
import { LogIn, LogoutUser } from '../action/login.action';
import { RequestionService } from 'src/app/shared/services/requests.service';

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
    this.authService.log();
    ctx.patchState({ ...ctx, authUser: payload });
  }

  @Action(LogoutUser)
  logoutUser(ctx: StateContext<LoginUserModelState>) {
    this.authService.logout();
    ctx.setState({ authUser: null });
  }
}
