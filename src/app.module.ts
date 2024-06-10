import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { Admin } from './entities/Admin';
import * as session from 'express-session';
import { SessionModule } from 'nestjs-session';
import * as process from 'process';
import { JwtModule } from '@nestjs/jwt';
import { config } from "dotenv";
import { Appointment } from "./entities/Appointment";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public', // Set the route prefix for serving static files
    }),
    SessionModule.forRoot({
      session: {
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Admin, Appointment],
      synchronize: false,
      logging: false,
      driver: require('mysql2'), // добавьте эту строку
      migrations: [__dirname + '/src/migrations/*.ts'],
      // cli: {
      //   migrationsDir: 'src/migrations',
      // },
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use a secure key
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
    AdminModule,
 
  ],

  controllers: [AppController],
  providers: [
    AppService,

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: process.env.JWT_SECRET,
          resave: false,
          saveUninitialized: false,
          cookie: { maxAge: 3600000 }, // 1 hour
        }),
      )
      .forRoutes('*');
  }
}
