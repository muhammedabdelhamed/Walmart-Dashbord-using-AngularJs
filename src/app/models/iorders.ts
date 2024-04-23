import { IOrdersPrds } from "./iOrderPrds";
import { IUser } from "./iuser";

export interface IOrders {
    _id?: string;
    userId: IUser;
    paymentStatus: string;
    status: string;
    amount:number;
    items : IOrdersPrds[];
    shippingAddress :{};
    createdAt?: Date;
    updatedAt?: Date;
}