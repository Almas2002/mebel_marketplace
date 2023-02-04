import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers:[],
  providers:[UserService],
  imports:[TypeOrmModule.forFeature([User]),forwardRef(()=>AuthModule),RoleModule],
  exports:[UserService]
})
export class UserModule{}