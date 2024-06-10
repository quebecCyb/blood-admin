import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ schema: 'data_blood' })
export class Clinic {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'varchar', length: 30 })
  clinic_name: string;

  @Column({ type: 'bigint', unique: true })
  address_ID: number;

  @Column({ type: 'text' })
  working_hours: string;
}
