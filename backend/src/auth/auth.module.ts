import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from 'src/user/user.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';


@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide : HashingProvider,
    useClass : BcryptProvider  /// in hashing provider is an abstract class
  }, SignInProvider, GenerateTokensProvider, RefreshTokensProvider],                  
  imports : [forwardRef(()=>UserModule),ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TypeOrmModule.forFeature([User])
  ],
  exports : [AuthService, HashingProvider]
})
export class AuthModule {}
