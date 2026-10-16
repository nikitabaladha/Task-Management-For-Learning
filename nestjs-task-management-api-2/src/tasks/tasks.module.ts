import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
import { Task, TaskSchema } from './schemas/task.schema.js';
import { Project, ProjectSchema } from '../projects/schemas/project.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
