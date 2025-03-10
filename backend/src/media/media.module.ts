import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import {AuthGuard} from "../auth/auth.guard";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:[JwtModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
