import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/user/providers/user.service';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class RefreshTokensProvider {

    constructor(

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        private readonly jwtService: JwtService,

        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,

        private readonly generateTokensProvider: GenerateTokensProvider

    ) { }

    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {

        try {
            /// verify refresh token 
            const { sub } = await this.jwtService.verifyAsync
                <Pick<ActiveUserData, 'sub'>>
                (refreshTokenDto.refreshToken, {
                    secret: this.jwtConfiguration.secret,
                    audience: this.jwtConfiguration.audience,
                    issuer: this.jwtConfiguration.issuer,
                });
            /// fetch user from db
            const user = await this.userService.findUserById(sub)


            ///  generate tokens 
            if (user) {
                return await this.generateTokensProvider.generateTokens(user)
            }
        } catch (error) {
            throw new UnauthorizedException(error);
        }


    }
}
