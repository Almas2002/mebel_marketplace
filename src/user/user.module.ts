import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';
import { CartService } from '../cart/service/cart.service';
import { CartModule } from '../cart/cart.module';

@Module({
  controllers:[],
  providers:[UserService],
  imports:[TypeOrmModule.forFeature([User]),forwardRef(()=>AuthModule),RoleModule,ProfileModule,CartModule],
  exports:[UserService]
})
export class UserModule{}