import {Body, Controller, Delete, Get, Header, Param, Post, Put} from '@nestjs/common';
import {BrokersService} from "./brokers.service";
import {IBuyStock} from "../models/buy.model";

@Controller('brokers')
export class BrokersController {

    constructor(private brokerService: BrokersService) {
    }
    @Get()
    getBrokers(): string{
        return this.brokerService.getBrokers();
    }

    @Get(":id")
    getBroker(@Param('id') name: string){
        return this.brokerService.getBroker(name);
    }

    @Post()
    addBrokers(@Body() body: any): string{
        return this.brokerService.addBroker(body);
    }

    @Put(':id')
    changeBroker(@Param('id') id: number, @Body() body: any): string {
        return this.brokerService.changeBroker(id, body);
    }

    @Delete(':id')
    deleteBroker(@Param('id') id: number ): string {
        return this.brokerService.deleteBroker(id);
    }



    @Post('/buy')
    @Header('Content-Type', 'application/json')
    async buyStock(@Body() body: IBuyStock) {
        return this.brokerService.buy(body);
    }
    @Post('/sell')
    @Header('Content-Type', 'application/json')
    async sellStock(@Body() body: IBuyStock) {
        return this.brokerService.sell(body);
    }
}
