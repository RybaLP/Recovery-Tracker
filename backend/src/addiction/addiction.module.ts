import { Module } from '@nestjs/common';
import { AddictionService } from './providers/addiction.service.';
import { AddictionController } from './addiction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addiction } from './addiction.entity';
import { UserModule } from 'src/user/user.module';
import { CreateAddictionProvider } from './providers/addiction.provider';

@Module({
  imports : [TypeOrmModule.forFeature([Addiction]), UserModule],
  providers: [AddictionService, CreateAddictionProvider],
  controllers: [AddictionController],
})
export class AddictionModule {}
