import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enum/task-status.enum';
import { canTransition } from './workflows/task-status.workflow';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  public async findAll(userId: number, page: number, perPage: number) {
    const [tasks, total] = await this.taskRepo.findPaginated(
      userId,
      page,
      perPage,
    );

    return {
      tasks,
      total,
    };
  }

  public async findOneOrFail(id: number) {
    const task = await this.taskRepo.findOne(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  public async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskRepo.create(createTaskDto);
    return task;
  }

  public checkTaskOwnership(task: Task, userId: number): void {
    if (task.user_id !== userId) {
      throw new ForbiddenException('You can only access your own tasks');
    }
  }

  async changeStatus(id: number, status: TaskStatus, userId: number) {
    const task = await this.findOneOrFail(id);
    this.checkTaskOwnership(task, userId);

    if (!canTransition(task.status, status)) {
      throw new BadRequestException(
        `Cannot change status from ${task.status} to ${status}`,
      );
    }

    task.status = status;

    await this.taskRepo.update(task.id, task);

    return task;
  }
}
