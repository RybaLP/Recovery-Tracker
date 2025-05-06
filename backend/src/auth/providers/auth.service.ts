import { Injectable, ValidationPipe } from '@nestjs/common';
import { SignInProvider } from './sign-in.provider';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';

@Injectable()
export class AuthService {

    constructor(private readonly signInProvider : SignInProvider){}

    public signIn( loginUserDto : LoginUserDto){
        return this.signInProvider.signIn(loginUserDto);
    }
    
}
