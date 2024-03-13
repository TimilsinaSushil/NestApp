import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); //adds 'api' prefix to every route
  app.useGlobalPipes(new ValidationPipe()) //npm i --save class-validator class-transformer
  await app.listen(3000);
}
bootstrap();
