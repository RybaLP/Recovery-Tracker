import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Module } from "@nestjs/common"
import { User } from './user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuardTsGuard } from './auth/guards/authentication.guard.ts/authentication.guard.ts.guard';
import { AddictionModule } from './addiction/addiction.module';
import { Addiction } from './addiction/addiction.entity';
import { UserService } from './user/providers/user.service';


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'elozelo',
      database: 'addiction-application',
      entities: [User, Addiction],
      synchronize: true,
    }),
    AuthModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    AddictionModule
  ],
  controllers: [AppController],
  providers: [AppService,{provide : APP_GUARD, useClass : AuthenticationGuardTsGuard},
    AccessTokenGuard
  ], 
  // this line of code (except appservice) makes the whole application guarded, 
  // that means, every endpoint requires authorization, to disable it, just delete 
  // this object with configuration

})
export class AppModule { }
