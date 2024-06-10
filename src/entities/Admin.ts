import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'admin', name: 'admin' })
export class Admin {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  name_admin: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  clinic_ID?: number;

  @Column({default: ''})
  admin_has_news?: string = '';
}
