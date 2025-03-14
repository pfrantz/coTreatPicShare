import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe, VersioningType} from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 const configService = app.get(ConfigService);
 const port = configService.getOrThrow<number>('port');

  // prefix with api/v1  except for the root route
  app.setGlobalPrefix('api', {exclude: ['/']})
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1"
  })

  // enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  app.enableCors();

  // start up the server
  await app.listen(port);
}
bootstrap();
