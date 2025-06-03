import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration globale de validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  // Configuration CORS pour Next.js
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  
  // Préfixe global pour les routes API
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT || 4000);
  console.log(`🚀 Serveur démarré sur le port ${process.env.PORT || 4000}`);
}
bootstrap();
