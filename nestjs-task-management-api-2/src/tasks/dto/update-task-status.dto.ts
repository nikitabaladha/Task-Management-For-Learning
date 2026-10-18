// import { IsEnum } from 'class-validator';

// import { TaskStatus } from '../schemas/task.schema.js';

// export class UpdateTaskStatusDTO {
//   @IsEnum(TaskStatus)
//   status!: TaskStatus;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { TaskStatus } from '../schemas/task.schema.js';

export class UpdateTaskStatusDTO {
  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    description: 'New status of the task',
  })
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
