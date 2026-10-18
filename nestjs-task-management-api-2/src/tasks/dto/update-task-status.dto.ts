import { IsEnum } from 'class-validator';

import { TaskStatus } from '../schemas/task.schema.js';

export class UpdateTaskStatusDTO {
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
