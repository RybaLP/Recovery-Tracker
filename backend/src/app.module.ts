import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { RefreshToken } from './auth/refreshToken.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath : ".env",
        isGlobal : true
    }),
  
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'elozelo',
      database: 'addictions_db',
      entities: [User, RefreshToken],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
