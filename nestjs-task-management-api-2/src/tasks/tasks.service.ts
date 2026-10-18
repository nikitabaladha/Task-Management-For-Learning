import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task, TaskPriority, TaskStatus } from './schemas/task.schema.js';
import { Project } from '../projects/schemas/project.schema.js';
import { CreateTaskDTO } from './dto/create-task.dto.js';
import { UpdateTaskDTO } from './dto/update-task.dto.js';
import { TaskResponse } from './interfaces/task-response.js';
import type { ProjectResponse } from '../projects/interfaces/project-response.js';
import type { UserResponse } from '../users/interfaces/user.interface.js';

type PopulatedUser = Omit<UserResponse, '_id'> & {
  _id: Types.ObjectId;
};

type PopulatedProject = Omit<
  ProjectResponse,
  '_id' | 'createdById' | 'createdBy'
> & {
  _id: Types.ObjectId;
  createdById: Types.ObjectId;
};

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,

    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async createTask(
    createTaskDTO: CreateTaskDTO,
    createdById: string,
  ): Promise<TaskResponse> {
    if (!Types.ObjectId.isValid(createdById)) {
      throw new BadRequestException('Invalid creator ID');
    }

    if (!Types.ObjectId.isValid(createTaskDTO.projectId)) {
      throw new BadRequestException('Invalid project ID');
    }

    const project = await this.projectModel
      .findById(createTaskDTO.projectId)
      .exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const newTask = await this.taskModel.create({
      title: createTaskDTO.title,
      description: createTaskDTO.description,
      status: createTaskDTO.status ?? TaskStatus.PENDING,
      priority: createTaskDTO.priority ?? TaskPriority.MEDIUM,
      projectId: new Types.ObjectId(createTaskDTO.projectId),
      createdById: new Types.ObjectId(createdById),
    });

    return {
      _id: newTask._id.toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      projectId: newTask.projectId.toString(),
      createdById: newTask.createdById.toString(),
      createdAt: newTask.createdAt,
      updatedAt: newTask.updatedAt,
    };
  }

  async getTasks(): Promise<TaskResponse[]> {
    const tasks = await this.taskModel
      .find()
      .populate<{ projectId: PopulatedProject | null }>(
        'projectId',
        'name description createdById createdAt updatedAt',
      )
      .populate<{ createdById: PopulatedUser | null }>(
        'createdById',
        'name email role',
      )
      .exec();

    return tasks.map((task): TaskResponse => {
      const project = task.projectId;
      const creator = task.createdById;

      return {
        _id: task._id.toString(),
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        projectId: project?._id.toString() ?? '',
        project: project
          ? {
              _id: project._id.toString(),
              name: project.name,
              description: project.description,
              createdById: project.createdById.toString(),
              createdAt: project.createdAt,
              updatedAt: project.updatedAt,
            }
          : undefined,
        createdById: creator?._id.toString() ?? '',
        createdBy: creator
          ? {
              _id: creator._id.toString(),
              name: creator.name,
              email: creator.email,
              role: creator.role,
            }
          : undefined,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      };
    });
  }

  async getTaskById(id: string): Promise<TaskResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid task ID');
    }

    const task = await this.taskModel
      .findById(id)
      .populate<{ projectId: PopulatedProject | null }>(
        'projectId',
        'name description createdById createdAt updatedAt',
      )
      .populate<{ createdById: PopulatedUser | null }>(
        'createdById',
        'name email role',
      )
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const project = task.projectId;
    const creator = task.createdById;

    return {
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      projectId: project?._id.toString() ?? '',
      project: project
        ? {
            _id: project._id.toString(),
            name: project.name,
            description: project.description,
            createdById: project.createdById.toString(),
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
          }
        : undefined,
      createdById: creator?._id.toString() ?? '',
      createdBy: creator
        ? {
            _id: creator._id.toString(),
            name: creator.name,
            email: creator.email,
            role: creator.role,
          }
        : undefined,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  async updateTask(
    id: string,
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<TaskResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid task ID');
    }

    const updatedTask = await this.taskModel
      .findByIdAndUpdate(
        id,
        { $set: updateTaskDTO },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }

    return {
      _id: updatedTask._id.toString(),
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
      priority: updatedTask.priority,
      projectId: updatedTask.projectId.toString(),
      createdById: updatedTask.createdById.toString(),
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt,
    };
  }

  async deleteTask(id: string): Promise<TaskResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid task ID');
    }

    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();

    if (!deletedTask) {
      throw new NotFoundException('Task not found');
    }

    return {
      _id: deletedTask._id.toString(),
      title: deletedTask.title,
      description: deletedTask.description,
      status: deletedTask.status,
      priority: deletedTask.priority,
      projectId: deletedTask.projectId.toString(),
      createdById: deletedTask.createdById.toString(),
      createdAt: deletedTask.createdAt,
      updatedAt: deletedTask.updatedAt,
    };
  }
}
