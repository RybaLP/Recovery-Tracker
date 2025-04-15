import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/providers/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { RefreshTokenService } from './refresh-token.service';
import { warn } from 'node:console';

@Injectable()
export class AuthService {
    constructor(
         private readonly usersService : UserService
        ,private readonly jwtService : JwtService
        ,private readonly refreshTokenService : RefreshTokenService
    ){}

    /// logging business logic

    public async signIn(loginUserDto : LoginUserDto) : Promise<{access_token:string, refreshToken : string}>{
        const user = await this.usersService.findUserByLogin(loginUserDto.login);
        console.log(user);
        if(!user || !(await bcrypt.compare(loginUserDto.password, user.password))){
            throw new Error("Something went wrong with logging in !");
        }
        const payload = {sub : user.id, login : user.login};
        console.log(payload);
        const access_token = await this.jwtService.signAsync(payload);
        const refreshToken = await this.refreshTokenService.generateRefreshToken(user)
        return {access_token, refreshToken: refreshToken.token};
    }

    public async refreshAccessToken(refreshToken : string) : Promise<{access_token : string}> {
        const refreshTokenEntity = await this.refreshTokenService.findRefreshToken(refreshToken)
        if(!refreshTokenEntity){
            throw new UnauthorizedException("User is not logged in!")
        }

        const user = await this.usersService.findUserById(refreshTokenEntity.userId);
        if(!user){
            throw new Error("User not found ! ");
        }

        const payload = {sub : user.id, login : user.login};
        const accessToken = await this.jwtService.signAsync(payload);

        return {access_token : accessToken};
    }

    async removeRefreshToken(token : string) : Promise<void>{
        await this.refreshTokenService.deleteRefreshToken(token);
    }
    

}
