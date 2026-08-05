export type PaymentProvider="stripe"|"paypal"|"square";export interface PaymentIntent{provider:PaymentProvider;amount:number;currency:string;documentId?:string;status:"pending"|"paid"|"failed"}
