import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); //adds 'api' prefix to every route
  app.useGlobalPipes(new ValidationPipe()) //npm i --save class-validator class-transformer
  app.use(cookieParser()); //For parsing cookies from client side
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials:true  //it means we will pass cookies back and fourth with every request
  })
  await app.listen(3000);
}
bootstrap();
