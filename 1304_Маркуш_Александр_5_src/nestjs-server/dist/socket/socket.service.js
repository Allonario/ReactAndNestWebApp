"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const websockets_1 = require("@nestjs/websockets");
const axios_1 = __importDefault(require("axios"));
let SocketService = class SocketService {
    constructor() {
        this.index = 0;
        this.wsClients = [];
        this.list = [];
    }
    handleConnection(client) {
        if (!this.wsClients.includes(client)) {
            console.log("connection");
            this.wsClients.push(client);
        }
    }
    handleDisconnect(client) {
        for (let i = 0; i < this.wsClients.length; i++) {
            if (this.wsClients[i] === client) {
                console.log("disconnection");
                this.wsClients.splice(i, 1);
                break;
            }
        }
    }
    broadcast(event, message) {
        const broadCastMessage = JSON.stringify(message);
        for (let client of this.wsClients) {
            client.emit(event, broadCastMessage);
        }
    }
    handleTradingListEvent(dto, client) {
        this.list = dto;
        this.broadcast('tradingList', dto);
    }
    handleStartEvent(dto, client) {
        this.index = Number(dto.index);
        const res = { type: "send", dto };
        this.interval = setInterval(() => {
            console.log(this.index);
            this.broadcast('tradingList', this.list);
            this.broadcast('trading', this.index);
            this.index += 1;
        }, 5000 / dto.speed);
    }
    handleStopEvent(dto, client) {
        clearInterval(this.interval);
        console.log("stop");
        this.index = 0;
    }
    handleBuyEvent(dto, client) {
        axios_1.default.post('http://localhost:8080/brokers/buy', dto).then(r => {
            console.log(r.data);
            this.broadcast('broker_buy', r.data);
        });
    }
    handleSellEvent(dto, client) {
        axios_1.default.post('http://localhost:8080/brokers/sell', dto).then(r => {
            console.log(r.data);
            this.broadcast('broker_buy', r.data);
        });
    }
};
exports.SocketService = SocketService;
__decorate([
    (0, websockets_1.SubscribeMessage)("tradingDone"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SocketService.prototype, "handleTradingListEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("startTrading"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SocketService.prototype, "handleStartEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("stopTrading"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SocketService.prototype, "handleStopEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('buy'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SocketService.prototype, "handleBuyEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sell'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SocketService.prototype, "handleSellEvent", null);
exports.SocketService = SocketService = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: "*" } })
], SocketService);
//# sourceMappingURL=socket.service.js.map