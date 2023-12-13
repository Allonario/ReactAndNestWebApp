import { OnGatewayConnection } from "@nestjs/websockets";
export declare class SocketService implements OnGatewayConnection {
    private index;
    private interval;
    private wsClients;
    private list;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    private broadcast;
    handleTradingListEvent(dto: any, client: any): void;
    handleStartEvent(dto: any, client: any): void;
    handleStopEvent(dto: any, client: any): void;
    handleBuyEvent(dto: any, client: any): void;
    handleSellEvent(dto: any, client: any): void;
}
