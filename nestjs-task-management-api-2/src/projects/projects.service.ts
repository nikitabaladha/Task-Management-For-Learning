import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Project } from './schemas/project.schema.js';
import { CreateProjectDTO } from './dto/create-project.dto.js';
import { ProjectResponse } from './interfaces/project-response.js';
import { UpdateProjectDTO } from './dto/update-project.dto.js';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async createProject(
    createProjectDTO: CreateProjectDTO,
    createdById: string,
  ): Promise<ProjectResponse> {
    if (!Types.ObjectId.isValid(createdById)) {
      throw new BadRequestException('Invalid creator ID');
    }

    const newProject = await this.projectModel.create({
      name: createProjectDTO.name,
      description: createProjectDTO.description,
      createdById: new Types.ObjectId(createdById),
    });

    return {
      _id: newProject._id.toString(),
      name: newProject.name,
      description: newProject.description,
      createdById: newProject.createdById.toString(),
      createdAt: newProject.createdAt,
      updatedAt: newProject.updatedAt,
    };
  }

  async getProjects(): Promise<ProjectResponse[]> {
    const projects = await this.projectModel.find().exec();

    return projects.map((project): ProjectResponse => ({
      _id: project._id.toString(),
      name: project.name,
      description: project.description,
      createdById: project.createdById.toString(),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));
  }

  async getProjectById(id: string): Promise<ProjectResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid project ID');
    }

    const project = await this.projectModel.findById(id).exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return {
      _id: project._id.toString(),
      name: project.name,
      description: project.description,
      createdById: project.createdById.toString(),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  async updateProject(
    id: string,
    updateProjectDTO: UpdateProjectDTO,
  ): Promise<ProjectResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid project ID');
    }

    const updatedProject = await this.projectModel
      .findByIdAndUpdate(
        id,
        { $set: updateProjectDTO },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedProject) {
      throw new NotFoundException('Project not found');
    }

    return {
      _id: updatedProject._id.toString(),
      name: updatedProject.name,
      description: updatedProject.description,
      createdById: updatedProject.createdById.toString(),
      createdAt: updatedProject.createdAt,
      updatedAt: updatedProject.updatedAt,
    };
  }

  async deleteProject(id: string): Promise<ProjectResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid project ID');
    }

    const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();

    if (!deletedProject) {
      throw new NotFoundException('Project not found');
    }

    return {
      _id: deletedProject._id.toString(),
      name: deletedProject.name,
      description: deletedProject.description,
      createdById: deletedProject.createdById.toString(),
      createdAt: deletedProject.createdAt,
      updatedAt: deletedProject.updatedAt,
    };
  }
}
