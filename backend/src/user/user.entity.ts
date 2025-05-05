import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        nullable : true,
        length : 25,
        type : 'varchar'
    })
    firstName? : string;

    @Column({
        nullable : true,
        length : 25,
        type : 'varchar'
    })
    lastName? : string;

    @Column({
        nullable : false,
        unique : true,
        length : 20
    })
    login : string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
    })
    password : string;

    @Column({
        type : 'varchar',
        length : 45,
        nullable : false
    })
    email : string;

}