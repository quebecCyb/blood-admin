import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Clinic } from "./Clinic";
import { Donor } from "./Donor";

@Entity({ schema: 'data_blood' })
export class Appointment {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'bigint' })
  clinic_ID: number;

  @ManyToOne(() => Donor)
  @JoinColumn({ name: 'donor_number_ID' })
  donor: Donor;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: 'clinic_ID' })
  clinic: Clinic;

  @Column({ type: 'bigint' })
  donor_number_ID: number;

  @Column({ type: 'smallint', nullable: true })
  status_ID: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  registration_date: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  appointment_date: Date;

  @Column({ type: 'text', nullable: true })
  analysis_file_path: string;
}
