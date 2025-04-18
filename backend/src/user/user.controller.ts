import { Body, Controller } from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dto/createUser.dto.';
import { LoginUserDto } from './dto/loginUser.dto';
import { ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';


@ApiTags('User credentials')
@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService){}

    
    @Post('register')
    @ApiOperation({summary : 'Registering new user'})
    @ApiCreatedResponse({
        description : "User was registered successfuly",
        type : User
    })
    @ApiBadRequestResponse({description: "User with provived fields already exists"})
    @ApiInternalServerErrorResponse({description : "Server error"})
    async create(@Body(ValidationPipe) createUserDto : CreateUserDto){
        return this.userService.register(createUserDto);
    }
}
