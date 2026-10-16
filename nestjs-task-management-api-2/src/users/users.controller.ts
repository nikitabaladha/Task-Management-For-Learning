import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service.js';
import { UserResponse } from './interfaces/user.interface.js';
import { ApiResponseDTO } from '../common/dto/api-response.dto.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userservice: UsersService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Get()
  async getusers(): Promise<ApiResponseDTO<UserResponse[]>> {
    const users: UserResponse[] = await this.userservice.getUsers();

    return {
      success: true,
      message: 'Users fetched successfully',
      data: users,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin', 'User')
  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<UserResponse>> {
    const user: UserResponse = await this.userservice.getUserById(id);

    return {
      success: true,
      message: 'User fetched successfully',
      data: user,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDTO,
  ): Promise<ApiResponseDTO<UserResponse>> {
    const user: UserResponse = await this.userservice.createUser(createUserDto);

    return {
      success: true,
      message: 'User created successfully',
      data: user,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin', 'User')
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<ApiResponseDTO<UserResponse>> {
    const user: UserResponse = await this.userservice.updateUser(
      id,
      updateUserDto,
    );

    return {
      success: true,
      message: 'User updated successfully',
      data: user,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<UserResponse>> {
    const user: UserResponse = await this.userservice.deleteUser(id);

    return {
      success: true,
      message: 'User deleted successfully',
      data: user,
    };
  }
}
