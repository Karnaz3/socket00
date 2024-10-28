import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationException } from './application/exception/validation.exception';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  // prefix
  app.setGlobalPrefix('api');

  // -- Cors setup
  app.enableCors({
    origin: ['*', 'http://localhost:3000'], // Your Next.js frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  //  validation pipe
  app.useGlobalPipes(
    // new ParseFormDataJsonPipe({field: 'body'}),
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        // console.log(errors);
        return new ValidationException(errors);
      },
    }),
  );

  await app.listen(port, () => {
    Logger.log(`Server running on port ${port}`, 'Bootstrap');
  });
}
bootstrap();
