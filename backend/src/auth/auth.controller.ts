import { Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
// import { Repository } from 'typeorm';   
import { AuthService } from './providers/auth.service';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { Body } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login (@Body() loginUserDto : LoginUserDto){
        try {
            const result = await this.authService.signIn(loginUserDto);
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        } 
        // throw new UnauthorizedException("Incorrect login or password")
    }

 
    @Post('refresh')
    async refresh(@Body() refreshTokenDto : RefreshTokenDto){
        const {refreshToken} = refreshTokenDto;
        return this.authService.refreshAccessToken(refreshToken);
    }

    // @UseGuards(LocalAuthGuard)
    // @Post('auth/login')
    // async login(@Request() req){
    //     return req.user;
    // }


    // @UseGuards(LocalAuthGuard)
    // @Post('auth/logout')
    // async logout(@Request() req) {
    // return req.logout();
    // }

}
