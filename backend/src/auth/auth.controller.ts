import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { Body } from '@nestjs/common';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Auth(AuthType.None)
    @Post()
    @HttpCode(HttpStatus.OK)
    public signIn(@Body() loginUserDto : LoginUserDto){
        return this.authService.signIn(loginUserDto);
    }

    @Auth(AuthType.None)
    @Post('refresh-tokens')
    public async refreshTokens(@Body() refreshTokensDto : RefreshTokenDto){
        return this.authService.refreshTokens(refreshTokensDto);
    }


    
}
