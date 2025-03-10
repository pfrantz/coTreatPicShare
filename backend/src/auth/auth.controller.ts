
import {Body, Controller, Post, Get, Request, HttpCode, HttpStatus, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {SigninDto} from "./dto/signin.dto";
import {AuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SigninDto) {
        return this.authService.signIn(signInDto.username);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}

