import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { UserService } from 'src/user/providers/user.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,

        private readonly hashingProvider : HashingProvider,

        private readonly jwtService : JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguraion : ConfigType<typeof jwtConfig>,


        @Inject(forwardRef(()=>UserService))
        private readonly userSerice : UserService
    ){}

    public signIn = async (loginUserDto : LoginUserDto) => {
        let existingUser : User | null = null;

        try {
            existingUser = await this.userRepository.findOne({
                where : {
                    login : loginUserDto.login
                }
            })
        } catch (error) {
            throw new RequestTimeoutException(error, {description : "Could not fetch the user"})
        }

        if(!existingUser){
            throw new BadRequestException("User with this login does not exist");
        }

        try {
            await this.hashingProvider.comparePassword(loginUserDto.password, existingUser.password)
        }
        catch (error) {
            throw new UnauthorizedException("Provided password does not match to account");
        }

        const accessToken = await this.jwtService.signAsync({
            sub: existingUser.id,
            email : existingUser.email,
            login : existingUser.login,
        }, {
            audience : this.jwtConfiguraion.audience,
            issuer : this.jwtConfiguraion.issuer,
            secret : this.jwtConfiguraion.secret,
            expiresIn : this.jwtConfiguraion.accessTokenTtl
        })

        return {accessToken}
    }
}
