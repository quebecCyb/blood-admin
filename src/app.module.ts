import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {join} from "path";
import {ormConfig} from "./orm.config";
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static', // Set the route prefix for serving static files
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([]),
    AdminModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
