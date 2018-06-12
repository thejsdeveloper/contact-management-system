export interface IContact {
    id: string;
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
