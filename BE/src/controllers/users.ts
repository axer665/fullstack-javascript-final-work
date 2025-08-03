import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@decorators/roles.decorator';
import { GuardJwtAuth } from '@guards/authGuard';
import { GuardRole } from '@guards/roleGuard';
import { ID } from '@helpers/global';
import { SearchDto } from '@dto/users/search';
import { UpdateDto } from '@dto//users/update';
import { Users } from '@schema/users/users';
import { UsersService } from '@services/users';

@Controller('api/users')
@UseGuards(GuardJwtAuth, GuardRole)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('admin', 'manager')
  searchUsers(@Query() searchParams: Partial<SearchDto>): Promise<Users[]> {
    return this.usersService.findAll(searchParams);
  }

  @Put(':id')
  @Roles('admin')
  updateRole(
    @Param('id') userId: ID,
    @Body() updateRoleDto: UpdateDto,
  ): Promise<Users> {
    return this.usersService.updateRole(userId, updateRoleDto.role);
  }
}
