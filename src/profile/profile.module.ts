import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileController } from './profile.controller';

@Module({
  providers:[ProfileService],
  imports:[TypeOrmModule.forFeature([Profile])],
  controllers:[ProfileController],
  exports:[ProfileService]
})
export class ProfileModule{

}