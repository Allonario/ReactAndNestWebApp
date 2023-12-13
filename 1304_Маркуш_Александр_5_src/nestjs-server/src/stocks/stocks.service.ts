import { Injectable } from '@nestjs/common';
import STOCKS from '../db/stocks.json';

@Injectable()
export class StocksService {

    getAllStocks(){
        return JSON.stringify(STOCKS);
    }
}
