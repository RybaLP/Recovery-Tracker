import { Injectable, ValidationPipe } from '@nestjs/common';
import { SignInProvider } from './sign-in.provider';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class AuthService {

    constructor(private readonly signInProvider : SignInProvider,
        private readonly refreshTokenProvider : RefreshTokensProvider
    ){}

    public signIn( loginUserDto : LoginUserDto){
        return this.signInProvider.signIn(loginUserDto);
    }

    public async refreshTokens(refreshTokensDto : RefreshTokenDto){
        return await this.refreshTokenProvider.refreshTokens(refreshTokensDto)
    }

}
