import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public')); // If you have static assets
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // Path to your views folder
  app.setViewEngine('hbs'); // Set Handlebars as the view engine

  await app.listen(3000);
}
bootstrap();
