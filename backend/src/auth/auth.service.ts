import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signIn(username: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        // normally we would throw an exception if the user is not found, if they exist we would check the password by
        // hashing the password and comparing it to the hashed password in the database. if they did not match
        // we would throw an exception. However, for the sake of simplicity we will just check whether the user exists only
        if (!user) {
            throw new UnauthorizedException();
        }


        // TODO: Normally we would generate a JWT and return it here, with some user details
        // instead just return the user object
        return user;
    }
}
