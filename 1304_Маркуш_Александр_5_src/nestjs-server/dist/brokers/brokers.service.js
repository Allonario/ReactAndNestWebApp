"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokersService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let BrokersService = class BrokersService {
    constructor() {
        this.BROKERS = JSON.parse(String(fs.readFileSync(path.join(process.cwd(), './src/db/brokers.json'))));
    }
    getBrokers() {
        return JSON.stringify(this.BROKERS);
    }
    getBroker(name) {
        for (let broker of this.BROKERS) {
            if (broker.name === name) {
                return JSON.stringify(broker);
            }
        }
    }
    addBroker(body) {
        console.log(body);
        body.id = (new Date()).getTime();
        this.BROKERS.push(body);
        fs.writeFile('src/db/brokers.json', JSON.stringify(this.BROKERS), (err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            }
            else {
                console.log('Data written to brokers.json');
            }
        });
        return JSON.stringify({ message: 'Success!' });
    }
    changeBroker(id, body) {
        const index = this.BROKERS.map((broker) => {
            return broker.id;
        }).indexOf(Number(id));
        this.BROKERS[index] = body;
        fs.writeFile('src/db/brokers.json', JSON.stringify(this.BROKERS), (err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            }
            else {
                console.log('Data written to brokers.json');
            }
        });
        return JSON.stringify({ message: 'Success!' });
    }
    deleteBroker(id) {
        const index = this.BROKERS.map((broker) => {
            return broker.id;
        }).indexOf(Number(id));
        this.BROKERS.splice(index, 1);
        fs.writeFile('src/db/brokers.json', JSON.stringify(this.BROKERS), (err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            }
            else {
                console.log('Data written to brokers.json');
            }
        });
        return JSON.stringify({ message: 'Success!' });
    }
    buy(body) {
        const idx = this.BROKERS.findIndex((x) => body.broker_id === x.id);
        console.log(this.BROKERS[idx]);
        if (!this.BROKERS[idx].stocks) {
            this.BROKERS[idx].stocks = {};
            this.BROKERS[idx].stocks[body.stock_id] = { count: 0, sum: 0 };
        }
        else if (!this.BROKERS[idx].stocks[body.stock_id]) {
            this.BROKERS[idx].stocks[body.stock_id] = { count: 0, sum: 0 };
        }
        this.BROKERS[idx].stocks[body.stock_id].count += body.stock_count;
        this.BROKERS[idx].stocks[body.stock_id].sum +=
            body.stock_count * body.price;
        this.BROKERS[idx].balance -= body.stock_count * body.price;
        console.log(this.BROKERS[idx]);
        fs.writeFile('src/db/brokers.json', JSON.stringify(this.BROKERS), (err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            }
            else {
                console.log('Data written to brokers.json');
            }
        });
        return this.BROKERS[idx];
    }
    sell(body) {
        const idx = this.BROKERS.findIndex((x) => body.broker_id === x.id);
        console.log(body);
        if (this.BROKERS[idx].stocks[body.stock_id].count === body.stock_count) {
            delete this.BROKERS[idx].stocks[body.stock_id];
            if (Object.keys(this.BROKERS[idx].stocks).length === 0) {
                delete this.BROKERS[idx].stocks;
            }
        }
        else {
            this.BROKERS[idx].stocks[body.stock_id].sum -=
                (this.BROKERS[idx].stocks[body.stock_id].sum /
                    this.BROKERS[idx].stocks[body.stock_id].count) *
                    body.stock_count;
            this.BROKERS[idx].stocks[body.stock_id].count -= body.stock_count;
        }
        this.BROKERS[idx].balance += body.stock_count * body.price;
        fs.writeFile('src/db/brokers.json', JSON.stringify(this.BROKERS), (err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            }
            else {
                console.log('Data written to brokers.json');
            }
        });
        return this.BROKERS[idx];
    }
};
exports.BrokersService = BrokersService;
exports.BrokersService = BrokersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BrokersService);
//# sourceMappingURL=brokers.service.js.map