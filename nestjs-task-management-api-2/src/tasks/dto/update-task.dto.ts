// import {
//   IsEnum,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   IsMongoId,
// } from 'class-validator';

// import { TaskPriority, TaskStatus } from '../schemas/task.schema.js';

// export class UpdateTaskDTO {
//   @IsOptional()
//   @IsString()
//   @IsNotEmpty()
//   title?: string;

//   @IsOptional()
//   @IsString()
//   description?: string;

//   @IsOptional()
//   @IsEnum(TaskStatus)
//   status?: TaskStatus;

//   @IsOptional()
//   @IsEnum(TaskPriority)
//   priority?: TaskPriority;

//   @IsOptional()
//   @IsMongoId()
//   assignedToId?: string;
// }

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMongoId,
} from 'class-validator';

import { TaskPriority, TaskStatus } from '../schemas/task.schema.js';

export class UpdateTaskDTO {
  @ApiPropertyOptional({
    example: 'Implement user authentication',
    description: 'Updated title of the task',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    example: 'Implement JWT login and registration',
    description: 'Updated description of the task',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    description: 'Updated status of the task',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: TaskPriority,
    example: TaskPriority.HIGH,
    description: 'Updated priority of the task',
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({
    example: '507f1f77bcf86cd799439012',
    description: 'MongoDB ID of the user assigned to the task',
  })
  @IsOptional()
  @IsMongoId()
  assignedToId?: string;
}
