import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    singUp(userDto: CreateUserDto, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    singIn(userDto: LoginUserDto, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    updateTokens(req: Request): Promise<string>;
}
