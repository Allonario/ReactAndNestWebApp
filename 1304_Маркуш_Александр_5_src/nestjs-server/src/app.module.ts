import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksController } from './stocks/stocks.controller';
import { BrokersController } from './brokers/brokers.controller';
import { BrokersService } from './brokers/brokers.service';
import { StocksService } from './stocks/stocks.service';
import { SocketService } from './socket/socket.service';

@Module({
  imports: [],
  controllers: [AppController, StocksController, BrokersController],
  providers: [AppService, BrokersService, StocksService, SocketService],
})
export class AppModule{
}
