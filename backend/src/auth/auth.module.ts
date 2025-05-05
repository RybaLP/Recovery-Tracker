import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from 'src/user/user.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';


@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide : HashingProvider,
    useClass : BcryptProvider
  }, ],                  /// in hashing provider is an abstract class
  imports : [forwardRef(()=>UserModule)],
  exports : [AuthService, HashingProvider]
})
export class AuthModule {}
