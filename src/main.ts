import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { config as loadEnv } from 'dotenv';
import * as exphbs from 'express-handlebars';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const helpers = {
    hlp: (echo) => `Echo: ${echo}.`,
    json: (text) => JSON.stringify(text),
    upper: (text) => `${text}`.toUpperCase(),
    lower: (text) => `${text}`.toLowerCase(),
    logo: (text) => `${text}`.toLowerCase().replace(/ /g, '-'),
    date: (date) => `${date}`.split(' ').slice(0, 5).join(' '),
  };

  const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, '..', 'views', 'layouts'),
    partialsDir: [
      join(__dirname, '..', 'views', 'incs'),
    ],
    helpers,
  });

  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.engine('hbs', hbs.engine);
  app.setViewEngine('hbs');


  await app.listen(3000);
}
loadEnv();
bootstrap();
