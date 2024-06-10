import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ schema: 'donor' })
export class Donor {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'varchar', length: 20 })
  name_donor: string;

  @Column({ type: 'varchar', length: 20 })
  surname_donor: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'smallint', nullable: true })
  gender_ID: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'bigint', nullable: true, unique: true })
  telegram_ID: number;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'bigint', nullable: true })
  language_ID: number;
}
