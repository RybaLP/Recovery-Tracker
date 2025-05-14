import { Body, Controller } from '@nestjs/common';
import { Post, Req } from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { AddictionService } from './providers/addiction.service.';
import { CreateAddictionDto } from './dto/create-addiction.dto';

@Controller('addiction')
export class AddictionController {
    constructor(private readonly addictionService : AddictionService){}

    @Post('create')
    public createAddiction(@ActiveUser() user : ActiveUserData,
    @Body() createAddictionDto : CreateAddictionDto){
        return this.addictionService.createAddiction(createAddictionDto, user);
    }


}
