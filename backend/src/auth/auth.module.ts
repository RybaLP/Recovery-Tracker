import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategry';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './refreshToken.entity';
import { RefreshTokenService } from './providers/refresh-token.service';

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
    }),
    TypeOrmModule.forFeature([RefreshToken])
  ],
  exports : [AuthService, JwtModule, RefreshTokenService]
})
export class AuthModule {}
