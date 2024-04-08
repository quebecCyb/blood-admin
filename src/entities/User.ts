import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, BeforeInsert, Unique, JoinColumn, OneToOne } from 'typeorm';
import {UserType} from "../schemas/user.enum";

@Unique(["email"])
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    name?: string;

    @Column()
    email: string;

    @Column({default: ''})
    phone?: string

    @Column()
    password: string;

    @Column({default: false})
    verified: boolean;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.DEFAULT,
    })
    type: UserType;

    @Column({nullable: true})
    share?: number; // Partner Default 20%

    @CreateDateColumn()
    createdAt: Date;
}
