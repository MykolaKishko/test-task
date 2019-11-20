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







