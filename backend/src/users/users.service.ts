import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    username: string;
}

@Injectable()
export class UsersService {
    private readonly users = [
        {
            id: 1,
            username: 'phillip',
        },
        {
            id: 2,
            username: 'sharyn',

        },
        {
            id: 3,
            username: 'tom',
        },
        {
            id: 4,
            username: 'miki',

        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async findOneById(id: number): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }
}
