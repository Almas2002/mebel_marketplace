import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../../decorators/role.decorator';
import { IMyRequestInterface } from '../../interface/IMyrequestInterface';


@Injectable()
export class RoleGuards implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest<IMyRequestInterface>();
      if (!req.user) {
        throw new UnauthorizedException('вы не зарегестрированы');
      }
      return req.user.roles.some(role => requiredRoles.includes(role.value));

    } catch (e) {
      throw new HttpException('У вас нет прав для этого действие', 403);
    }

  }

}