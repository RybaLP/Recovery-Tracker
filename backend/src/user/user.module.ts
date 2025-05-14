import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './providers/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/create-user';
import jwtConfig from 'src/auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
    controllers : [UserController],
    imports : [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    forwardRef(()=>AuthModule),],
    providers : [UserService, CreateUserProvider,],
    exports : [UserService]
})

export class UserModule{}
