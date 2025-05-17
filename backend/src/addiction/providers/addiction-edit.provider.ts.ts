import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Addiction } from '../addiction.entity';
import { Repository } from 'typeorm';
import { EditAddictionDto } from '../dto/edit-addiction.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class AddictionEditProvider {
    constructor(
        @InjectRepository(Addiction)
        private readonly addictionRepository : Repository<Addiction>
    ){}

    public editAddiction = async (addictionId : number , editAddictionDto : EditAddictionDto, user : ActiveUserData)
    : Promise<Addiction> => {
        try {
            const addiction = await this.addictionRepository.findOne({
                where : {id : addictionId, user : {id : user.sub}
            }});

            if(!addiction){
                throw new Error("")
            }

            Object.assign(addiction, editAddictionDto);
            const updatedAddiction = await this.addictionRepository.save(addiction);
            return updatedAddiction;

        } catch (error) {
            throw new Error("");
        }

    }

}


