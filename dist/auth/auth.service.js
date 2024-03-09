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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async singUp(userDto) {
        const candidate = await this.userService.findOneByUsername(userDto.username);
        if (candidate)
            return null;
        const hashedPassword = await bcrypt.hash(userDto.password, 7);
        const user = await this.userService.create(Object.assign(Object.assign({}, userDto), { password: hashedPassword }));
        const tokens = await this.generateTokens(user.id);
        return tokens;
    }
    async signIn(userDto) {
        const user = await this.userService.findOneByUsername(userDto.username);
        const tokens = await this.generateTokens(user.id);
        return tokens;
    }
    async validateUser(userDto) {
        const user = await this.userService.findOneByUsername(userDto.username);
        if (!user) {
            throw new common_1.NotFoundException(`There is no user under this username`);
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (passwordEquals)
            return user;
        throw new common_1.UnauthorizedException({ message: 'Incorrect password' });
    }
    verifyAccessToken(accessToken) {
        try {
            const payload = this.jwtService.verify(accessToken, {
                secret: process.env.JWT_ACCESS_SECRET,
            });
            return payload;
        }
        catch (err) {
            return null;
        }
    }
    verifyRefreshToken(refreshToken) {
        const payload = this.jwtService.verify(refreshToken, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
        return payload;
    }
    async updateAccessToken(refreshToken) {
        try {
            const userId = this.verifyRefreshToken(refreshToken);
            const tokens = await this.generateTokens(userId);
            return tokens.accessToken;
        }
        catch (e) {
            return null;
        }
    }
    async generateTokens(id) {
        const payload = { id };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRE,
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRE,
        });
        const tokens = { accessToken, refreshToken };
        return tokens;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map