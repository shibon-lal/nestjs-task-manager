import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { ReminderRepository } from './reminder.repository';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { Reminder } from './entities/reminder.entity';
@Injectable()
export class ReminderService {
  constructor(private readonly taskRepo: ReminderRepository) {}

  public async findAll(userId: number, page: number, perPage: number) {
    const [reminders, total] = await this.taskRepo.findPaginated(
      userId,
      page,
      perPage,
    );

    return {
      reminders,
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

  public async create(createReminderDto: CreateReminderDto) {
    const reminder = await this.taskRepo.create(createReminderDto);
    return reminder;
  }

  public checkReminderOwnership(reminder: Reminder, userId: number): void {
    if (reminder.user_id !== userId) {
      throw new ForbiddenException('You can only access your own reminder');
    }
  }
}
