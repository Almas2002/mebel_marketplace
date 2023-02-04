import { Controller, Get, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller()
export class RoleController {
  constructor(private roleService: RoleService) {
  }

  @Post('create-role')
  createRole(dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get('get-roles')
  getRoles() {
    return this.roleService.getRoles();
  }

  @Put('update-role')
  updateRole(dto: CreateRoleDto & { id: number }) {
    return this.roleService.updateRole(dto.id, dto);
  }
}