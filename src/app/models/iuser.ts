export interface IUser {
    id?:string;
    name?:string;
    email?:string;
    addressBook?:[];
    password?:string;
    role?:string;
    createdAt?: Date;
    updatedAt?: Date;
}
