import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  controllers:[],
  providers:[UserService],
  imports:[TypeOrmModule.forFeature([User]),forwardRef(()=>AuthModule),RoleModule,ProfileModule],
  exports:[UserService]
})
export class UserModule{}