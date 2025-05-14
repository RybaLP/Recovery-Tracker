import { Body, Controller, SetMetadata } from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dto/createUser.dto.';
import { LoginUserDto } from './dto/loginUser.dto';
import { ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { CreateUserProvider } from './providers/create-user';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@ApiTags('User credentials')
@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService,
                    private readonly createUserProvider : CreateUserProvider
    ){}
    

    // @UseGuards(AccessTokenGuard)


    @Post('register')
    // @SetMetadata('authType', 'None') 

    @Auth(AuthType.None, AuthType.Bearer)
    @ApiOperation({summary : 'Registering new user'})
    @ApiCreatedResponse({
        description : "User was registered successfuly",
        type : User
    })
    @ApiBadRequestResponse({description: "User with provived fields already exists"})
    @ApiInternalServerErrorResponse({description : "Server error"})
    async create(@Body(ValidationPipe) createUserDto : CreateUserDto){
        this.userService.createUser(createUserDto);
    }
}
