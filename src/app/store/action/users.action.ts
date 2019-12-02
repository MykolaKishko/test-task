import { Users } from 'src/app/shared/models/users';

export class CreateUser {
    static readonly type = '[Users] Create User';
    constructor(public payload: Users) {}
}
export class AddSelectedUser {
    static readonly type = '[Users] Add Selaect User';
    constructor(public payload: Users) {}
}
export class DeleteUser {
    static readonly type = '[Users] Delete User';
    constructor(public payload: Users[], public id: number) {}
}
export class EditUser {
    static readonly type = '[Users] Edit User';
    constructor(public payload: Users) {}
}
export class GetAllUsers {
    static readonly type = '[Users] Get All User ';
}
export class AddAllUsers {
    static readonly type = '[Users] Add All Users';
}
