import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategry';

const secret = process.env.JWT_SECRET;
if(!secret){
  throw new Error("JWT_SECRET must be provided in .env!")
}

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [forwardRef(()=>UserModule),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret : secret,
      signOptions : {expiresIn : '1h'}
    })
  ],
  exports : [AuthService, JwtModule]
})
export class AuthModule {}
