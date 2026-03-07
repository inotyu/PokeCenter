import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
const express = require('express');

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

let cachedServer: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'https://pokemon-center-frontend.vercel.app',
      'http://localhost:3000'
    ],
    credentials: true,
  });
  await app.init();
  return expressApp;
}

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  cachedServer(req, res);
}
