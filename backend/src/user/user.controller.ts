import { Body, Controller } from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dto/createUser.dto.';
import { LoginUserDto } from './dto/loginUser.dto';


@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService){

    }
    
    @Post()
    public async create(@Body() createUserDto : CreateUserDto){
        return this.userService.register(createUserDto);
    }

}
