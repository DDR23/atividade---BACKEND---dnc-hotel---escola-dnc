import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { LoggingInterceptor } from './modules/shared/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    // EXEMPLOS DE OPTIONS DO CORS
    // origin: 'http://localhost:3000',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type, Accept',
    // credentials: true,
  });
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
