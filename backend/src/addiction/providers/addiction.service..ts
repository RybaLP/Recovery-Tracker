import { Injectable } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateAddictionDto } from '../dto/create-addiction.dto';
import { CreateAddictionProvider } from './addiction.provider';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { FetchAddictionsProvider } from './addiction-fetching.provider';
import { AddictionEditProvider } from './addiction-edit.provider.ts';
import { EditAddictionDto } from '../dto/edit-addiction.dto';

@Injectable()
export class AddictionService {

    constructor( private readonly createAddictionProvider : CreateAddictionProvider,
        private readonly fetchAddictionsProvider : FetchAddictionsProvider,
        private readonly addictionEditProvider : AddictionEditProvider
    ){}


    public createAddiction(createAddictionDto : CreateAddictionDto, user : ActiveUserData){
        return this.createAddictionProvider.createAddiction(createAddictionDto, user);
    }

    public fetchAddictions(@ActiveUser() user : ActiveUserData){
        return this.fetchAddictionsProvider.fetchAddictionsUser(user);
    }

    public editAddiction(addictionId : number, editAddictionDto : EditAddictionDto, user : ActiveUserData ){
        return this.addictionEditProvider.editAddiction(addictionId,editAddictionDto, user)
    }
}
