import { BrokersService } from "./brokers.service";
import { IBuyStock } from "../models/buy.model";
export declare class BrokersController {
    private brokerService;
    constructor(brokerService: BrokersService);
    getBrokers(): string;
    getBroker(name: string): string;
    addBrokers(body: any): string;
    changeBroker(id: number, body: any): string;
    deleteBroker(id: number): string;
    buyStock(body: IBuyStock): Promise<any>;
    sellStock(body: IBuyStock): Promise<any>;
}
