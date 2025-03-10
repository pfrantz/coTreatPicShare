import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import configuration  from './config';

@Module({
  imports: [
      ConfigModule.forRoot({
        load: [()=> configuration()],
        isGlobal: true,
      }),
      AuthModule,
      UsersModule,
      MediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
