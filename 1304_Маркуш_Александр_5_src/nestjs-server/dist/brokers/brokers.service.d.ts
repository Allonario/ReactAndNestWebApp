import { IBuyStock } from "../models/buy.model";
export declare class BrokersService {
    BROKERS: any;
    constructor();
    getBrokers(): string;
    getBroker(name: string): string;
    addBroker(body: any): string;
    changeBroker(id: number, body: any): string;
    deleteBroker(id: number): string;
    buy(body: IBuyStock): any;
    sell(body: IBuyStock): any;
}
