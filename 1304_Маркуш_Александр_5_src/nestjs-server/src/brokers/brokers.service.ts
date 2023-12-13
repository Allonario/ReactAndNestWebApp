import {Injectable} from '@nestjs/common';
import * as fs from "fs";
import {IBuyStock} from "../models/buy.model";
import * as path from "path";

@Injectable()
export class BrokersService {
    BROKERS: any;

    constructor() {
        this.BROKERS = JSON.parse(
            String(
                fs.readFileSync(path.join(process.cwd(), './src/db/brokers.json')),
            ),
        );
    }

    getBrokers(): string {
        return JSON.stringify(this.BROKERS);
    }

    getBroker(name: string): string{
        for (let broker of this.BROKERS){
            if (broker.name === name){
                return JSON.stringify(broker);
            }
        }
    }

    addBroker(body: any): string{
        console.log(body);
        body.id = (new Date()).getTime();
        this.BROKERS.push(body);
        fs.writeFile('src/db/brokers.json', JSON.stringify(this.BROKERS),(err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            } else {
                console.log('Data written to brokers.json');
            }
        });
        return JSON.stringify({message: 'Success!'});
    }

    changeBroker(id: number, body: any): string {
        const index = this.BROKERS.map((broker: any) => {
            return broker.id;
        }).indexOf(Number(id));
        this.BROKERS[index] = body;
        fs.writeFile('src/db/brokers.json', JSON.stringify(this.BROKERS),(err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            } else {
                console.log('Data written to brokers.json');
            }
        });
        return JSON.stringify({message: 'Success!'});
    }

    deleteBroker(id: number):string{
        const index = this.BROKERS.map((broker: any) => {
            return broker.id;
        }).indexOf(Number(id));
        this.BROKERS.splice(index, 1);
        fs.writeFile('src/db/brokers.json', JSON.stringify(this.BROKERS),(err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            } else {
                console.log('Data written to brokers.json');
            }
        });
        return JSON.stringify({message: 'Success!'})
    }

    buy(body: IBuyStock) {
        const idx = this.BROKERS.findIndex((x) => body.broker_id === x.id);
        console.log(this.BROKERS[idx]);
        if (!this.BROKERS[idx].stocks) {
            this.BROKERS[idx].stocks = {};
            this.BROKERS[idx].stocks[body.stock_id] = { count: 0, sum: 0 };
        } else if (!this.BROKERS[idx].stocks[body.stock_id]) {
            this.BROKERS[idx].stocks[body.stock_id] = { count: 0, sum: 0 };
        }
        this.BROKERS[idx].stocks[body.stock_id].count += body.stock_count;
        this.BROKERS[idx].stocks[body.stock_id].sum +=
            body.stock_count * body.price;
        this.BROKERS[idx].balance -= body.stock_count * body.price;
        console.log(this.BROKERS[idx]);
        fs.writeFile('src/db/brokers.json', JSON.stringify(this.BROKERS),(err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            } else {
                console.log('Data written to brokers.json');
            }
        });
        return this.BROKERS[idx];
    }

    sell(body: IBuyStock) {
        const idx = this.BROKERS.findIndex((x) => body.broker_id === x.id);
        console.log(body)
        if (this.BROKERS[idx].stocks[body.stock_id].count === body.stock_count) {
            delete this.BROKERS[idx].stocks[body.stock_id];
            if (Object.keys(this.BROKERS[idx].stocks).length === 0) {
                delete this.BROKERS[idx].stocks;
            }
        } else {
            this.BROKERS[idx].stocks[body.stock_id].sum -=
                (this.BROKERS[idx].stocks[body.stock_id].sum /
                    this.BROKERS[idx].stocks[body.stock_id].count) *
                body.stock_count;
            this.BROKERS[idx].stocks[body.stock_id].count -= body.stock_count;
        }
        this.BROKERS[idx].balance += body.stock_count * body.price;
        fs.writeFile('src/db/brokers.json', JSON.stringify(this.BROKERS),(err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            } else {
                console.log('Data written to brokers.json');
            }
        });
        return this.BROKERS[idx];
    }

}
