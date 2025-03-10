import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import configuration  from './config';

import {User} from "./users/entities/user.entities";
import {Favourites, Media} from "./media/entities/media.entity";

@Module({
  imports: [
      ConfigModule.forRoot({
        load: [()=> configuration()],
        isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get<string>('database.host'),
              port: configService.get<number>('database.port'),
              username: configService.get<string>('database.username'),
              password: configService.get<string>('database.password'),
              database: configService.get<string>('database.name'),
              entities: [User, Media, Favourites],
              synchronize: true, // Set to false in production
          }),
      }),
      AuthModule,
      UsersModule,
      MediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
