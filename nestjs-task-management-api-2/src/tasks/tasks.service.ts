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
    const tasks = await this.taskModel.find().exec();

    return tasks.map((task): TaskResponse => ({
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      projectId: task.projectId.toString(),
      createdById: task.createdById.toString(),
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));
  }

  async getTaskById(id: string): Promise<TaskResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid task ID');
    }

    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return {
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      projectId: task.projectId.toString(),
      createdById: task.createdById.toString(),
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
