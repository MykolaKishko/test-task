import { Users, Address } from 'src/app/shared/models/users';

export class CreateUser {
    static readonly type = '[Users] Create User';
    constructor(public payload: Users[]) {}
}
export class AddUserAddress {
    static readonly type = '[Users] Add User Address';
    constructor(public payload: Address) {}
}
export class GetAllUsers {
    static readonly type = '[Users] Get All User ';
}
export class AddAllUsers {
    static readonly type = '[Users] Add All Users';
}
