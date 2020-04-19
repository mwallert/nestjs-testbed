import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  const options = new DocumentBuilder()
    .setTitle('Express Api')
    .setDescription('First NestJs express app')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-swagger', app, document);

  await app.listen(3000);

  logger.log(`Application listening on port: 3000`);
}
bootstrap();
