import {Controller, Get} from '@nestjs/common';
import {StocksService} from "./stocks.service";

@Controller('stocks')
export class StocksController {

    constructor(private stocksService: StocksService) {
    }

    @Get()
    getAllStocks(): string{
        return this.stocksService.getAllStocks();
    }

}

