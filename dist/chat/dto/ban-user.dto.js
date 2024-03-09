"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanUserDto = void 0;
const openapi = require("@nestjs/swagger");
const kick_user_dto_1 = require("./kick-user.dto");
class BanUserDto extends kick_user_dto_1.KickUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.BanUserDto = BanUserDto;
//# sourceMappingURL=ban-user.dto.js.map