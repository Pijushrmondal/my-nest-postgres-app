import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));

  const port = 3000;
  const swaggerDocUrl = 'api-docs';

  // Global API prefix
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('My Nest API')
    .setDescription('API documentation with Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerDocUrl, app, document);

  await app.listen(port);

  // 🖥️ Console logs with clickable Swagger URL
  console.log('---------------------------------');
  const link = `http://localhost:${port}/${swaggerDocUrl}`;
  console.log(`📖 Swagger Docs: \x1b]8;;${link}\x1b\\${link}\x1b]8;;\x1b\\`);
}
bootstrap();