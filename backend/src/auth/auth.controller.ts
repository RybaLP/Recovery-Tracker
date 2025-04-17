import { Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common'; 
import { AuthService } from './providers/auth.service';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { Body } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { ApiBadRequestResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth.response.dto';

@ApiTags("Login Authentications + Tokens")
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){}

    // @HttpCode(HttpStatus.OK)
    // @Post('login')
    // async login (@Body() loginUserDto : LoginUserDto){
    //     try {
    //         const result = await this.authService.signIn(loginUserDto);
    //         console.log(result);
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     } 
    //     // throw new UnauthorizedException("Incorrect login or password")
    // }

 
    @Post('refresh')
    @ApiOperation({summary : "refresh access token"})
    @ApiCreatedResponse({description: "JWT generated successfuly!"})
    async refresh(@Body() refreshTokenDto : RefreshTokenDto){
        const {refreshToken} = refreshTokenDto;
        return this.authService.refreshAccessToken(refreshToken);
    }

    @Post('login')
    @ApiOperation({ summary: 'Logging existing User' })
    @ApiOkResponse({
        description: 'Loging successful.',
        type: AuthResponseDto, 
    })
    @ApiBadRequestResponse({ description: 'User with provided login or email already exists.' })
    @ApiUnauthorizedResponse({ description: 'Wrong login or password.' })
    @ApiInternalServerErrorResponse({ description: 'Server error during logging in.' })
    async signIn(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
        return this.authService.signIn(loginUserDto);
    }
}
