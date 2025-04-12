import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/user/user.entity";

@Entity()
export class RefreshToken{
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    token : string;

    @Column({type : "timestamp"})
    expiresAt : Date

    @ManyToOne(()=>User, (user)=>user.refreshTokens, {onDelete:"CASCADE"})
    @JoinColumn({name : "userId"})
    user : User;

    @Column()
    userId : number;
}