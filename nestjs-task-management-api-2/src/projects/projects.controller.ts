import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import type { Request } from 'express';

import { ProjectsService } from './projects.service.js';
import { CreateProjectDTO } from './dto/create-project.dto.js';
import { ProjectResponse } from './interfaces/project-response.js';
import { ApiResponseDTO } from '../common/dto/api-response.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { UserResponse } from '../users/interfaces/user.interface.js';
import { UpdateProjectDTO } from './dto/update-project.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    sub: UserResponse['_id'];
    email: UserResponse['email'];
    role: UserResponse['role'];
  };
};

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post()
  async createProject(
    @Body() createProjectDTO: CreateProjectDTO,
    @Req() request: AuthenticatedRequest,
  ): Promise<ApiResponseDTO<ProjectResponse>> {
    const project: ProjectResponse = await this.projectsService.createProject(
      createProjectDTO,
      request.user.sub,
    );

    return {
      success: true,
      message: 'Project created successfully',
      data: project,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Get()
  async getProjects(): Promise<ApiResponseDTO<ProjectResponse[]>> {
    const projects: ProjectResponse[] =
      await this.projectsService.getProjects();

    return {
      success: true,
      message: 'Projects fetched successfully',
      data: projects,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Get(':id')
  async getProjectById(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<ProjectResponse>> {
    const project: ProjectResponse =
      await this.projectsService.getProjectById(id);

    return {
      success: true,
      message: 'Project fetched successfully',
      data: project,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDTO: UpdateProjectDTO,
  ): Promise<ApiResponseDTO<ProjectResponse>> {
    const project: ProjectResponse = await this.projectsService.updateProject(
      id,
      updateProjectDTO,
    );

    return {
      success: true,
      message: 'Project updated successfully',
      data: project,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  async deleteProject(
    @Param('id') id: string,
  ): Promise<ApiResponseDTO<ProjectResponse>> {
    const project: ProjectResponse =
      await this.projectsService.deleteProject(id);

    return {
      success: true,
      message: 'Project deleted successfully',
      data: project,
    };
  }
}
