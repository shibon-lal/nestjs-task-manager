import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

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
    console.log(createTaskDto);
    const task = await this.taskRepo.create(createTaskDto);
    return task;
  }

  public checkTaskOwnership(task: Task, userId: number): void {
    if (task.user_id !== userId) {
      throw new ForbiddenException('You can only access your own tasks');
    }
  }
}
