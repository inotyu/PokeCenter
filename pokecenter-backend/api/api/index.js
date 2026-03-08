"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const platform_express_1 = require("@nestjs/platform-express");
const common_1 = require("@nestjs/common");
const express = require('express');
const expressApp = express();
const adapter = new platform_express_1.ExpressAdapter(expressApp);
let cachedServer;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    app.enableCors({
        // CORS configured for production domains
        origin: [
            'https://pokecenter-kohl.vercel.app',
            'https://pokecenter.vercel.app',
            'https://pokemon-center-frontend.vercel.app',
            'http://localhost:3000',
            ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
        ],
        credentials: true,
    });
    await app.init();
    return expressApp;
}
async function handler(req, res) {
    if (!cachedServer) {
        cachedServer = await bootstrap();
    }
    cachedServer(req, res);
}
