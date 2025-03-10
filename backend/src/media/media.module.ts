import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Favourites, Media} from "./entities/media.entity";

@Module({
  imports:[JwtModule, TypeOrmModule.forFeature([Media, Favourites])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
