import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const secret = configService.get<string>('jwt_secret');
                const expiresIn = configService.get<number>('jwt_expires');
                return {
                    global: true,
                    secret,
                    signOptions: {expiresIn},
                }
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
