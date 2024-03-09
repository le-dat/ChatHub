import { Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { RoomService } from 'src/room/room.service';
import { AddMessageDto } from './dto/add-message.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';
import { KickUserDto } from './dto/kick-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
export declare class ChatGateway {
    private readonly userService;
    private readonly authService;
    private readonly roomService;
    server: any;
    connectedUsers: Map<string, string>;
    constructor(userService: UserService, authService: AuthService, roomService: RoomService);
    onMessage(client: Socket, addMessageDto: AddMessageDto): Promise<void>;
    onRoomJoin(client: Socket, joinRoomDto: JoinRoomDto): Promise<void>;
    onRoomLeave(client: Socket, leaveRoomDto: LeaveRoomDto): Promise<void>;
    onUserKick(client: Socket, kickUserDto: KickUserDto): Promise<void>;
    onUserBan(client: Socket, banUserDto: BanUserDto): Promise<void>;
    private getClientByUserId;
}
