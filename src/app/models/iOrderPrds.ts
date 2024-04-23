export interface IOrdersPrds {
    _id?: string;
    title:string;
    paymentStatus: string;
    thumbnail: string;
    rating:number;
    quantity:number;
    priceAfterDescount:number;
    discountPercentage:number;
    description: string;
    price:number;
    images : string[];
    colors:[]

}