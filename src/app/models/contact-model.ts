export interface IContact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    status: string;
}


export enum Status {
    active = 1,
    inactive
}
