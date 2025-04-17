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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenService],
  imports: [
    forwardRef(()=>UserModule),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : async (configService : ConfigService) => ({
        secret : configService.get<string>('JWT_SECRET'),
        signOptions : {expiresIn : '1h'}
      })
    }),
    TypeOrmModule.forFeature([RefreshToken])
  ],
  exports : [AuthService, JwtModule, RefreshTokenService]
})
export class AuthModule {}
