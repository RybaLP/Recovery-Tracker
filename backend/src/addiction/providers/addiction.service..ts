import { Injectable } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateAddictionDto } from '../dto/create-addiction.dto';
import { CreateAddictionProvider } from './addiction.provider';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class AddictionService {

    constructor( private readonly createAddictionProvider : CreateAddictionProvider){}


    public createAddiction(createAddictionDto : CreateAddictionDto, user : ActiveUserData){
        return this.createAddictionProvider.createAddiction(createAddictionDto, user);
    }


}
