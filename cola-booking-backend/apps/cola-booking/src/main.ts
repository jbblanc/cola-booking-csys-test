import { NestFactory } from '@nestjs/core';
import { ColaBookingModule } from './cola-booking.module';
import 'dotenv/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as expressWinston from 'express-winston';
import { httpLoggerConfig } from '../config/logger-http.config';
import { isEnvDevelopmentOrLocal } from '@colabooking/commons/helpers';

function initSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Cola Booking API - Cola Corp.')
    .setDescription('This API enables rooms booking')
    .setVersion('1.0-BETA')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

function getCorsOrigin(): string[] {
  return process.env.CORS_ORIGIN.split(',');
}

async function bootstrap() {
  const app = await NestFactory.create(ColaBookingModule);
  if (isEnvDevelopmentOrLocal()) {
    app.enableCors();
  } else {
    app.enableCors({
      origin: getCorsOrigin(),
    });
  }
  // Event Logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // HTTP Logger
  app.use(expressWinston.logger(httpLoggerConfig));
  if (process.env.NODE_ENV !== 'production') {
    initSwagger(app);
  }
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
