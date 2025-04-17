import { BadRequestException, Injectable, InternalServerErrorException, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/providers/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { RefreshTokenService } from './refresh-token.service';
import { User } from 'src/user/user.entity';
import { AuthResponseDto } from '../dto/auth.response.dto';

@Injectable()
export class AuthService {
    constructor(
         private readonly usersService : UserService
        ,private readonly jwtService : JwtService
        ,private readonly refreshTokenService : RefreshTokenService
    ){}

    public async signIn(loginUserDto : LoginUserDto) : Promise<AuthResponseDto>{
        let user : User | null = null;
        try {
            user = await this.usersService.findUserByLogin(loginUserDto.login)
        } catch (error) {
            throw new BadRequestException("User with this Login does not exist");
        }

        console.log(user);

        if(!user || !(await bcrypt.compare(loginUserDto.password, user.password))){
            throw new UnauthorizedException("Something went wrong with logging in !");
        }
        const payload = {sub : user.id, login : user.login};
        console.log(payload);     

        try {
            let accessToken = this.jwtService.sign(payload);
            let refreshTokenEntity = await this.refreshTokenService.generateRefreshToken(user);
            let refreshToken = refreshTokenEntity.token
            return {accessToken, refreshToken}

        } catch (error) {
            throw new InternalServerErrorException("Loging error");
        }
    }

    public async refreshAccessToken(refreshToken : string) : Promise<{access_token : string}> {
        const refreshTokenEntity = await this.refreshTokenService.findRefreshToken(refreshToken)
        if(!refreshTokenEntity){
            throw new UnauthorizedException("User is not logged in!")
        }

        const user = await this.usersService.findUserById(refreshTokenEntity.userId);
        if(!user){
            throw new BadRequestException("User not found !");
        }

        const payload = {sub : user.id, login : user.login};
        const accessToken = await this.jwtService.signAsync(payload);

        return {access_token : accessToken};
    }

    async removeRefreshToken(token : string) : Promise<void>{
        await this.refreshTokenService.deleteRefreshToken(token);
    }
    

}
