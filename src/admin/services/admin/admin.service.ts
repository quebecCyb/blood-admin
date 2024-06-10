import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../../entities/Admin';
import { createHmac } from 'crypto';
import { Appointment } from 'src/entities/Appointment';
import { Donor } from "../../../entities/Donor";
import { Clinic } from "../../../entities/Clinic";

const PERPAGE = 30;

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,

    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,

    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
  ) {}

  exists(username: string) {
    return this.adminRepository.exists({
      where: {
        name_admin: username,
      },
    });
  }

  findAppointments(page = 0) {
    return this.appointmentRepository.find({
      relations: ['donor', 'clinic'],
      skip: page * PERPAGE,
      take: PERPAGE,
    });
  }
  findAppointment(id: number) {
    return this.appointmentRepository.findOne({ relations: ['donor', 'clinic'], where: { ID: id || 0 } });
  }

  findDonors(page = 0) {
    return this.donorRepository.find({
      skip: page * PERPAGE,
      take: PERPAGE,
    });
  }
  findDonor(id: number) {
    return this.donorRepository.findOneBy({ ID: id || 0 });
  }

  findClinics(page = 0) {
    return this.clinicRepository.find({
      skip: page * PERPAGE,
      take: PERPAGE,
    });
  }
  findClinic(id: number) {
    return this.clinicRepository.findOne({ where: { ID: id || 0 } });
  }

  hashPassword(password: string, salt = 'skdafnefjej'): string {
    const hash = createHmac('sha256', salt);
    hash.update(password);
    return hash.digest('hex');
  }

  async getUser(
    username: string,
    password: string,
  ): Promise<Admin | undefined> {
    return await this.adminRepository.findOne({
      where: {
        name_admin: username,
        password: this.hashPassword(password, username),
      },
    });
  }

  async addUser(
    username: string,
    password: string,
  ): Promise<Admin | undefined> {
    const userData = {
      name_admin: username,
      password: this.hashPassword(password, username),
    };

    const user = await this.adminRepository.create(userData);

    await this.adminRepository.save(user);
    return user;
  }
}
