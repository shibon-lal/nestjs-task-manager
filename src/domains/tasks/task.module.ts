import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { TasksController } from '@/api/controllers/tasks.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService, TaskRepository],
  exports: [TaskService],
  controllers: [TasksController],
})
export class TaskModule {}
