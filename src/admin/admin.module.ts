import { Module } from '@nestjs/common';
import { AdminService } from './services/admin/admin.service';
import { AdminController } from './controllers/admin/admin.controller';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../entities/Admin';
import { Appointment } from 'src/entities/Appointment';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Appointment]),
    JwtModule.register({
      secret: 'hgcdhasfakjsdkjdkljs', // Use a secure key
      signOptions: { expiresIn: '60m' }, // Token expiration time
      
    }),
  ],
  providers: [AdminService],
  controllers: [AdminController],
   
})
export class AdminModule {}
