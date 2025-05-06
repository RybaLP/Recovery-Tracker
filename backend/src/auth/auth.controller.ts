import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post()
    @HttpCode(HttpStatus.OK)
    public signIn(@Body() loginUserDto : LoginUserDto){
        return this.authService.signIn(loginUserDto);
    }

    
}
