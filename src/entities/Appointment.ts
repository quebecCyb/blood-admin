import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { donor } from './Donor';

@Entity('appointment', { schema: 'data_blood' })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => donor, d => d.appointments)
  donor: donor;

  @Column()
  appointmentDate: Date;

  @Column()
  bloodType: string;
}