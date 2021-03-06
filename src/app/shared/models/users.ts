export class Address {
    type: string;
    country: string;
    city: string;
    code: number;
    id: number;
}

export class Users {
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    email: string;
    password: string;
    password1: string;
    address: Address[];
    id: number;
}

export class AuthUser {
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    email: string;
    password: string;
    address: Address[];
}

export interface Response {
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    email: string;
    password: string;
    address: Address[];
}







