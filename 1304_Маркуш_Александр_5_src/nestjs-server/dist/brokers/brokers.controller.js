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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokersController = void 0;
const common_1 = require("@nestjs/common");
const brokers_service_1 = require("./brokers.service");
let BrokersController = class BrokersController {
    constructor(brokerService) {
        this.brokerService = brokerService;
    }
    getBrokers() {
        return this.brokerService.getBrokers();
    }
    getBroker(name) {
        return this.brokerService.getBroker(name);
    }
    addBrokers(body) {
        return this.brokerService.addBroker(body);
    }
    changeBroker(id, body) {
        return this.brokerService.changeBroker(id, body);
    }
    deleteBroker(id) {
        return this.brokerService.deleteBroker(id);
    }
    async buyStock(body) {
        return this.brokerService.buy(body);
    }
    async sellStock(body) {
        return this.brokerService.sell(body);
    }
};
exports.BrokersController = BrokersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], BrokersController.prototype, "getBrokers", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BrokersController.prototype, "getBroker", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], BrokersController.prototype, "addBrokers", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", String)
], BrokersController.prototype, "changeBroker", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", String)
], BrokersController.prototype, "deleteBroker", null);
__decorate([
    (0, common_1.Post)('/buy'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "buyStock", null);
__decorate([
    (0, common_1.Post)('/sell'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "sellStock", null);
exports.BrokersController = BrokersController = __decorate([
    (0, common_1.Controller)('brokers'),
    __metadata("design:paramtypes", [brokers_service_1.BrokersService])
], BrokersController);
//# sourceMappingURL=brokers.controller.js.map