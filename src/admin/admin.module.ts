import { Module } from '@nestjs/common';
import { AdminService } from './services/admin/admin.service';
import { AdminController } from './controllers/admin/admin.controller';

@Module({
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
