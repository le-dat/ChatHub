import { OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';
export declare class MessageGateway implements OnGatewayInit, OnGatewayDisconnect {
    server: Server;
    private activeSockets;
    private logger;
    joinRoom(client: Socket, room: string): void;
    callUser(client: Socket, data: any): void;
    makeAnswer(client: Socket, data: any): void;
    rejectCall(client: Socket, data: any): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
}
