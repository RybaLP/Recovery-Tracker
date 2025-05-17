import { Module } from '@nestjs/common';
import { AddictionService } from './providers/addiction.service.';
import { AddictionController } from './addiction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addiction } from './addiction.entity';
import { UserModule } from 'src/user/user.module';
import { CreateAddictionProvider } from './providers/addiction.provider';
import { AddictionEditProvider} from './providers/addiction-edit.provider.ts';
import { FetchAddictionsProvider } from './providers/addiction-fetching.provider';
import { User } from 'src/user/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Addiction, User]), UserModule],
  providers: [AddictionService, CreateAddictionProvider, AddictionEditProvider, FetchAddictionsProvider],
  controllers: [AddictionController],
})
export class AddictionModule {}
