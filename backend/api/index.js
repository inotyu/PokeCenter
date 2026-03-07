const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');

let app;

module.exports = async (req, res) => {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    });
    app.setGlobalPrefix('api');
    await app.init();
  }
  
  const server = app.getHttpServer();
  server.emit('request', req, res);
};
