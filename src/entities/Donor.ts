import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";

@Entity({ schema: 'donor', name: 'donor' })
export class donor {

    
    @PrimaryGeneratedColumn()
    ID: number;


    @OneToMany(() => Appointment, a => a.donor)
    appointments: Appointment[];

    @Column({default: ''})
    name_donor: string;

    @Column()
    surname_donor: string;
    
    @Column()
    password: string;

    @Column({default: false})
    date_of_birth: string;

}

