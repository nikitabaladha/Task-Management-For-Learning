// import {
//   IsEnum,
//   IsMongoId,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
// } from 'class-validator';

// import { TaskPriority, TaskStatus } from '../schemas/task.schema.js';

// export class CreateTaskDTO {
//   @IsString()
//   @IsNotEmpty()
//   title!: string;

//   @IsOptional()
//   @IsString()
//   description?: string;

//   @IsOptional()
//   @IsEnum(TaskStatus)
//   status?: TaskStatus;

//   @IsOptional()
//   @IsEnum(TaskPriority)
//   priority?: TaskPriority;

//   @IsMongoId()
//   @IsNotEmpty()
//   projectId!: string;

//   @IsOptional()
//   @IsMongoId()
//   assignedToId?: string;
// }

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { TaskPriority, TaskStatus } from '../schemas/task.schema.js';

export class CreateTaskDTO {
  @ApiProperty({
    example: 'Implement user authentication',
    description: 'Title of the task',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    example: 'Implement JWT-based login and registration',
    description: 'Description of the task',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    description: 'Current status of the task',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: TaskPriority,
    example: TaskPriority.HIGH,
    description: 'Priority of the task',
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'MongoDB ID of the project associated with the task',
  })
  @IsMongoId()
  @IsNotEmpty()
  projectId!: string;

  @ApiPropertyOptional({
    example: '507f1f77bcf86cd799439012',
    description: 'MongoDB ID of the user assigned to the task',
  })
  @IsOptional()
  @IsMongoId()
  assignedToId?: string;
}
