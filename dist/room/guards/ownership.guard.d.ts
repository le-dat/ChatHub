import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoomService } from '../room.service';
export declare class OwnershipGuard implements CanActivate {
    private readonly roomSerivce;
    constructor(roomSerivce: RoomService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
