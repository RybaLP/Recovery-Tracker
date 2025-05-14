import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Addiction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: false
    })
    addictionName: string

    @Column({
        type: 'timestamp',
        nullable: false
    })
    startTime: Date;

    @Column({
        type: 'text',
        nullable: true
    })
    notes?: string


    //// connecting relation 
    @ManyToOne(() => User, user => user.addictions)
    user: User

}
