import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMongoId,
} from 'class-validator';

import { TaskPriority, TaskStatus } from '../schemas/task.schema.js';

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsMongoId()
  assignedToId?: string;
}
