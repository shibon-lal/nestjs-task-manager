import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  create(data: Partial<Task>) {
    return this.repo.save(data);
  }

  async findPaginated(userId: number, page: number, perPage: number) {
    console.log(userId);
    return this.repo.findAndCount({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * perPage,
      take: perPage,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }
}
