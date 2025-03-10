import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/users.service';

function  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private configService: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const secret = this.configService.get<string>('jwt_secret');

        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: secret
                }
            );
            // 💡 we are setting the user object on the request object so that it can be accessed in the controller
            // in a real application, we would probably set the user object on the request object in a middleware and do
            // via reading the db but this is just a simple example
            request['user'] = {id:payload.sub, username:payload.username} as User;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}

// similar to auth guard but does not throw an exception if the token is invalid or don't exist.  This is
// to allow endpoints that can be accessed without a token or with one.  Again middleware would be a better to load a user
// but too much for this example
@Injectable()
export class OptionalAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private configService: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const secret = this.configService.get<string>('jwt_secret');

        const request = context.switchToHttp().getRequest();
        request['user'] = null;

        const token = extractTokenFromHeader(request);
        if (!token) {
            return true;
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: secret
                }
            );
            // 💡 we are setting the user object on the request object so that it can be accessed in the controller
            // in a real application, we would probably set the user object on the request object in a middleware and do
            // via reading the db but this is just a simple example
            request['user'] = {id:payload.sub, username:payload.username} as User;
        } catch {
            // if the token is invalid just ignore it and continue as it is optional
        }
        return true;
    }
}
