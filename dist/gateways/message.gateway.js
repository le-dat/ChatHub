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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const ws_1 = require("ws");
const common_1 = require("@nestjs/common");
const options = {
    cors: {
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST"],
        credentials: true,
    }
};
let MessageGateway = class MessageGateway {
    constructor() {
        this.activeSockets = [];
        this.logger = new common_1.Logger('MessageGateway');
    }
    joinRoom(client, room) {
        var _a;
        const existingSocket = (_a = this.activeSockets) === null || _a === void 0 ? void 0 : _a.find((socket) => socket.room === room && socket.id === client.id);
        if (!existingSocket) {
            this.activeSockets = [...this.activeSockets, { id: client.id, room }];
            client.emit(`${room}-update-user-list`, {
                users: this.activeSockets
                    .filter((socket) => socket.room === room && socket.id !== client.id)
                    .map((existingSocket) => existingSocket.id),
                current: client.id,
            });
            client.broadcast.emit(`${room}-add-user`, {
                user: client.id,
            });
        }
        return this.logger.log(`Client ${client.id} joined ${room}`);
    }
    callUser(client, data) {
        client.to(data.to).emit('call-made', {
            offer: data.offer,
            socket: client.id,
        });
    }
    makeAnswer(client, data) {
        client.to(data.to).emit('answer-made', {
            socket: client.id,
            answer: data.answer,
        });
    }
    rejectCall(client, data) {
        client.to(data.from).emit('call-rejected', {
            socket: client.id,
        });
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        const existingSocket = this.activeSockets.find((socket) => socket.id === client.id);
        if (!existingSocket)
            return;
        this.activeSockets = this.activeSockets.filter((socket) => socket.id !== client.id);
        client.broadcast.emit(`${existingSocket.room}-remove-user`, {
            socketId: client.id,
        });
        this.logger.log(`Client disconnected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof ws_1.Server !== "undefined" && ws_1.Server) === "function" ? _a : Object)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "callUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('make-answer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "makeAnswer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('reject-call'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "rejectCall", null);
MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(options)
], MessageGateway);
exports.MessageGateway = MessageGateway;
//# sourceMappingURL=message.gateway.js.map