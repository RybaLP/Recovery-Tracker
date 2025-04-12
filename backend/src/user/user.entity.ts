import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column({
        unique : true,
    })
    login : string;

    @Column()
    password : string;

    @Column()
    email : string;

    @Column()
    refreshTokens : string;

}