import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe, VersioningType} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  // start up the server
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
