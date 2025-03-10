import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findOne(username: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ username });
    }

    async findOneById(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async create(username: string): Promise<User>    {
        const user = new User();
        user.username = username;

        return this.usersRepository.save(user);
    }
}
