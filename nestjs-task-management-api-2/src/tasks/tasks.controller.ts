import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import type { Request } from 'express';

import { TasksService } from './tasks.service.js';
import { CreateTaskDTO } from './dto/create-task.dto.js';
import { UpdateTaskDTO } from './dto/update-task.dto.js';
import { TaskResponse } from './interfaces/task-response.js';
import { ApiResponseDTO } from '../common/dto/api-response.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { UserResponse } from '../users/interfaces/user.interface.js';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    sub: UserResponse['_id'];
    email: UserResponse['email'];
    role: UserResponse['role'];
  };
};

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin', 'User')
  @Post()
  async createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @Req() request: AuthenticatedRequest,
  ): Promise<ApiResponseDTO<TaskResponse>> {
    const task: TaskResponse = await this.tasksService.createTask(
      createTaskDTO,
      request.user.sub,
      request.user.role,
    );

    return {
      success: true,
      message: 'Task created successfully',
      data: task,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Get()
  async getTasks(): Promise<ApiResponseDTO<TaskResponse[]>> {
    const tasks: TaskResponse[] = await this.tasksService.getTasks();

    return {
      success: true,
      message: 'Tasks fetched successfully',
      data: tasks,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin', 'User')
  @Get('my-tasks')
  async getMyTasks(
    @Req() request: AuthenticatedRequest,
  ): Promise<ApiResponseDTO<TaskResponse[]>> {
    const tasks: TaskResponse[] = await this.tasksService.getMyTasks(
      request.user.sub,
    );

    return {
      success: true,
      message: 'My tasks fetched successfully',
      data: tasks,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin', 'User')
  @Get(':id')
  async getTaskById(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<TaskResponse>> {
    const task: TaskResponse = await this.tasksService.getTaskById(id);

    return {
      success: true,
      message: 'Task fetched successfully',
      data: task,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin', 'User')
  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
    @Req() request: AuthenticatedRequest,
  ): Promise<ApiResponseDTO<TaskResponse>> {
    const task: TaskResponse = await this.tasksService.updateTask(
      id,
      updateTaskDTO,
      request.user.role,
    );

    return {
      success: true,
      message: 'Task updated successfully',
      data: task,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin', 'User')
  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<ApiResponseDTO<TaskResponse>> {
    const task: TaskResponse = await this.tasksService.updateTaskStatus(
      id,
      updateTaskStatusDTO.status,
    );

    return {
      success: true,
      message: 'Task status updated successfully',
      data: task,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<TaskResponse>> {
    const task: TaskResponse = await this.tasksService.deleteTask(id);

    return {
      success: true,
      message: 'Task deleted successfully',
      data: task,
    };
  }
}
