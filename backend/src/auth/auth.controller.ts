
import {Body, Controller, Post, Get, Request, HttpCode, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import {SigninDto} from "./dto/signin.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SigninDto) {
        return this.authService.signIn(signInDto.username);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}

