import { Users } from 'src/app/shared/models/users';


export class LogIn {
    static readonly type = '[User] Login User';
    constructor(public payload: Users) {}
}

export class LogoutUser {
    static readonly type = '[User] Logout User';
    constructor() {}
}
