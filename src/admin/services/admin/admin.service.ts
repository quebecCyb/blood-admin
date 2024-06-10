import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../../entities/Admin';
import { createHmac } from 'crypto';
import { Appointment } from 'src/entities/Appointment';

const PERPAGE = 30;

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}


  findAppointments(page: number=0) {
    return this.appointmentRepository.find({skip: page * PERPAGE, take: PERPAGE })
  }


  hashPassword(password: string, salt: string = 'skdafnefjej'): string {
    const hash = createHmac('sha256', salt);
    hash.update(password);
    return hash.digest('hex');
  }

  async getUser(
    username: string,
    password: string,
  ): Promise<Admin | undefined> {
    return await this.adminRepository.findOne({
      where: { name_admin: username, password: this.hashPassword(password, username) },
    });
  }

  async addUser(
    username: string,
    password: string,
  ): Promise<Admin | undefined> {
    const userData = {
      name_admin: username,
      password: this.hashPassword(password, username)
    }

    let user = await this.adminRepository.create(userData);

    await this.adminRepository.save(user);
    return user;
  }
}

