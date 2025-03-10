import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(username: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        // normally we would throw an exception if the user is not found, if they exist we would check the password by
        // hashing the password and comparing it to the hashed password in the database. if they did not match
        // we would throw an exception. However, for the sake of simplicity we will just check whether the user exists only
        if (!user) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.username };
        const access_token = await this.jwtService.signAsync(payload);

        // return the access token and the user profile
        return {
            token: access_token,
            profile: user
        };
    }
}
