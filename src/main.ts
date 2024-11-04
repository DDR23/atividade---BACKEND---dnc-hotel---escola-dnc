import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { LoggingInterceptor } from './modules/shared/interceptors/logging.interceptor';

/**
 * Bootstrap function, responsible for creating the NestJS application and applying the following settings:
 * - ValidationPipe is used as a global pipe to validate all incoming requests
 * - CORS is enabled with no specific options
 * - LoggingInterceptor is not enabled by default
 * - Listens to the PORT environment variable or 3000 by default
 */
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
