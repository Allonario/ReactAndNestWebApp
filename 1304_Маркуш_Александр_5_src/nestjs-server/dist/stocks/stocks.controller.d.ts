import { StocksService } from "./stocks.service";
export declare class StocksController {
    private stocksService;
    constructor(stocksService: StocksService);
    getAllStocks(): string;
}
