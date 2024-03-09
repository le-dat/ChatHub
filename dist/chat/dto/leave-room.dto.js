"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRoomDto = void 0;
const openapi = require("@nestjs/swagger");
const join_room_dto_1 = require("./join-room.dto");
class LeaveRoomDto extends join_room_dto_1.JoinRoomDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.LeaveRoomDto = LeaveRoomDto;
//# sourceMappingURL=leave-room.dto.js.map