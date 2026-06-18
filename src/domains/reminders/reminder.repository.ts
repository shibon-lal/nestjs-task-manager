import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reminder } from './entities/reminder.entity';

@Injectable()
export class ReminderRepository {
  constructor(
    @InjectRepository(Reminder)
    private readonly repo: Repository<Reminder>,
  ) {}

  create(data: Partial<Reminder>) {
    return this.repo.save(data);
  }

  async findPaginated(userId: number, page: number, perPage: number) {
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
