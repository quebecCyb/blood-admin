import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Clinic } from './Clinic';

@Entity({ schema: 'admin' })
export class Admin {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'varchar', length: 50 })
  name_admin: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'bigint' })
  clinic_ID: number;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: 'clinic_ID' })
  clinic: Clinic;
}
