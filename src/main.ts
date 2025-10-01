import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  // Swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Key Project API')
    .setDescription('API documentation for Key Project')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      defaultModelsExpandDepth: -1
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => console.log(`Server running in ${ process.env.NODE_ENV } => PORT ${ process.env.PORT }`))
  .catch((err) => console.error(err));
