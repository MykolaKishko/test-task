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
    address: Address[] = [];
}

export class NewUser {
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    email: string;
    password: string;
    address: Address[] = [];
}
