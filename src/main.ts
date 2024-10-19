import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api/as')

  const cfg = new DocumentBuilder()
  .setTitle('As-Delivery')
  .setDescription('The Rest-api Documentation')
  .setVersion('1.0.0')
  // .addTag('Aset')
  .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
          },
          'JWT-auth',
        )
  .build()

  const doc = SwaggerModule.createDocument(app, cfg)
  SwaggerModule.setup('/api/as/docs', app, doc)

  await app.listen(3000);
}


bootstrap()
