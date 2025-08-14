import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configurar validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: true, // Lança erro se propriedades extras forem enviadas
      transform: true, // Transforma automaticamente os tipos
    }),
  );

  // Configurar porta
  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🐦 API Pombo Correio rodando na porta ${port}`);
  console.log(`📖 Documentação: http://localhost:${port}`);
}

bootstrap();
