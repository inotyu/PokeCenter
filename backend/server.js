const express = require('express');
const cors = require('cors');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/src/app.module');

const server = express();

// CORS
server.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

server.use(express.json());

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule, express());
    app.useGlobalPipes(new (require('@nestjs/common').ValidationPipe)({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }));
    await app.init();
  }
  return app;
}

// Proxy all requests to NestJS
server.use('*', async (req, res) => {
  const nestApp = await bootstrap();
  nestApp.getHttpServer().emit('request', req, res);
});

module.exports = server;
